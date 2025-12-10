#!/usr/bin/env node

/**
 * Stripe Product & Price Sync Script
 * Syncs products and prices from Stripe production to test environment
 *
 * Usage:
 *   node src/stripe/syncProductsAndPrices.js --dry-run        # Preview changes
 *   node src/stripe/syncProductsAndPrices.js --confirm        # Execute sync
 *   node src/stripe/syncProductsAndPrices.js --archive-unused # Archive test-only items
 *   node src/stripe/syncProductsAndPrices.js --product prod_xxx # Sync specific product
 */

import { config } from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isConfirmed = args.includes('--confirm');
const shouldArchiveUnused = args.includes('--archive-unused');
const productIndex = args.indexOf('--product');
const specificProduct = productIndex !== -1 && args[productIndex + 1] && !args[productIndex + 1].startsWith('--')
                       ? args[productIndex + 1]
                       : args.find(arg => arg.startsWith('--product='))?.split('=')[1];

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper functions for colored output
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.error(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}═══ ${msg} ═══${colors.reset}\n`),
  item: (msg) => console.log(`  ${colors.bright}•${colors.reset} ${msg}`)
};

class StripeSyncManager {
  constructor() {
    this.liveKey = process.env.STRIPE_LIVE_SECRET_KEY;
    this.testKey = process.env.STRIPE_TEST_SECRET_KEY || process.env.STRIPE_API_SECRET_KEY;

    this.liveStripe = null;
    this.testStripe = null;

    this.productMapping = {};  // {liveProductId: testProductId}
    this.priceMapping = {};    // {livePriceId: testPriceId}
    this.stats = {
      productsProcessed: 0,
      productsCreated: 0,
      productsUpdated: 0,
      pricesProcessed: 0,
      pricesCreated: 0,
      pricesSkipped: 0,
      productsArchived: 0,
      pricesArchived: 0
    };

    this.outputDir = path.join(__dirname, '../../output');
  }

  async initialize() {
    log.header('Initializing Stripe Sync Manager');

    // Validate API keys
    if (!this.liveKey) {
      log.error('Missing STRIPE_LIVE_SECRET_KEY in environment');
      log.info('Please add to .env file:');
      log.info('STRIPE_LIVE_SECRET_KEY=sk_live_...');
      process.exit(1);
    }

    if (!this.testKey) {
      log.error('Missing STRIPE_TEST_SECRET_KEY or STRIPE_API_SECRET_KEY in environment');
      log.info('Please add to .env file:');
      log.info('STRIPE_TEST_SECRET_KEY=sk_test_...');
      process.exit(1);
    }

    // Validate key prefixes for safety
    if (!this.liveKey.startsWith('sk_live_')) {
      log.error('Invalid live key - must start with sk_live_');
      process.exit(1);
    }

    if (!this.testKey.startsWith('sk_test_')) {
      log.error('Invalid test key - must start with sk_test_');
      process.exit(1);
    }

    // Try to import Stripe
    try {
      const Stripe = (await import('stripe')).default;

      // Initialize Stripe clients
      this.liveStripe = new Stripe(this.liveKey, {
        apiVersion: '2024-11-20.acacia'
      });

      this.testStripe = new Stripe(this.testKey, {
        apiVersion: '2024-11-20.acacia'
      });

      log.success('Stripe clients initialized');
      log.item(`Live key: ${this.maskKey(this.liveKey)}`);
      log.item(`Test key: ${this.maskKey(this.testKey)}`);
    } catch (error) {
      log.error('Failed to import Stripe library');
      log.info('Please install Stripe: npm install stripe');
      log.info('Error: ' + error.message);
      process.exit(1);
    }

    // Create output directory
    await fs.mkdir(this.outputDir, { recursive: true });
    log.success(`Output directory ready: ${this.outputDir}`);
  }

  maskKey(key) {
    if (!key) return 'not set';
    return key.substring(0, 15) + '...' + key.substring(key.length - 4);
  }

  async fetchAllProducts(stripe, mode = 'live') {
    log.info(`Fetching all products from ${mode} mode...`);
    const products = [];
    let hasMore = true;
    let startingAfter = null;

    while (hasMore) {
      const params = {
        limit: 100,
        expand: ['data.default_price']
      };
      if (startingAfter) params.starting_after = startingAfter;

      try {
        const batch = await stripe.products.list(params);
        products.push(...batch.data);
        hasMore = batch.has_more;
        if (batch.data.length > 0) {
          startingAfter = batch.data[batch.data.length - 1].id;
        }
      } catch (error) {
        log.error(`Failed to fetch products: ${error.message}`);
        throw error;
      }
    }

    log.success(`Fetched ${products.length} products from ${mode} mode`);
    return products;
  }

  async fetchAllPrices(stripe, productId = null, mode = 'live') {
    const prices = [];
    let hasMore = true;
    let startingAfter = null;

    while (hasMore) {
      const params = {
        limit: 100,
        expand: ['data.tiers', 'data.currency_options']
      };
      if (productId) params.product = productId;
      if (startingAfter) params.starting_after = startingAfter;

      try {
        const batch = await stripe.prices.list(params);
        prices.push(...batch.data);
        hasMore = batch.has_more;
        if (batch.data.length > 0) {
          startingAfter = batch.data[batch.data.length - 1].id;
        }
      } catch (error) {
        log.error(`Failed to fetch prices: ${error.message}`);
        throw error;
      }
    }

    return prices;
  }

  async findExistingTestProduct(liveProduct) {
    // Search by matching name and metadata
    const testProducts = await this.testStripe.products.search({
      query: `name:"${liveProduct.name}"`
    });

    // Look for exact match by name and metadata
    for (const testProduct of testProducts.data) {
      if (testProduct.name === liveProduct.name) {
        // Check if metadata matches (if any key metadata exists)
        const metadataMatch = !liveProduct.metadata ||
          Object.keys(liveProduct.metadata).length === 0 ||
          (liveProduct.metadata.seats && testProduct.metadata?.seats === liveProduct.metadata.seats);

        if (metadataMatch) {
          return testProduct;
        }
      }
    }

    return null;
  }

  async syncProduct(liveProduct) {
    log.info(`Processing product: ${liveProduct.name} (${liveProduct.id})`);

    if (isDryRun) {
      log.item(`[DRY RUN] Would sync product: ${liveProduct.name}`);
      log.item(`  Description: ${liveProduct.description || 'none'}`);
      log.item(`  Active: ${liveProduct.active}`);
      log.item(`  Metadata: ${JSON.stringify(liveProduct.metadata || {})}`);
      this.productMapping[liveProduct.id] = `test_${liveProduct.id}_dryrun`;
      return;
    }

    try {
      // Check if product already exists in test mode
      const existingTestProduct = await this.findExistingTestProduct(liveProduct);

      const productData = {
        name: liveProduct.name,
        active: liveProduct.active,
        metadata: liveProduct.metadata || {}
      };

      // Only add non-empty optional fields
      if (liveProduct.description) productData.description = liveProduct.description;
      if (liveProduct.unit_label) productData.unit_label = liveProduct.unit_label;
      if (liveProduct.statement_descriptor) productData.statement_descriptor = liveProduct.statement_descriptor;
      if (liveProduct.url) productData.url = liveProduct.url;
      if (liveProduct.tax_code) productData.tax_code = liveProduct.tax_code;

      // Add images if they exist
      if (liveProduct.images && liveProduct.images.length > 0) {
        productData.images = liveProduct.images;
      }

      let testProduct;
      if (existingTestProduct) {
        // Update existing product
        log.item(`Updating existing test product: ${existingTestProduct.id}`);
        testProduct = await this.testStripe.products.update(
          existingTestProduct.id,
          productData
        );
        this.stats.productsUpdated++;
      } else {
        // Create new product
        log.item(`Creating new test product`);
        testProduct = await this.testStripe.products.create(productData);
        this.stats.productsCreated++;
      }

      // Store mapping
      this.productMapping[liveProduct.id] = testProduct.id;
      log.success(`Product synced: ${testProduct.name} (${testProduct.id})`);

      this.stats.productsProcessed++;
      return testProduct;
    } catch (error) {
      log.error(`Failed to sync product ${liveProduct.id}: ${error.message}`);
      throw error;
    }
  }

  async syncPrice(livePrice, testProductId) {
    log.info(`Processing price: ${livePrice.nickname || livePrice.id}`);

    if (isDryRun) {
      log.item(`[DRY RUN] Would sync price: ${livePrice.id}`);
      log.item(`  Currency: ${livePrice.currency}`);
      log.item(`  Amount: ${this.formatAmount(livePrice.unit_amount, livePrice.currency)}`);
      log.item(`  Type: ${livePrice.type}`);
      if (livePrice.recurring) {
        log.item(`  Recurring: ${livePrice.recurring.interval} (${livePrice.recurring.interval_count})`);
      }
      this.priceMapping[livePrice.id] = `test_${livePrice.id}_dryrun`;
      return;
    }

    try {
      // Check if similar price already exists
      const testPrices = await this.testStripe.prices.list({
        product: testProductId,
        limit: 100
      });

      // Look for matching price
      const existingPrice = testPrices.data.find(tp => {
        const sameAmount = tp.unit_amount === livePrice.unit_amount;
        const sameCurrency = tp.currency === livePrice.currency;
        const sameType = tp.type === livePrice.type;
        const sameRecurring = (!livePrice.recurring && !tp.recurring) ||
          (livePrice.recurring && tp.recurring &&
           livePrice.recurring.interval === tp.recurring.interval &&
           livePrice.recurring.interval_count === tp.recurring.interval_count);

        return sameAmount && sameCurrency && sameType && sameRecurring;
      });

      if (existingPrice) {
        log.item(`Price already exists in test mode: ${existingPrice.id}`);
        this.priceMapping[livePrice.id] = existingPrice.id;
        this.stats.pricesSkipped++;
        return existingPrice;
      }

      // Build price data
      const priceData = {
        product: testProductId,
        currency: livePrice.currency,
        active: livePrice.active,
        metadata: livePrice.metadata || {},
        nickname: livePrice.nickname,
        tax_behavior: livePrice.tax_behavior,
        billing_scheme: livePrice.billing_scheme
      };

      // Handle different billing schemes
      if (livePrice.billing_scheme === 'per_unit') {
        // Use unit_amount_decimal if present, otherwise unit_amount
        if (livePrice.unit_amount_decimal) {
          priceData.unit_amount_decimal = livePrice.unit_amount_decimal;
        } else if (livePrice.unit_amount !== null && livePrice.unit_amount !== undefined) {
          priceData.unit_amount = livePrice.unit_amount;
        }
      } else if (livePrice.billing_scheme === 'tiered') {
        priceData.tiers_mode = livePrice.tiers_mode;
        // Clean up tiers to avoid unit_amount/unit_amount_decimal conflicts
        if (livePrice.tiers) {
          priceData.tiers = livePrice.tiers.map(tier => {
            const cleanTier = {
              up_to: tier.up_to,
              flat_amount: tier.flat_amount,
              flat_amount_decimal: tier.flat_amount_decimal
            };
            // Only include one of unit_amount or unit_amount_decimal
            if (tier.unit_amount_decimal) {
              cleanTier.unit_amount_decimal = tier.unit_amount_decimal;
            } else if (tier.unit_amount !== null && tier.unit_amount !== undefined) {
              cleanTier.unit_amount = tier.unit_amount;
            }
            // Remove nulls and undefined
            return Object.fromEntries(
              Object.entries(cleanTier).filter(([_, v]) => v != null)
            );
          });
        }
      }

      // Handle recurring prices (subscriptions)
      if (livePrice.recurring) {
        priceData.recurring = {
          interval: livePrice.recurring.interval,
          interval_count: livePrice.recurring.interval_count
        };
        if (livePrice.recurring.usage_type) {
          priceData.recurring.usage_type = livePrice.recurring.usage_type;
        }
      }

      // Handle transform quantity (important for credit calculations)
      if (livePrice.transform_quantity) {
        priceData.transform_quantity = {
          divide_by: livePrice.transform_quantity.divide_by,
          round: livePrice.transform_quantity.round
        };
      }

      // Handle custom unit amounts
      if (livePrice.custom_unit_amount) {
        priceData.custom_unit_amount = livePrice.custom_unit_amount;
      }

      // Create new price
      log.item(`Creating new test price`);
      const testPrice = await this.testStripe.prices.create(priceData);

      this.priceMapping[livePrice.id] = testPrice.id;
      this.stats.pricesCreated++;
      this.stats.pricesProcessed++;

      log.success(`Price synced: ${testPrice.id}`);
      return testPrice;
    } catch (error) {
      log.error(`Failed to sync price ${livePrice.id}: ${error.message}`);
      throw error;
    }
  }

  formatAmount(amountInCents, currency) {
    if (!amountInCents) return 'custom';
    const amount = amountInCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount);
  }

  async archiveUnusedTestItems() {
    log.header('Archiving Unused Test Items');

    if (isDryRun) {
      log.warning('[DRY RUN] Would archive unused test items');
      return;
    }

    // Fetch all test products
    const testProducts = await this.fetchAllProducts(this.testStripe, 'test');
    const liveProductNames = new Set(
      Object.values(this.productMapping).map(id =>
        testProducts.find(p => p.id === id)?.name
      ).filter(Boolean)
    );

    for (const testProduct of testProducts) {
      if (!liveProductNames.has(testProduct.name) && testProduct.active) {
        log.item(`Archiving unused product: ${testProduct.name} (${testProduct.id})`);
        try {
          await this.testStripe.products.update(testProduct.id, { active: false });
          this.stats.productsArchived++;
        } catch (error) {
          log.error(`Failed to archive product ${testProduct.id}: ${error.message}`);
        }
      }
    }

    log.success(`Archived ${this.stats.productsArchived} unused products`);
  }

  async saveMappingFile() {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `stripe-sync-mapping-${timestamp}.json`;
    const filepath = path.join(this.outputDir, filename);

    const mappingData = {
      timestamp: new Date().toISOString(),
      mode: isDryRun ? 'dry-run' : 'executed',
      stats: this.stats,
      products: this.productMapping,
      prices: this.priceMapping
    };

    await fs.writeFile(filepath, JSON.stringify(mappingData, null, 2));
    log.success(`Mapping file saved: ${filepath}`);
    return filepath;
  }

  async run() {
    try {
      await this.initialize();

      // Check mode
      if (!isDryRun && !isConfirmed && !shouldArchiveUnused) {
        log.warning('No mode specified. Use one of:');
        log.item('--dry-run     Preview changes without executing');
        log.item('--confirm     Execute the sync');
        log.item('--archive-unused  Archive test items not in production');
        process.exit(0);
      }

      if (isDryRun) {
        log.header('DRY RUN MODE - No changes will be made');
      }

      // Fetch production products
      log.header('Fetching Production Data');
      let liveProducts = await this.fetchAllProducts(this.liveStripe, 'live');

      // Filter to specific product if requested
      if (specificProduct) {
        liveProducts = liveProducts.filter(p => p.id === specificProduct);
        if (liveProducts.length === 0) {
          log.error(`Product ${specificProduct} not found in production`);
          process.exit(1);
        }
        log.info(`Filtering to specific product: ${specificProduct}`);
      }

      // Sync products
      log.header('Syncing Products');
      for (const liveProduct of liveProducts) {
        await this.syncProduct(liveProduct);
      }

      // Sync prices for each product
      log.header('Syncing Prices');
      for (const liveProduct of liveProducts) {
        const testProductId = this.productMapping[liveProduct.id];
        if (!testProductId || testProductId.includes('dryrun')) continue;

        log.info(`Fetching prices for product: ${liveProduct.name}`);
        const livePrices = await this.fetchAllPrices(this.liveStripe, liveProduct.id, 'live');

        for (const livePrice of livePrices) {
          try {
            await this.syncPrice(livePrice, testProductId);
          } catch (priceError) {
            log.warning(`Skipping price ${livePrice.id}: ${priceError.message}`);
            // Continue with next price instead of failing entirely
            continue;
          }
        }
      }

      // Archive unused items if requested
      if (shouldArchiveUnused) {
        await this.archiveUnusedTestItems();
      }

      // Save mapping file
      const mappingFile = await this.saveMappingFile();

      // Print summary
      log.header('Sync Summary');
      log.success(`Products processed: ${this.stats.productsProcessed}`);
      log.item(`Created: ${this.stats.productsCreated}`);
      log.item(`Updated: ${this.stats.productsUpdated}`);
      log.success(`Prices processed: ${this.stats.pricesProcessed}`);
      log.item(`Created: ${this.stats.pricesCreated}`);
      log.item(`Skipped (already exist): ${this.stats.pricesSkipped}`);

      if (shouldArchiveUnused) {
        log.success(`Items archived:`);
        log.item(`Products: ${this.stats.productsArchived}`);
        log.item(`Prices: ${this.stats.pricesArchived}`);
      }

      log.success(`\nMapping file: ${mappingFile}`);

      if (isDryRun) {
        log.warning('\nThis was a DRY RUN - no changes were made');
        log.info('To execute the sync, run with --confirm flag');
      }

    } catch (error) {
      log.error(`Fatal error: ${error.message}`);
      console.error(error);
      process.exit(1);
    }
  }
}

// Main execution
const syncManager = new StripeSyncManager();
syncManager.run();
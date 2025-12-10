# Stripe Product & Price Sync Tool

This tool syncs products and prices from your Stripe production environment to your test environment.

## Setup

### 1. Install Dependencies

The Stripe package is already added to package.json. If you encounter installation issues:

```bash
npm install stripe --ignore-scripts
```

### 2. Configure Environment Variables

Add these to your `.env` file:

```env
# Your test mode secret key (required)
STRIPE_TEST_SECRET_KEY=sk_test_YOUR_TEST_KEY_HERE

# Your live mode secret key (required)
STRIPE_LIVE_SECRET_KEY=sk_live_YOUR_LIVE_KEY_HERE
```

**How to get your keys:**
1. Go to https://dashboard.stripe.com/acct_15B93FAE1fARVUOG/apikeys
2. For test key: Make sure you're in "Test mode" (toggle in dashboard)
3. For live key: Switch to "Live mode" and click "Reveal live key"

**IMPORTANT:** The live key is used READ-ONLY. The script has built-in safety checks to prevent any modifications to production data.

## Usage

### Preview Changes (Dry Run)

Always start with a dry run to see what would be synced:

```bash
node src/stripe/syncProductsAndPrices.js --dry-run
```

### Execute Sync

Once you're satisfied with the dry run output:

```bash
node src/stripe/syncProductsAndPrices.js --confirm
```

### Sync Specific Product

To sync only one product and its prices:

```bash
node src/stripe/syncProductsAndPrices.js --product prod_XXXXX --confirm
```

### Archive Unused Test Items

To archive (hide) test mode products that don't exist in production:

```bash
node src/stripe/syncProductsAndPrices.js --archive-unused
```

## Output

The script creates a mapping file in `output/stripe-sync-mapping-YYYY-MM-DD.json` containing:
- Timestamp of sync
- Statistics (products/prices created, updated, skipped)
- Mapping of production IDs to test IDs

## Safety Features

1. **Read-only Production Access**: The script validates that the live key is only used for reading data
2. **Dry Run Mode**: Preview all changes before executing
3. **Key Validation**: Checks that keys have correct prefixes (sk_live_, sk_test_)
4. **No Deletion**: Only archives (sets active=false), never deletes
5. **Audit Trail**: All operations are logged with colored output

## What Gets Synced

### Products
- Name, description, active status
- Metadata (including "seats" for seat-based products)
- Images, unit labels, statement descriptors
- Tax codes

### Prices
- Currency and amount
- Billing type (one-time or recurring)
- Subscription intervals (monthly, yearly, etc.)
- Transform quantity rules (for credit calculations)
- Tiers (for tiered pricing)
- Metadata

## Important Notes

1. **IDs are not portable**: Product and price IDs in production cannot be used in test mode. New IDs are created and mapped.

2. **Existing items are updated**: If a product with the same name exists in test mode, it will be updated rather than duplicated.

3. **Prices are deduplicated**: If an identical price already exists for a product, it won't be created again.

4. **Credits and seats**: The script preserves special metadata like "seats" counts and transform_quantity rules used for credit calculations.

## Troubleshooting

### Missing Stripe Package

If you see "Failed to import Stripe library":

```bash
# Try installing without post-install scripts
npm install stripe --ignore-scripts

# Or install globally and link
npm install -g stripe
npm link stripe
```

### Missing API Keys

The script will prompt you with exactly what's missing and where to add it.

### Xcode Developer Tools (macOS)

If you encounter build errors, you may need to install Xcode command line tools:

```bash
xcode-select --install
```

## After Syncing

1. **Update your test environment configuration** to use the new test mode product/price IDs
2. **Test your checkout flows** with the synced products
3. **Verify subscription billing** works correctly
4. **Check credit calculations** if using transform_quantity

## Support

For issues or questions about this sync tool, check the generated mapping file for details about what was synced, or review the console output for any errors.
import JiraClient from '../jiraClient.js';
import readline from 'readline';

function getArgFlag(flag) {
  // Returns the value for --flag=value or the next token after --flag
  const argv = process.argv || [];
  const idx = argv.findIndex(a => a === `--${flag}` || a.startsWith(`--${flag}=`));
  if (idx === -1) return null;
  const token = argv[idx];
  if (token.includes('=')) {
    return token.split('=').slice(1).join('=');
  }
  // take next argument if present and not another --flag
  const next = argv[idx + 1];
  if (next && !next.startsWith('--')) return next;
  return '';
}

function hasFlag(flag) {
  const argv = process.argv || [];
  return argv.some(a => a === `--${flag}`);
}

function parseNamesList(raw) {
  if (!raw) return [];
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

function rlAsk(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

function printComponentList(components) {
  console.log('\nAvailable components:');
  components.forEach((c, i) => {
    console.log(`${String(i + 1).padStart(2, ' ')}. ${c.name} (id: ${c.id})`);
  });
}

function mapNamesToIds(all, names) {
  const out = [];
  const missing = [];
  names.forEach(name => {
    const found = all.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (found) out.push({ id: String(found.id) });
    else missing.push(name);
  });
  return { out, missing };
}

function mapIndexesToIds(all, indexes) {
  const sel = [];
  indexes.forEach(n => {
    const i = n - 1;
    if (i >= 0 && i < all.length) sel.push({ id: String(all[i].id) });
  });
  return sel;
}

/**
 * Pick components for a Jira project.
 *
 * Non-interactive:
 * - Use env COMPONENTS="Name1,Name2" or --components "Name1,Name2" to select by names
 * - Use --no-components to force []
 * - If non-TTY and no explicit components provided, throws with guidance
 *
 * Interactive (TTY):
 * - Prints enumerated list and asks for comma-separated numbers (e.g., 1,3,5). Enter to choose none.
 * - Confirms the selection (Y/N) and loops until confirmed.
 *
 * @param {string} projectKey
 * @param {{allowEmpty?: boolean}} options
 * @returns {Promise<Array<{id: string}>>}
 */
export async function pickComponents(projectKey, options = {}) {
  const allowEmpty = options.allowEmpty !== false; // default true
  const jira = new JiraClient();

  // Fetch components from Jira
  let allComponents = [];
  try {
    allComponents = await jira.listProjectComponents(projectKey);
  } catch (err) {
    console.error(`❌ Failed to fetch components for project ${projectKey}:`, err.response?.data || err.message);
    throw err;
  }

  // Non-interactive flags/env
  const noComponents = hasFlag('no-components') || process.env.NO_COMPONENTS === '1';
  const provided = getArgFlag('components') || process.env.COMPONENTS;

  if (noComponents) {
    return [];
  }

  if (provided && provided.trim()) {
    const names = parseNamesList(provided);
    const { out, missing } = mapNamesToIds(allComponents, names);
    if (missing.length > 0) {
      throw new Error(`Unknown component name(s): ${missing.join(', ')}. Provide existing names via --components or set --no-components to skip.`);
    }
    return out;
  }

  // If not TTY and no explicit choice provided, fail with guidance
  if (!process.stdin.isTTY) {
    if (allowEmpty) {
      throw new Error('No components provided in non-interactive mode. Provide --components "Name1,Name2" or --no-components.');
    } else {
      throw new Error('Component selection required. Provide --components "Name1,Name2".');
    }
  }

  // Interactive selection
  while (true) {
    printComponentList(allComponents);

    const raw = await rlAsk('\nEnter component numbers (comma-separated), or press Enter for none: ');
    const nums = raw
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => Number.isFinite(n));

    let selected = [];
    if (nums.length > 0) {
      selected = mapIndexesToIds(allComponents, nums);
      if (selected.length === 0) {
        console.log('⚠️  No valid selections parsed. Try again.');
        continue;
      }
    } else {
      // none selected
      if (!allowEmpty) {
        console.log('⚠️  Components are required. Please select at least one.');
        continue;
      }
      selected = [];
    }

    const selectedNames = selected
      .map(s => {
        const found = allComponents.find(c => String(c.id) === String(s.id));
        return found?.name || s.id;
      })
      .join(', ') || 'None';

    const confirm = await rlAsk(`Confirm components: [${selectedNames}] (y/N): `);
    if ((confirm || '').trim().toLowerCase().startsWith('y')) {
      return selected;
    }
    console.log('↩️  Re-trying component selection...');
  }
}

export default pickComponents;

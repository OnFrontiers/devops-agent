import JiraClient from '../core/jiraClient.js';

async function verifyBkgDuplicatesToday() {
  const jira = new JiraClient();
  try {
    console.log('🔎 Verifying remaining BKG duplicates created today (label=migrated-from-eng)...');

    const jql = 'project = BKG AND labels = migrated-from-eng AND created >= startOfDay() ORDER BY created DESC';
    console.log(`JQL: ${jql}`);

    const results = await jira.searchIssues(jql, 0, 1000, ['summary', 'created', 'status', 'labels']);
    const remaining = results.total ?? results.issues?.length ?? 0;

    console.log(`\n📊 Remaining duplicates to delete today: ${remaining}`);
    if (!results.issues || results.issues.length === 0) {
      console.log('✅ No remaining duplicates found for today.');
      return;
    }

    console.log('\nList of remaining:');
    results.issues.forEach((issue, idx) => {
      const createdDate = new Date(issue.fields.created).toLocaleString();
      console.log(`${idx + 1}. ${issue.key} | ${issue.fields.summary}`);
      console.log(`   Created: ${createdDate} | Status: ${issue.fields.status?.name} | Labels: ${issue.fields.labels?.join(', ') || 'None'}`);
    });

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    if (error.response?.data) {
      console.error('Details:', JSON.stringify(error.response.data));
    }
    process.exit(1);
  }
}

verifyBkgDuplicatesToday();

import JiraClient from '../core/jiraClient.js';

async function deleteBkgDuplicatesToday() {
  const jira = new JiraClient();

  try {
    console.log('🧹 Deleting BKG duplicates created today (keeping all ENG tickets untouched)...');

    // Safest selector: we labeled every created duplicate with `migrated-from-eng`
    // Further narrow to items created today to avoid touching older/legit items
    const jql = 'project = BKG AND labels = migrated-from-eng AND created >= startOfDay() ORDER BY created DESC';

    console.log(`JQL: ${jql}`);

    const results = await jira.searchIssues(jql, 0, 1000, [
      'summary',
      'labels',
      'created',
      'status',
    ]);

    const total = results.total ?? results.issues?.length ?? 0;
    console.log(`\n📊 Found ${total} BKG duplicates to delete (created today):`);
    console.log('='.repeat(100));

    if (!results.issues || results.issues.length === 0) {
      console.log('✅ Nothing to delete based on today + migrated-from-eng label.');
      return;
    }

    results.issues.forEach((issue, idx) => {
      const createdDate = new Date(issue.fields.created);
      console.log(
        `${idx + 1}. ${issue.key} | ${issue.fields.summary}\n   Created: ${createdDate.toLocaleString()} | Status: ${issue.fields.status?.name}\n   Labels: ${issue.fields.labels?.join(', ') || 'None'}`
      );
    });

    console.log('\n🚨 Proceeding to delete them one by one (this cannot be undone)...');

    let success = 0;
    let failed = 0;
    const failures = [];

    for (let i = 0; i < results.issues.length; i++) {
      const issue = results.issues[i];
      const key = issue.key;

      try {
        console.log(`\n[${i + 1}/${results.issues.length}] Deleting ${key}...`);
        await jira.deleteIssue(key);
        console.log(`   ✅ Deleted ${key}`);
        success++;
      } catch (err) {
        console.error(`   ❌ Failed to delete ${key}: ${err.message}`);
        if (err.response?.data) {
          console.error(`   Details: ${JSON.stringify(err.response.data)}`);
        }
        failures.push({ key, error: err.message, details: err.response?.data });
        failed++;
      }
    }

    console.log('\n' + '='.repeat(100));
    console.log('📊 Deletion Summary:');
    console.log(`   ✅ Deleted: ${success}`);
    console.log(`   ❌ Failed: ${failed}`);

    if (failures.length > 0) {
      console.log('\n❌ Failures:');
      failures.forEach((f, idx) => {
        console.log(`   ${idx + 1}. ${f.key}: ${f.error}`);
      });
    }

    console.log('\n🎉 Cleanup complete. ENG tickets were not touched.');

  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    if (error.response?.data) {
      console.error('Details:', JSON.stringify(error.response.data));
    }
    process.exit(1);
  }
}

deleteBkgDuplicatesToday();

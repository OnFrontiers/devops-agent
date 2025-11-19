import JiraClient from '../core/jiraClient.js';

async function findSearchRelatedLabels() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Finding all unique labels that contain "search"...');

    // Get a broader sample to find all labels
    const jql = 'project = ENG'; // Sample from ENG project to find label patterns

    const results = await jira.searchIssues(jql, 0, 100, [
      'summary', 'labels', 'project'
    ]);

    console.log(`\n📊 Sampled ${results.total} issues to find label patterns:`);

    // Collect all unique labels
    const allLabels = new Set();

    results.issues.forEach((issue) => {
      const labels = issue.fields.labels || [];
      labels.forEach(label => allLabels.add(label));
    });

    // Filter labels containing "search" (case insensitive)
    const searchLabels = Array.from(allLabels).filter(label =>
      label.toLowerCase().includes('search')
    );

    console.log('\n🏷️ Labels containing "search":');
    if (searchLabels.length > 0) {
      searchLabels.forEach(label => console.log(`   • ${label}`));
      console.log(`\n✅ Found ${searchLabels.length} search-related labels`);
    } else {
      console.log('   No labels containing "search" found in sample');
    }

    // Show all labels for reference
    console.log('\n📋 All unique labels in sample (last 20):');
    const allLabelsArray = Array.from(allLabels).slice(-20);
    allLabelsArray.forEach(label => console.log(`   • ${label}`));

    // Now try searching with the first search-related label found
    if (searchLabels.length > 0) {
      console.log(`\n🔍 Testing search with label: "${searchLabels[0]}"`);
      const testJql = `labels = "${searchLabels[0]}"`;

      const testResults = await jira.searchIssues(testJql, 0, 10, [
        'summary', 'labels', 'project', 'key'
      ]);

      console.log(`Found ${testResults.total} issues with exact label "${searchLabels[0]}"`);

      if (testResults.issues.length > 0) {
        console.log('Sample issues:');
        testResults.issues.forEach(issue => {
          console.log(`   • ${issue.key}: ${issue.fields.summary}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    }
  }
}

findSearchRelatedLabels();

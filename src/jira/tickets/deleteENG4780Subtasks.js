import JiraClient from '../core/jiraClient.js';

async function deleteENG4780Subtasks() {
  try {
    const jira = new JiraClient();
    const parentKey = 'ENG-4780';

    console.log(`🔄 Finding subtasks under ${parentKey}...\n`);

    // Search for subtasks under ENG-4780
    const jql = `parent = ${parentKey} AND issuetype = "Sub-task"`;
    const searchResult = await jira.searchIssues(jql);

    if (!searchResult.issues || searchResult.issues.length === 0) {
      console.log('ℹ️  No subtasks found under ENG-4780');
      return;
    }

    console.log(`📋 Found ${searchResult.issues.length} subtask(s) to delete:\n`);

    // Delete each subtask
    for (const issue of searchResult.issues) {
      console.log(`🗑️  Deleting ${issue.key}: ${issue.fields.summary}`);

      try {
        await jira.deleteIssue(issue.key);
        console.log(`✅ Deleted ${issue.key}`);
      } catch (deleteError) {
        console.error(`❌ Failed to delete ${issue.key}:`, deleteError.message);
      }
    }

    console.log('\n✅ Subtask deletion process completed!');

  } catch (error) {
    console.error('❌ Error finding/deleting subtasks:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
deleteENG4780Subtasks();

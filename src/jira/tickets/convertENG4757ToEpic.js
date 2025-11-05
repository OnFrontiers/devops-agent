import JiraClient from '../core/jiraClient.js';

async function convertENG4757ToEpic() {
  try {
    const jira = new JiraClient();
    console.log('Converting ENG-4757 to Epic type...');

    const updateData = {
      fields: {
        issuetype: { name: 'Epic' }
      }
    };

    await jira.updateIssue('ENG-4757', updateData);

    console.log('ENG-4757 successfully converted to Epic type');
    console.log('URL: https://onfrontiers.atlassian.net/browse/ENG-4757');

  } catch (error) {
    console.error('Error converting ENG-4757 to Epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
convertENG4757ToEpic();

import JiraClient from '../core/jiraClient.js';

async function addStoryPointsToTicket() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4695';
    const storyPoints = 2;
    
    console.log(`🔢 Adding ${storyPoints} story points to ticket ${ticketKey}...\n`);
    
    // Update the ticket with story points
    const updateData = {
      fields: {
        customfield_10002: storyPoints // Story Points field in Jira
      }
    };
    
    await jira.updateIssue(ticketKey, updateData);
    
    console.log('✅ Story points added successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`📊 Story Points: ${storyPoints}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    
  } catch (error) {
    console.error('❌ Error adding story points:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
    // If custom field ID is wrong, we'll get an error and can adjust
    if (error.response?.status === 400) {
      console.log('💡 Note: Story points field ID may need adjustment in the script');
    }
  }
}

// Run the function
addStoryPointsToTicket();
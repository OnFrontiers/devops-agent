import JiraClient from '../core/jiraClient.js';

async function addZoomLabel() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4681';
    
    console.log('🏷️ Adding zoom label to ticket...');
    
    // Get current issue to see existing labels
    const issue = await jira.getIssue(ticketKey);
    const currentLabels = issue.fields.labels || [];
    
    console.log(`Current labels: ${currentLabels.join(', ')}`);
    
    // Add zoom label if not already present
    if (!currentLabels.includes('zoom')) {
      const updatedLabels = [...currentLabels, 'zoom'];
      
      const updateData = {
        fields: {
          labels: updatedLabels
        }
      };
      
      await jira.updateIssue(ticketKey, updateData);
      console.log(`✅ Added zoom label. New labels: ${updatedLabels.join(', ')}`);
    } else {
      console.log('✅ Zoom label already exists');
    }
    
    console.log(`\n🎫 Updated ticket: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    
  } catch (error) {
    console.error('❌ Error adding zoom label:', error.message);
  }
}

addZoomLabel();
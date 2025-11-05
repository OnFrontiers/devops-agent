import JiraClient from '../core/jiraClient.js';

async function findStoryPointsField() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4695';
    
    console.log(`🔍 Finding story points field for ticket ${ticketKey}...\n`);
    
    // Get the issue to see available fields
    const issue = await jira.getIssue(ticketKey);
    
    // Look for story points related fields
    console.log('📋 Searching for story points field in available fields...');
    
    Object.keys(issue.fields).forEach(fieldKey => {
      const fieldValue = issue.fields[fieldKey];
      if (fieldKey.includes('story') || 
          fieldKey.includes('point') || 
          fieldKey.includes('estimate') ||
          fieldKey.toLowerCase().includes('sp')) {
        console.log(`   ${fieldKey}: ${fieldValue}`);
      }
    });
    
    // Try common story points field IDs
    const commonStoryPointFields = [
      'customfield_10002',
      'customfield_10004', 
      'customfield_10008',
      'customfield_10016',
      'customfield_10018',
      'customfield_10020',
      'story_point_estimate',
      'storyPoints'
    ];
    
    console.log('\n🔍 Checking common story points field IDs:');
    commonStoryPointFields.forEach(fieldId => {
      if (issue.fields.hasOwnProperty(fieldId)) {
        console.log(`   ✅ ${fieldId}: ${issue.fields[fieldId]}`);
      } else {
        console.log(`   ❌ ${fieldId}: not found`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error finding story points field:', error.message);
  }
}

// Run the function
findStoryPointsField();
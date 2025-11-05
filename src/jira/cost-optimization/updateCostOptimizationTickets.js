import JiraClient from '../core/jiraClient.js';

async function updateCostOptimizationTickets() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Finding cost optimization tickets to update...');
    
    // Find all cost-reduction tickets in ENG project
    const jql = 'project = ENG AND labels = cost-reduction';
    const results = await jira.searchIssues(jql, 0, 100, [
      'summary', 'status', 'assignee', 'priority', 'issuetype', 'duedate', 'parent'
    ]);
    
    console.log(`📊 Found ${results.total} cost optimization tickets`);
    
    // Filter tickets that need updates (not in Dev Ready, In Progress, or Released)
    const ticketsToUpdate = results.issues.filter(issue => {
      const status = issue.fields.status.name;
      return !['Dev Ready', 'In Progress', 'Released to Prod'].includes(status);
    });
    
    console.log(`🎯 ${ticketsToUpdate.length} tickets need status updates`);
    
    if (ticketsToUpdate.length === 0) {
      console.log('✅ All tickets are already in the correct status!');
      return;
    }
    
    // Show tickets that will be updated
    console.log('\n📋 Tickets to be updated:');
    ticketsToUpdate.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
      console.log(`   Current Status: ${issue.fields.status.name}`);
      console.log(`   Will change to: Dev Ready`);
      console.log('');
    });
    
    // Ask for confirmation
    console.log('⚠️  About to update these tickets with:');
    console.log('   • Status: Dev Ready (or In Progress for some)');
    console.log('   • Due Date: September 15, 2025');
    console.log('   • Parent Epic: ENG-4687');
    
    // For each ticket, update status, due date, and parent epic
    for (const issue of ticketsToUpdate) {
      try {
        console.log(`\n🔄 Updating ${issue.key}...`);
        
        // Get available transitions
        const transitions = await jira.getTransitions(issue.key);
        console.log(`Available transitions for ${issue.key}:`, transitions.map(t => `${t.name} (ID: ${t.id})`));
        
        // Find the appropriate transition (Dev Ready or In Progress)
        let targetTransition = transitions.find(t => t.name === 'Dev Ready') || 
                              transitions.find(t => t.name === 'Ready for Development') ||
                              transitions.find(t => t.name === 'In Progress');
        
        if (!targetTransition) {
          console.log(`⚠️  No suitable transition found for ${issue.key}, skipping status change`);
        } else {
          console.log(`Transitioning ${issue.key} to ${targetTransition.name}...`);
          await jira.transitionIssue(issue.key, targetTransition.id);
        }
        
        // Update fields (due date and parent epic)
        const updateData = {
          fields: {
            duedate: '2025-09-15',
            parent: { key: 'ENG-4687' }
          }
        };
        
        console.log(`Updating fields for ${issue.key}...`);
        await jira.updateIssue(issue.key, updateData);
        
        console.log(`✅ Successfully updated ${issue.key}`);
        
      } catch (error) {
        console.error(`❌ Error updating ${issue.key}:`, error.response?.data || error.message);
        // Continue with other tickets even if one fails
        continue;
      }
    }
    
    console.log('\n🎉 Bulk update completed!');
    
  } catch (error) {
    console.error('❌ Error in bulk update:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateCostOptimizationTickets();
}

export default updateCostOptimizationTickets;
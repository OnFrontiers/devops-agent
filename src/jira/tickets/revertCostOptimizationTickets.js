import JiraClient from '../core/jiraClient.js';

async function revertCostOptimizationTickets() {
  try {
    const jira = new JiraClient();
    console.log('🔄 Reverting cost optimization ticket changes...');
    
    // These are the tickets that were changed and their original statuses
    const ticketsToRevert = [
      { key: 'ENG-4684', originalStatus: 'Discovery' },
      { key: 'ENG-4682', originalStatus: 'Definition' },
      { key: 'ENG-4681', originalStatus: 'Definition' },
      { key: 'ENG-4680', originalStatus: 'Definition' },
      { key: 'ENG-4671', originalStatus: 'Definition' },
      { key: 'ENG-4670', originalStatus: 'Definition' },
      { key: 'ENG-4669', originalStatus: 'Definition' },
      { key: 'ENG-4668', originalStatus: 'Definition' },
      { key: 'ENG-4667', originalStatus: 'Definition' },
      { key: 'ENG-4665', originalStatus: 'Definition' },
      { key: 'ENG-4663', originalStatus: 'Definition' },
      { key: 'ENG-4662', originalStatus: 'Definition' },
      { key: 'ENG-4661', originalStatus: 'Definition' },
      { key: 'ENG-4660', originalStatus: 'Definition' },
      { key: 'ENG-4656', originalStatus: 'Definition' },
      { key: 'ENG-4655', originalStatus: 'Definition' }
    ];
    
    console.log(`📋 Reverting ${ticketsToRevert.length} tickets back to their original status`);
    
    for (const ticket of ticketsToRevert) {
      try {
        console.log(`\n🔄 Reverting ${ticket.key} back to ${ticket.originalStatus}...`);
        
        // Get available transitions
        const transitions = await jira.getTransitions(ticket.key);
        
        // Find the transition to revert to original status
        const revertTransition = transitions.find(t => t.name === ticket.originalStatus);
        
        if (!revertTransition) {
          console.log(`⚠️  No transition to ${ticket.originalStatus} found for ${ticket.key}, skipping status revert`);
        } else {
          console.log(`Transitioning ${ticket.key} to ${ticket.originalStatus}...`);
          await jira.transitionIssue(ticket.key, revertTransition.id);
        }
        
        // Remove due date and parent epic by setting them to null
        const updateData = {
          fields: {
            duedate: null,
            parent: null
          }
        };
        
        console.log(`Removing due date and parent epic for ${ticket.key}...`);
        await jira.updateIssue(ticket.key, updateData);
        
        console.log(`✅ Successfully reverted ${ticket.key}`);
        
      } catch (error) {
        console.error(`❌ Error reverting ${ticket.key}:`, error.response?.data || error.message);
        // Continue with other tickets even if one fails
        continue;
      }
    }
    
    console.log('\n🎉 Revert completed!');
    
  } catch (error) {
    console.error('❌ Error in bulk revert:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  revertCostOptimizationTickets();
}

export default revertCostOptimizationTickets;
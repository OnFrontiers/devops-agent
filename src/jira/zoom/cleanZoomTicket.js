import JiraClient from '../core/jiraClient.js';

async function cleanZoomTicket() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4681';
    
    console.log('🧹 Cleaning up Zoom ticket comments...');
    
    // Add a clean, professional comment
    const cleanComment = `SCOPE CLARIFICATION:

Current situation: Using paid Zoom API license at $600/month for <2k minutes usage.

Proposed solution: Replace paid API license with custom implementation using Zoom's free SDK.

Analysis needed:
- Audit current Zoom API services and associated costs
- Evaluate development effort for SDK-based custom implementation
- Compare one-time development cost vs ongoing licensing ($7,200/year savings)
- Ensure feature parity and reliability in custom solution
- Define migration timeline and rollback plan

Expected outcome: Eliminate $600/month recurring cost while maintaining functionality.`;

    await jira.addComment(ticketKey, cleanComment);
    console.log('✅ Added clean professional comment');
    
    console.log(`\n🎫 Cleaned ticket: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    
  } catch (error) {
    console.error('❌ Error cleaning Zoom ticket:', error.message);
  }
}

cleanZoomTicket();
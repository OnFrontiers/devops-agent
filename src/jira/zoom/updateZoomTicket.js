import JiraClient from '../core/jiraClient.js';

async function updateZoomTicket() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4681';
    
    console.log('📹 Updating Zoom optimization ticket with corrected scope...');
    
    // Update the summary to be more accurate
    const updateData = {
      fields: {
        summary: "Replace paid Zoom API license with custom SDK implementation"
      }
    };
    
    await jira.updateIssue(ticketKey, updateData);
    console.log('✅ Updated ticket summary');
    
    // Add corrected context comment
    const correctedComment = `CORRECTED SCOPE: 

Current situation: We're using <2k minutes/month, so usage isn't the issue.

The real issue: We're likely paying $600/month for Zoom's pre-built API/license solution.

Proposed solution: Replace the paid Zoom API license with a custom implementation using Zoom's free SDK.

Key differences:
- Current: Paid API license ($600/month) - ready-to-use API endpoints
- Target: Free SDK - build our own integration from scratch

Investigation needed:
- Identify which Zoom API services we're currently paying for
- Assess effort required to rebuild functionality using free SDK
- Calculate development time vs monthly savings ($600/month = $7,200/year)
- Ensure feature parity in custom SDK implementation`;

    await jira.addComment(ticketKey, correctedComment);
    console.log('✅ Added corrected context comment');
    
    console.log(`\n🎫 Updated ticket: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('📝 Summary: Replace paid Zoom API license with custom SDK implementation');
    
  } catch (error) {
    console.error('❌ Error updating Zoom ticket:', error.message);
  }
}

updateZoomTicket();
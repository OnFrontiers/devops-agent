import JiraClient from '../core/jiraClient.js';

async function createTestProductTicket() {
  try {
    const jira = new JiraClient();
    console.log('🎫 Creating a test product-development ticket...\n');
    
    // Sample ticket data as requested
    const ticketData = {
      summary: 'Test Product Development Ticket',
      issueType: 'Story',
      additionalLabels: ['product-development'], // Only product-development, NOT cost-reduction
      priority: { name: '2 - Medium' }
    };
    
    console.log('🔧 Creating product-development ticket...');
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY || 'ENG'}`);
    console.log(`   Assignee: You (${process.env.JIRA_EMAIL})`);
    console.log(`   Labels: ${ticketData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${ticketData.priority.name}`);
    console.log(`   Type: ${ticketData.issueType}`);
    console.log(`   Template: Background → Acceptance Criteria → Technical Design`);
    
    const result = await jira.createProductDevelopmentTicket(ticketData);
    
    console.log('\n✅ Ticket created successfully!');
    console.log(`🎫 Ticket Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    
    // Now update the status to "In Progress"
    console.log('\n🔄 Updating ticket status to "In Progress"...');
    
    try {
      const transitions = await jira.getTransitions(result.key);
      console.log(`   Found ${transitions.length} available transitions`);
      
      // Look for various forms of "In Progress" transition
      const inProgressTransition = transitions.find(t => 
        t.name.toLowerCase().includes('in progress') || 
        t.to?.name?.toLowerCase().includes('in progress') ||
        t.name.toLowerCase().includes('start') ||
        t.name.toLowerCase() === 'in progress'
      );
      
      if (inProgressTransition) {
        await jira.transitionIssue(result.key, inProgressTransition.id);
        console.log(`✅ Ticket status updated to "${inProgressTransition.name}"`);
      } else {
        console.log('⚠️ Could not find "In Progress" transition. Available transitions:');
        transitions.forEach((t, index) => {
          console.log(`   ${index + 1}. ${t.name} (ID: ${t.id})`);
        });
        console.log('\n🔧 You can manually transition the ticket using the web interface.');
      }
    } catch (statusError) {
      console.error('❌ Failed to update ticket status:', statusError.message);
      console.log('🔧 The ticket was created successfully, but status update failed.');
    }
    
    console.log('\n🎉 Product development ticket creation completed!');
    
  } catch (error) {
    console.error('❌ Error creating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
    if (error.response?.data?.errorMessages) {
      console.error('Error messages:', error.response.data.errorMessages);
    }
  }
}

// Run the function
createTestProductTicket();
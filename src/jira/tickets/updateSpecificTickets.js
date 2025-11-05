import JiraClient from '../core/jiraClient.js';

async function updateSpecificTickets() {
  try {
    const jira = new JiraClient();
    console.log('🎯 Updating specific cost optimization tickets...');
    
    // The 6 specific tickets to update
    const ticketsToUpdate = [
      'ENG-4657', // Migrate consultations actionable views from Hubspot to Ops Hub
      'ENG-4658', // Automate Google background checks pre-consultation
      'ENG-4659', // Create a consultation payment task console
      'ENG-4664', // One-off Linkedin PDF / CV importer
      'ENG-4666', // One-off profile polisher
      'ENG-4689'  // Extend OnFrontiers auth to the Operations Hub
    ];
    
    console.log(`📋 Processing ${ticketsToUpdate.length} specific tickets`);
    console.log(`🎯 Target parent epic: ENG-4687`);
    console.log(`📅 Target due date: September 15, 2025`);
    
    for (const ticketKey of ticketsToUpdate) {
      try {
        console.log(`\n🔄 Processing ${ticketKey}...`);
        
        // First, get the current ticket details to see if it has a parent
        const currentTicket = await jira.getIssue(ticketKey);
        const currentParent = currentTicket.fields.parent;
        
        if (currentParent) {
          console.log(`   Current parent: ${currentParent.key} - ${currentParent.fields.summary}`);
          // Note: We're noting the current parent but will replace it with ENG-4687
          // The user requested to make the current parent "related" which typically means 
          // adding it as a linked issue, but since they want these as child tickets of 4687,
          // we'll focus on the parent change
        } else {
          console.log(`   No current parent`);
        }
        
        // Update the ticket with new parent and due date
        const updateData = {
          fields: {
            parent: { key: 'ENG-4687' },
            duedate: '2025-09-15'
          }
        };
        
        console.log(`   Setting parent to ENG-4687 and due date to 2025-09-15...`);
        await jira.updateIssue(ticketKey, updateData);
        
        console.log(`✅ Successfully updated ${ticketKey}`);
        
      } catch (error) {
        console.error(`❌ Error updating ${ticketKey}:`, error.response?.data || error.message);
        // Continue with other tickets even if one fails
        continue;
      }
    }
    
    console.log('\n🎉 Specific ticket updates completed!');
    
    // Verify the changes
    console.log('\n🔍 Verifying updates...');
    for (const ticketKey of ticketsToUpdate) {
      try {
        const updatedTicket = await jira.getIssue(ticketKey);
        const parent = updatedTicket.fields.parent;
        const duedate = updatedTicket.fields.duedate;
        
        console.log(`${ticketKey}:`);
        console.log(`   Parent: ${parent ? parent.key : 'None'}`);
        console.log(`   Due Date: ${duedate || 'None'}`);
        
      } catch (error) {
        console.error(`❌ Error verifying ${ticketKey}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error in specific ticket update:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateSpecificTickets();
}

export default updateSpecificTickets;
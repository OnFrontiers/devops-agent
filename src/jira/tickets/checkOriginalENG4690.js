import JiraClient from '../core/jiraClient.js';

async function checkOriginalENG4690() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4690';
    
    console.log(`🔍 Getting current content of ticket ${ticketKey} to identify missing CEO scope...\n`);
    
    // Get the current ticket
    const currentTicket = await jira.getIssue(ticketKey);
    
    console.log(`📋 Current Summary: ${currentTicket.fields.summary}`);
    console.log(`📊 Current Status: ${currentTicket.fields.status.name}`);
    
    // Extract and display the current description content
    console.log('\n📝 Current Description Structure:');
    if (currentTicket.fields.description && currentTicket.fields.description.content) {
      currentTicket.fields.description.content.forEach((item, index) => {
        if (item.type === 'paragraph' && item.content && item.content[0]) {
          const text = item.content[0].text;
          const isHeader = item.content[0].marks && item.content[0].marks.some(mark => mark.type === 'strong');
          if (isHeader) {
            console.log(`   ${index + 1}. [HEADER] ${text}`);
          } else if (text && text.trim()) {
            console.log(`   ${index + 1}. ${text.substring(0, 80)}${text.length > 80 ? '...' : ''}`);
          }
        }
      });
    }
    
    console.log('\n💡 I need to restore the original content that was above "Technical Design"');
    console.log('   This likely includes Background, Acceptance Criteria, and any CEO scope content');
    
  } catch (error) {
    console.error('❌ Error getting ticket content:', error.message);
  }
}

// Run the function
checkOriginalENG4690();
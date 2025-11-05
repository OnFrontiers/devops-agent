import JiraClient from '../../core/jiraClient.js';

async function fixPhantombusterTicket() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4682';
    
    console.log('🔧 Converting ENG-4682 from Epic to Story and linking to Operations epic...');
    
    // Change issue type from Epic to Story
    console.log('\n1. Changing issue type from Epic to Story...');
    const typeUpdate = {
      fields: {
        issuetype: { name: 'Story' }
      }
    };
    await jira.updateIssue(ticketKey, typeUpdate);
    console.log('✅ Changed ENG-4682 from Epic to Story');
    
    // Link to parent epic (Operations tooling cuts)
    console.log('\n2. Linking to parent epic ENG-4655 (Operations tooling cuts)...');
    const parentUpdate = {
      fields: {
        parent: { key: 'ENG-4655' }
      }
    };
    await jira.updateIssue(ticketKey, parentUpdate);
    console.log('✅ Linked ENG-4682 to ENG-4655 (Operations tooling cuts)');
    
    console.log(`\n🎫 Fixed ticket: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    
    console.log('\n🎯 Corrected epic hierarchy:');
    console.log('   📁 ENG-4655 (Operations tooling cuts)');
    console.log('   ├── 📝 ENG-4680 (Notion integration)');
    console.log('   ├── ✅ ENG-4683 (Disassociate eniob@onfrontiers from all services)');
    console.log('   └── 📝 ENG-4682 (Phantombuster integration - $500 savings)');
    console.log('   📁 ENG-4656 (Product tech stack cuts)');
    console.log('   ├── 📝 ENG-4681 (Zoom API optimization)');
    console.log('   └── 📝 ENG-4684 (Downsize Sentry report subscriptions)');
    
  } catch (error) {
    console.error('❌ Error fixing Phantombuster ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

fixPhantombusterTicket();
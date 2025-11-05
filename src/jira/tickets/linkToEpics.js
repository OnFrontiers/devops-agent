import JiraClient from '../core/jiraClient.js';

async function linkStoriesToEpics() {
  try {
    const jira = new JiraClient();
    
    console.log('🔗 Linking stories to parent epics...');
    
    // Link ENG-4680 (Notion) to ENG-4655 (Operations tooling cuts)
    console.log('\n1. Linking ENG-4680 (Notion integration) to ENG-4655 (Operations tooling cuts)...');
    const notionUpdate = {
      fields: {
        parent: { key: 'ENG-4655' }
      }
    };
    await jira.updateIssue('ENG-4680', notionUpdate);
    console.log('✅ ENG-4680 linked to ENG-4655');
    
    // Link ENG-4681 (Zoom) to ENG-4656 (Product tech stack cuts)
    console.log('\n2. Linking ENG-4681 (Zoom API optimization) to ENG-4656 (Product tech stack cuts)...');
    const zoomUpdate = {
      fields: {
        parent: { key: 'ENG-4656' }
      }
    };
    await jira.updateIssue('ENG-4681', zoomUpdate);
    console.log('✅ ENG-4681 linked to ENG-4656');
    
    console.log('\n🎯 Epic-Story relationships established:');
    console.log('   📁 ENG-4655 (Operations tooling cuts)');
    console.log('   └── 📝 ENG-4680 (Notion integration)');
    console.log('   📁 ENG-4656 (Product tech stack cuts)');
    console.log('   └── 📝 ENG-4681 (Zoom API optimization)');
    
  } catch (error) {
    console.error('❌ Error linking stories to epics:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

linkStoriesToEpics();
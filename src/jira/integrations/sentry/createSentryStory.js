import JiraClient from '../../core/jiraClient.js';

async function createSentryStory() {
  try {
    const jira = new JiraClient();
    console.log('📊 Creating Sentry downsize story...');
    
    const storyData = {
      summary: "Downsize Sentry report subscriptions",
      issueType: "Story",
      additionalLabels: ["sentry"],
      priority: { name: "2 - Medium" }
    };
    
    console.log('\n🔧 Creating story with these settings:');
    console.log(`   Summary: ${storyData.summary}`);
    console.log(`   Type: ${storyData.issueType}`);
    console.log(`   Labels: cost-reduction, ${storyData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${storyData.priority.name}`);
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY}`);
    console.log(`   Assignee: ${process.env.JIRA_EMAIL}`);
    console.log(`   Parent: ENG-4656 (Product tech stack cuts)`);
    
    const result = await jira.createCostOptimizationTicket(storyData);
    
    console.log('\n✅ Sentry story created successfully!');
    console.log(`🎫 Story Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    
    // Link to parent epic (Product tech stack cuts)
    console.log('\n🔗 Linking to parent epic ENG-4656...');
    const parentUpdate = {
      fields: {
        parent: { key: 'ENG-4656' }
      }
    };
    await jira.updateIssue(result.key, parentUpdate);
    console.log('✅ Linked to ENG-4656 (Product tech stack cuts)');
    
    console.log('\n🎯 Updated epic hierarchy:');
    console.log('   📁 ENG-4655 (Operations tooling cuts)');
    console.log('   ├── 📝 ENG-4680 (Notion integration)');
    console.log('   └── ✅ ENG-4683 (Disassociate eniob@onfrontiers from all services)');
    console.log('   📁 ENG-4656 (Product tech stack cuts)');
    console.log('   ├── 📝 ENG-4681 (Zoom API optimization)');
    console.log(`   └── 📝 ${result.key} (Downsize Sentry report subscriptions)`);
    console.log('   📁 ENG-4682 (Phantombuster integration epic - $500 savings)');
    
  } catch (error) {
    console.error('❌ Error creating Sentry story:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createSentryStory();
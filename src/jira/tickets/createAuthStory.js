import JiraClient from '../core/jiraClient.js';

async function createAuthStory() {
  try {
    const jira = new JiraClient();
    console.log('🔐 Creating OnFrontiers auth extension story...');
    
    const storyData = {
      summary: "Extend OnFrontiers auth to the Operations Hub",
      issueType: "Story",
      additionalLabels: ["auth", "operations-hub"],
      priority: { name: "2 - Medium" }
    };
    
    console.log('\n🔧 Creating story with these settings:');
    console.log(`   Summary: ${storyData.summary}`);
    console.log(`   Type: ${storyData.issueType}`);
    console.log(`   Labels: cost-reduction, ${storyData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${storyData.priority.name}`);
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY}`);
    console.log(`   Assignee: ${process.env.JIRA_EMAIL}`);
    console.log(`   Parent: ENG-4655 (Operations tooling cuts)`);
    console.log(`   Status: Will be set to In Progress`);
    
    const result = await jira.createCostOptimizationTicket(storyData);
    
    console.log('\n✅ Auth extension story created successfully!');
    console.log(`🎫 Story Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    
    // Link to parent epic (Operations tooling cuts)
    console.log('\n🔗 Linking to parent epic ENG-4655...');
    const parentUpdate = {
      fields: {
        parent: { key: 'ENG-4655' }
      }
    };
    await jira.updateIssue(result.key, parentUpdate);
    console.log('✅ Linked to ENG-4655 (Operations tooling cuts)');
    
    // Get available transitions and move to In Progress
    console.log('\n🏃 Setting status to In Progress...');
    const transitions = await jira.getTransitions(result.key);
    console.log('Available transitions:', transitions.map(t => `${t.name} (${t.id})`).join(', '));
    
    // Look for "In Progress" or similar transition
    const inProgressTransition = transitions.find(t => 
      t.name.toLowerCase().includes('progress') || 
      t.name.toLowerCase().includes('start') ||
      t.name.toLowerCase() === 'in progress'
    );
    
    if (inProgressTransition) {
      await jira.transitionIssue(result.key, inProgressTransition.id);
      console.log(`✅ Transitioned to: ${inProgressTransition.name}`);
    } else {
      console.log('⚠️ No "In Progress" transition found. Available transitions:', transitions.map(t => t.name).join(', '));
    }
    
    console.log('\n🎯 Updated epic hierarchy:');
    console.log('   📁 ENG-4655 (Operations tooling cuts)');
    console.log('   ├── 📝 ENG-4680 (Notion integration)');
    console.log('   ├── ✅ ENG-4683 (Disassociate eniob@onfrontiers from all services)');
    console.log('   ├── 📝 ENG-4682 (Phantombuster integration - $500 savings)');
    console.log(`   └── 🏃 ${result.key} (Extend OnFrontiers auth to Operations Hub) - IN PROGRESS`);
    console.log('   📁 ENG-4656 (Product tech stack cuts)');
    console.log('   ├── 📝 ENG-4681 (Zoom API optimization)');
    console.log('   └── 📝 ENG-4684 (Downsize Sentry report subscriptions)');
    
  } catch (error) {
    console.error('❌ Error creating auth story:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createAuthStory();
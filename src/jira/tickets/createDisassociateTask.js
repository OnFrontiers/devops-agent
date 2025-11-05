import JiraClient from '../core/jiraClient.js';

async function createDisassociateTask() {
  try {
    const jira = new JiraClient();
    console.log('📧 Creating disassociate email task...');
    
    const taskData = {
      summary: "Disassociate eniob@onfrontiers from all services",
      issueType: "Task",
      additionalLabels: ["gmail"],
      priority: { name: "2 - Medium" }
    };
    
    console.log('\n🔧 Creating task with these settings:');
    console.log(`   Summary: ${taskData.summary}`);
    console.log(`   Type: ${taskData.issueType}`);
    console.log(`   Labels: cost-reduction, ${taskData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${taskData.priority.name}`);
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY}`);
    console.log(`   Assignee: ${process.env.JIRA_EMAIL}`);
    console.log(`   Parent: ENG-4655 (Operations tooling cuts)`);
    
    const result = await jira.createCostOptimizationTicket(taskData);
    
    console.log('\n✅ Disassociate task created successfully!');
    console.log(`🎫 Task Key: ${result.key}`);
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
    
    console.log('\n🎯 Updated epic hierarchy:');
    console.log('   📁 ENG-4655 (Operations tooling cuts)');
    console.log('   ├── 📝 ENG-4680 (Notion integration)');
    console.log(`   └── ✅ ${result.key} (Disassociate eniob@onfrontiers from all services)`);
    console.log('   📁 ENG-4656 (Product tech stack cuts)');
    console.log('   └── 📝 ENG-4681 (Zoom API optimization)');
    console.log('   📁 ENG-4682 (Phantombuster integration epic - $500 savings)');
    
  } catch (error) {
    console.error('❌ Error creating disassociate task:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createDisassociateTask();
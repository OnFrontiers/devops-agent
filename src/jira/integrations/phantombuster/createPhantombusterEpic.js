import JiraClient from '../../core/jiraClient.js';

async function createPhantombusterEpic() {
  try {
    const jira = new JiraClient();
    console.log('👻 Creating Phantombuster integration epic...');
    
    const epicData = {
      summary: "Integrate phantombuster to our email enrichment process",
      issueType: "Epic",
      additionalLabels: ["phantombuster", "contactout"],
      priority: { name: "2 - Medium" }
    };
    
    console.log('\n🔧 Creating epic with these settings:');
    console.log(`   Summary: ${epicData.summary}`);
    console.log(`   Type: ${epicData.issueType}`);
    console.log(`   Labels: cost-reduction, ${epicData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${epicData.priority.name}`);
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY}`);
    console.log(`   Assignee: ${process.env.JIRA_EMAIL}`);
    console.log(`   Parent: ENG-4655 (Operations tooling cuts)`);
    console.log(`   Target Savings: $500`);
    
    const result = await jira.createCostOptimizationTicket(epicData);
    
    console.log('\n✅ Phantombuster epic created successfully!');
    console.log(`🎫 Epic Key: ${result.key}`);
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
    
    // Add comment with savings target
    console.log('\n💰 Adding savings target information...');
    const savingsComment = `Target Savings: $500

This epic focuses on integrating Phantombuster into our email enrichment process to optimize costs and improve efficiency. The target savings of $500 likely comes from:
- Reducing dependency on more expensive email enrichment services
- Leveraging Phantombuster's automation capabilities for contact data processing
- Optimizing ContactOut usage through better data flow integration`;

    await jira.addComment(result.key, savingsComment);
    console.log('✅ Added savings target comment');
    
    console.log('\n🎯 Epic hierarchy now:');
    console.log('   📁 ENG-4655 (Operations tooling cuts)');
    console.log('   ├── 📝 ENG-4680 (Notion integration)');
    console.log(`   └── 📁 ${result.key} (Phantombuster integration) - $500 target savings`);
    
  } catch (error) {
    console.error('❌ Error creating Phantombuster epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createPhantombusterEpic();
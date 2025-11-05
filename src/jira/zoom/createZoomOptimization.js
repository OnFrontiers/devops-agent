import JiraClient from '../core/jiraClient.js';

async function createZoomOptimizationStory() {
  try {
    const jira = new JiraClient();
    console.log('📹 Creating Zoom API optimization story...');
    
    const storyData = {
      summary: "Optimize Zoom integration costs by leveraging free tier limits",
      issueType: "Story",
      additionalLabels: ["zoom", "api-optimization"],
      priority: { name: "2 - Medium" }
    };
    
    console.log('\n🔧 Creating story with these settings:');
    console.log(`   Summary: ${storyData.summary}`);
    console.log(`   Type: ${storyData.issueType}`);
    console.log(`   Labels: cost-reduction, ${storyData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${storyData.priority.name}`);
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY}`);
    console.log(`   Assignee: ${process.env.JIRA_EMAIL}`);
    console.log(`   Context: CEO mentioned $600/month API costs vs 10k free minutes`);
    
    const result = await jira.createCostOptimizationTicket(storyData);
    
    console.log('\n✅ Zoom optimization story created successfully!');
    console.log(`🎫 Ticket Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    
    // Add a comment with context about the CEO's request
    console.log('\n📝 Adding context comment about CEO request...');
    const contextComment = `Context from CEO: Currently paying $600/month for Zoom API usage. CEO mentioned SDK offers 10k free minutes per month. 

Investigation needed:
- Review current Zoom API usage and costs
- Assess if we can optimize within free tier limits (10k minutes/month)
- Consider switching to more cost-effective Zoom plan or usage pattern
- Potential savings: Up to $600/month if we can operate within free limits`;
    
    await jira.addComment(result.key, contextComment);
    console.log('✅ Context comment added to ticket');
    
  } catch (error) {
    console.error('❌ Error creating Zoom optimization story:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createZoomOptimizationStory();
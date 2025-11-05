import JiraClient from '../core/jiraClient.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createCostOptimizationTicket() {
  try {
    const jira = new JiraClient();
    console.log('🎫 Creating a new cost-optimization ticket...\n');
    
    // Get ticket details from user
    const summary = await askQuestion('Enter ticket summary: ');
    const issueType = await askQuestion('Enter issue type (Story/Bug/Epic/Task) [default: Story]: ') || 'Story';
    const additionalLabels = await askQuestion('Enter additional labels (comma-separated) [optional]: ');
    const priority = await askQuestion('Enter priority (1 - High/2 - Medium/3 - Low) [default: 2 - Medium]: ') || '2 - Medium';
    
    // Parse additional labels
    const labelArray = additionalLabels ? additionalLabels.split(',').map(label => label.trim()) : [];
    
    // Create ticket data
    const ticketData = {
      summary,
      issueType,
      additionalLabels: labelArray,
      priority: { name: priority }
    };
    
    console.log('\n🔧 Creating ticket with default cost-optimization settings...');
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY || 'ENG'}`);
    console.log(`   Assignee: You (${process.env.JIRA_EMAIL})`);
    console.log(`   Labels: cost-reduction${labelArray.length > 0 ? ', ' + labelArray.join(', ') : ''}`);
    console.log(`   Priority: ${priority}`);
    console.log(`   Type: ${issueType}`);
    
    const result = await jira.createCostOptimizationTicket(ticketData);
    
    console.log('\n✅ Ticket created successfully!');
    console.log(`🎫 Ticket Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    
    rl.close();
    
  } catch (error) {
    console.error('❌ Error creating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', error.response.data.errors);
    }
    rl.close();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createCostOptimizationTicket();
}

export default createCostOptimizationTicket;

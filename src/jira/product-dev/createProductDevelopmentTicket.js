import JiraClient from '../core/jiraClient.js';
import readline from 'readline';
import pickComponents from '../core/prompts/componentsPrompt.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createProductDevelopmentTicket() {
  try {
    const jira = new JiraClient();
    console.log('🎫 Creating a new product-development ticket...\n');
    
    // Get ticket details from user
    const summary = await askQuestion('Enter ticket summary: ');
    const issueType = await askQuestion('Enter issue type (Story/Bug/Epic/Task) [default: Story]: ') || 'Story';
    const additionalLabels = await askQuestion('Enter additional labels (comma-separated) [optional]: ');
    const priority = await askQuestion('Enter priority (1 - High/2 - Medium/3 - Low) [default: 2 - Medium]: ') || '2 - Medium';
    
  // Parse additional labels and add product-development
  const labelArray = additionalLabels ? additionalLabels.split(',').map(label => label.trim()) : [];
  labelArray.unshift('product-development'); // Add product-development as first label

  // Confirm components to add on creation (interactive or via flags/env)
  const projectKey = process.env.JIRA_PROJECT_KEY || 'ENG';
  const components = await pickComponents(projectKey);
  
  // Create ticket data
    const ticketData = {
      summary,
      issueType,
      additionalLabels: labelArray,
      priority: { name: priority },
      components
    };
    
    console.log('\n🔧 Creating product-development ticket...');
    console.log(`   Project: ${process.env.JIRA_PROJECT_KEY || 'ENG'}`);
    console.log(`   Assignee: You (${process.env.JIRA_EMAIL})`);
    console.log(`   Labels: ${labelArray.join(', ')}`);
    console.log(`   Priority: ${priority}`);
    console.log(`   Type: ${issueType}`);
    console.log(`   Components: ${components && components.length ? components.map(c => c.id).join(', ') : 'None'}`);
    
    const result = await jira.createProductDevelopmentTicket(ticketData);
    
    console.log('\n✅ Ticket created successfully!');
    console.log(`🎫 Ticket Key: ${result.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    
    // Now update the status to "In Progress"
    console.log('\n🔄 Updating ticket status to "In Progress"...');
    
    try {
      const transitions = await jira.getTransitions(result.key);
      const inProgressTransition = transitions.find(t => 
        t.name.toLowerCase().includes('in progress') || 
        t.to?.name?.toLowerCase().includes('in progress')
      );
      
      if (inProgressTransition) {
        await jira.transitionIssue(result.key, inProgressTransition.id);
        console.log('✅ Ticket status updated to "In Progress"');
      } else {
        console.log('⚠️ Could not find "In Progress" transition. Available transitions:');
        transitions.forEach(t => console.log(`   - ${t.name}`));
      }
    } catch (statusError) {
      console.error('❌ Failed to update ticket status:', statusError.message);
    }
    
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
  createProductDevelopmentTicket();
}

export default createProductDevelopmentTicket;

import JiraClient from './jiraClient.js';
import queryCostOptimization from '../cost-optimization/myCostOptimization.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class JiraAutomation {
  constructor() {
    try {
      this.jira = new JiraClient();
      console.log('✅ Jira client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Jira client:', error.message);
      process.exit(1);
    }
  }

  async showMenu() {
    console.log('\n=== Jira Automation Menu ===');
    console.log('1. Get ticket details');
    console.log('2. Update ticket');
    console.log('3. Add comment to ticket');
    console.log('4. Search tickets');
    console.log('5. Change ticket status');
    console.log('6. Assign ticket');
    console.log('7. Create cost-optimization ticket');
    console.log('8. View my cost-optimization tickets');
    console.log('9. Exit');
    console.log('=============================');
  }

  async getTicketDetails() {
    const issueKey = await this.askQuestion('Enter ticket key (e.g., PROJ-123): ');
    try {
      const issue = await this.jira.getIssue(issueKey);
      console.log(`\n📋 Ticket: ${issue.key}`);
      console.log(`📄 Summary: ${issue.fields.summary}`);
      console.log(`📊 Status: ${issue.fields.status.name}`);
      console.log(`👤 Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
      console.log(`🔥 Priority: ${issue.fields.priority?.name || 'None'}`);
      if (issue.fields.description) {
        console.log(`📝 Description: ${this.extractTextFromContent(issue.fields.description)}`);
      }
    } catch (error) {
      console.error('❌ Failed to fetch ticket details');
    }
  }

  async updateTicket() {
    const issueKey = await this.askQuestion('Enter ticket key: ');
    const summary = await this.askQuestion('Enter new summary (press Enter to skip): ');
    const description = await this.askQuestion('Enter new description (press Enter to skip): ');
    
    const updateData = { fields: {} };
    if (summary.trim()) {
      updateData.fields.summary = summary;
    }
    if (description.trim()) {
      updateData.fields.description = {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: description
              }
            ]
          }
        ]
      };
    }

    if (Object.keys(updateData.fields).length === 0) {
      console.log('❌ No updates provided');
      return;
    }

    try {
      await this.jira.updateIssue(issueKey, updateData);
      console.log('✅ Ticket updated successfully');
    } catch (error) {
      console.error('❌ Failed to update ticket');
    }
  }

  async addComment() {
    const issueKey = await this.askQuestion('Enter ticket key: ');
    const comment = await this.askQuestion('Enter comment: ');
    
    try {
      await this.jira.addComment(issueKey, comment);
      console.log('✅ Comment added successfully');
    } catch (error) {
      console.error('❌ Failed to add comment');
    }
  }

  async searchTickets() {
    const jql = await this.askQuestion('Enter JQL query (e.g., "assignee = currentUser() AND status = Open"): ');
    
    try {
      const results = await this.jira.searchIssues(jql);
      console.log(`\n🔍 Found ${results.total} tickets:`);
      results.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary} [${issue.fields.status.name}]`);
      });
    } catch (error) {
      console.error('❌ Failed to search tickets');
    }
  }

  async changeTicketStatus() {
    const issueKey = await this.askQuestion('Enter ticket key: ');
    
    try {
      const transitions = await this.jira.getTransitions(issueKey);
      console.log('\nAvailable transitions:');
      transitions.forEach((transition, index) => {
        console.log(`${index + 1}. ${transition.name} (ID: ${transition.id})`);
      });
      
      const choice = await this.askQuestion('Enter transition number: ');
      const selectedTransition = transitions[parseInt(choice) - 1];
      
      if (!selectedTransition) {
        console.log('❌ Invalid choice');
        return;
      }
      
      await this.jira.transitionIssue(issueKey, selectedTransition.id);
      console.log(`✅ Ticket transitioned to ${selectedTransition.name}`);
    } catch (error) {
      console.error('❌ Failed to change ticket status');
    }
  }

  async assignTicket() {
    const issueKey = await this.askQuestion('Enter ticket key: ');
    const accountId = await this.askQuestion('Enter assignee account ID (or email): ');
    
    try {
      await this.jira.assignIssue(issueKey, accountId);
      console.log('✅ Ticket assigned successfully');
    } catch (error) {
      console.error('❌ Failed to assign ticket');
    }
  }

  async createCostOptimizationTicket() {
    const summary = await this.askQuestion('Enter ticket summary: ');
    const issueType = await this.askQuestion('Enter issue type (Story/Bug/Epic/Task) [default: Story]: ') || 'Story';
    const additionalLabels = await this.askQuestion('Enter additional labels (comma-separated) [optional]: ');
    const priority = await this.askQuestion('Enter priority (1 - High/2 - Medium/3 - Low) [default: 2 - Medium]: ') || '2 - Medium';
    
    const labelArray = additionalLabels ? additionalLabels.split(',').map(label => label.trim()) : [];
    
    const ticketData = {
      summary,
      issueType,
      additionalLabels: labelArray,
      priority: { name: priority }
    };
    
    console.log('\n🔧 Creating ticket with default cost-optimization settings...');
    
    try {
      const result = await this.jira.createCostOptimizationTicket(ticketData);
      console.log('\n✅ Ticket created successfully!');
      console.log(`🎫 Ticket Key: ${result.key}`);
      console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${result.key}`);
    } catch (error) {
      console.error('❌ Failed to create ticket');
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
      }
    }
  }

  async viewMyCostOptimizationTickets() {
    console.log('🔍 Loading your cost-optimization tickets...');
    await queryCostOptimization();
  }

  extractTextFromContent(content) {
    if (!content || !content.content) return '';
    return content.content.map(paragraph => 
      paragraph.content?.map(item => item.text).join('') || ''
    ).join(' ').trim();
  }

  askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
  }

  async run() {
    console.log('🚀 Welcome to Jira Automation!');
    
    while (true) {
      await this.showMenu();
      const choice = await this.askQuestion('Select an option: ');
      
      switch (choice) {
        case '1':
          await this.getTicketDetails();
          break;
        case '2':
          await this.updateTicket();
          break;
        case '3':
          await this.addComment();
          break;
        case '4':
          await this.searchTickets();
          break;
        case '5':
          await this.changeTicketStatus();
          break;
        case '6':
          await this.assignTicket();
          break;
        case '7':
          await this.createCostOptimizationTicket();
          break;
        case '8':
          await this.viewMyCostOptimizationTickets();
          break;
        case '9':
          console.log('👋 Goodbye!');
          rl.close();
          return;
        default:
          console.log('❌ Invalid option. Please try again.');
      }
    }
  }
}

const app = new JiraAutomation();
app.run().catch(console.error);

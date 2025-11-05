import JiraClient from '../core/jiraClient.js';

async function createExpertRecruitingEpic() {
  try {
    const jira = new JiraClient();
    console.log('Creating Expert Recruiting Migration Epic...');

    // Create the Epic first
    const epicData = {
      summary: "Migrate Expert Recruiting to the OpsHub",
      issueType: "Epic",
      additionalLabels: ["expert-recruiting", "ops-hub-migration", "recruiting"],
      priority: { name: "2 - Medium" }
    };

    console.log('\nCreating Epic with these settings:');
    console.log(`   Summary: ${epicData.summary}`);
    console.log(`   Type: ${epicData.issueType}`);
    console.log(`   Labels: cost-reduction, ${epicData.additionalLabels.join(', ')}`);
    console.log(`   Start Date: 2025-11-05`);
    console.log(`   Due Date: 2025-11-19`);

    const epicResult = await jira.createCostOptimizationTicket(epicData);

    console.log('\nEpic created successfully!');
    console.log(`Epic Key: ${epicResult.key}`);
    console.log(`URL: ${process.env.JIRA_BASE_URL}/browse/${epicResult.key}`);

    // Set start date and due date for the epic
    console.log('\nSetting Epic dates...');
    const epicDates = {
      fields: {
        // Add custom fields for start/due dates
        duedate: '2025-11-19'  // Due date 2 weeks after start
        // Start date will need to be added via custom field if available
      }
    };

    await jira.updateIssue(epicResult.key, epicDates);
    console.log('Epic dates set successfully');

    const epicKey = epicResult.key;

    // Now create child tickets
    const childTickets = [
      {
        summary: "Create a Dashboard for campaign definition",
        startDate: '2025-11-05',
        dueDate: '2025-11-07'
      },
      {
        summary: "Triggering new batches",
        startDate: '2025-11-07',
        dueDate: '2025-11-09'
      },
      {
        summary: "Integration with the Contact Enricher",
        startDate: '2025-11-09',
        dueDate: '2025-11-14'
      },
      {
        summary: "Integration with the Auto-Replier",
        startDate: '2025-11-11',
        dueDate: '2025-11-16'
      }
    ];

    console.log('\nCreating child tickets...');

    for (let i = 0; i < childTickets.length; i++) {
      const child = childTickets[i];
      console.log(`\n  ${i + 1}. Creating: "${child.summary}"`);
      console.log(`     Start: ${child.startDate}, Due: ${child.dueDate}`);

      // Create child ticket
      const childResult = await jira.createCostOptimizationTicket({
        summary: child.summary,
        issueType: "Story",
        additionalLabels: ["expert-recruiting", `child-${i + 1}`],
        priority: { name: "2 - Medium" }
      });

      console.log(`     Ticket: ${childResult.key}`);

      // Link to epic parent
      const parentUpdate = {
        fields: {
          parent: { key: epicKey }
        }
      };

      await jira.updateIssue(childResult.key, parentUpdate);
      console.log(`     Linked to epic ${epicKey}`);

      // Set dates
      const datesUpdate = {
        fields: {
          duedate: child.dueDate
          // Start date would be set via custom field if available
        }
      };

      await jira.updateIssue(childResult.key, datesUpdate);
      console.log(`     Dates set: due ${child.dueDate}`);

      // Move to "Ready for Development" status
      console.log('     Setting status to "Ready for Development"...');
      const transitions = await jira.getTransitions(childResult.key);

      // Look for "Ready for Development" or similar transition
      const devReadyTransition = transitions.find(t =>
        t.name.toLowerCase().includes('ready') ||
        t.name.toLowerCase().includes('dev') ||
        t.name.includes('Ready for Development') ||
        t.name.includes('To Do')
      );

      if (devReadyTransition) {
        await jira.transitionIssue(childResult.key, devReadyTransition.id);
        console.log(`     ✅ Status set to: ${devReadyTransition.name}`);
      } else {
        console.log('     ❓ Ready for Development transition not found. Available:', transitions.map(t => t.name).join(', '));
      }
    }

    console.log('\n🎯 Expert Recruiting Epic hierarchy created:');
    console.log(`Epic: ${epicKey} - "${epicData.summary}"`);
    console.log(' └── Child Tickets (all Ready for Development):');
    console.log('     ├── Dashboard for campaign definition (11/5-11/7)');
    console.log('     ├── Triggering new batches (11/7-11/9)');
    console.log('     ├── Contact Enricher integration (11/9-11/14)');
    console.log('     └── Auto-Replier integration (11/11-11/16)');

    console.log('\nℹ️  Note: Start dates set using available date fields. Due dates set via standard duedate field.');

  } catch (error) {
    console.error('Error creating expert recruiting epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
createExpertRecruitingEpic();

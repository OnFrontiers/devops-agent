import JiraClient from '../core/jiraClient.js';

async function searchSMBPricingTickets() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Searching for existing tickets related to SMB Pricing Epic...\n');

    // Define search queries for different aspects of the SMB pricing epic
    const searchQueries = [
      {
        name: 'SMB Pricing Model',
        jql: 'text ~ "SMB pricing" OR text ~ "pricing model" OR text ~ "seat licensing" OR text ~ "seat-based"',
        description: 'Tickets mentioning SMB pricing, pricing models, or seat licensing'
      },
      {
        name: 'Subscription Management',
        jql: 'text ~ "subscription" AND (text ~ "monthly" OR text ~ "annual" OR text ~ "billing")',
        description: 'Tickets related to subscription management and billing cycles'
      },
      {
        name: 'Stripe Integration',
        jql: 'text ~ "Stripe" AND (text ~ "charging" OR text ~ "billing" OR text ~ "payment" OR text ~ "credit card" OR text ~ "ACH")',
        description: 'Tickets mentioning Stripe integration for payments and charging'
      },
      {
        name: 'USD Pricing Display',
        jql: 'text ~ "USD" AND text ~ "pricing" AND (text ~ "display" OR text ~ "show" OR text ~ "notification")',
        description: 'Tickets about displaying USD pricing instead of credits'
      },
      {
        name: 'Customer Onboarding',
        jql: 'text ~ "Govtribe" OR (text ~ "onboarding" AND text ~ "customer") OR text ~ "signup flow"',
        description: 'Tickets related to customer onboarding and signup processes'
      },
      {
        name: 'Usage-Based Fees',
        jql: 'text ~ "booking fee" OR text ~ "consultation fee" OR text ~ "cancellation fee" OR text ~ "no-show fee"',
        description: 'Tickets about usage-based fees and charges'
      },
      {
        name: 'Seat Management',
        jql: 'text ~ "seat management" OR text ~ "team seat" OR text ~ "user seat" OR text ~ "full access" OR text ~ "read only"',
        description: 'Tickets about seat management and user permissions'
      },
      {
        name: 'Settings & UI Changes',
        jql: '(text ~ "hide credit" OR text ~ "subscription tab") AND text ~ "settings"',
        description: 'Tickets about UI changes for SMB plans (hiding credits, subscription tabs)'
      }
    ];

    const allResults = [];
    let totalTicketsFound = 0;

    // Execute each search query
    for (const query of searchQueries) {
      console.log(`\n🔎 ${query.name}`);
      console.log(`   ${query.description}`);
      console.log(`   JQL: ${query.jql}`);

      try {
        const searchResult = await jira.searchIssues(
          query.jql,
          0,
          50, // Limit to 50 results per query to avoid overwhelming output
          ['key', 'summary', 'status', 'assignee', 'created', 'updated', 'labels', 'issuetype', 'priority', 'description']
        );

        // Debug: log the full response structure
        // console.log('DEBUG - Full response:', JSON.stringify(searchResult, null, 2));

        const totalCount = searchResult.total || searchResult.issues?.length || 0;
        console.log(`   📊 Found ${totalCount} ticket(s)\n`);

        if (totalCount > 0) {
          totalTicketsFound += totalCount;

          searchResult.issues.forEach((issue, index) => {
            const result = {
              key: issue.key,
              summary: issue.fields.summary,
              status: issue.fields.status.name,
              issuetype: issue.fields.issuetype.name,
              assignee: issue.fields.assignee?.displayName || 'Unassigned',
              created: issue.fields.created,
              updated: issue.fields.updated,
              labels: issue.fields.labels,
              priority: issue.fields.priority?.name || 'None',
              queryCategory: query.name
            };

            allResults.push(result);

            console.log(`   ${index + 1}. ${issue.key}: ${issue.fields.summary}`);
            console.log(`      Type: ${issue.fields.issuetype.name} | Status: ${issue.fields.status.name}`);
            console.log(`      Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
            console.log(`      Priority: ${issue.fields.priority?.name || 'None'}`);
            console.log(`      Labels: ${issue.fields.labels.join(', ') || 'None'}`);
            console.log(`      Created: ${new Date(issue.fields.created).toLocaleDateString()}`);
            console.log('      ---');
          });
        }
      } catch (error) {
        console.log(`   ❌ Error executing query: ${error.message}`);
      }
    }

    // Summary
    console.log(`\n📈 SEARCH SUMMARY`);
    console.log(`   Total tickets found across all queries: ${totalTicketsFound}`);

    if (totalTicketsFound > 0) {
      console.log('\n🎯 POTENTIAL DUPLICATES OR RELATED WORK:');

      // Group by issue type
      const epics = allResults.filter(r => r.issuetype === 'Epic');
      const stories = allResults.filter(r => r.issuetype === 'Story');
      const tasks = allResults.filter(r => r.issuetype === 'Task');

      if (epics.length > 0) {
        console.log(`\n   📋 EXISTING EPICS (${epics.length}):`);
        epics.forEach(epic => {
          console.log(`      ${epic.key}: ${epic.summary} (${epic.status})`);
        });
      }

      if (stories.length > 0) {
        console.log(`\n   📝 EXISTING STORIES (${stories.length}):`);
        stories.forEach(story => {
          console.log(`      ${story.key}: ${story.summary} (${story.status}) - ${story.queryCategory}`);
        });
      }

      if (tasks.length > 0) {
        console.log(`\n   ✅ EXISTING TASKS (${tasks.length}):`);
        tasks.forEach(task => {
          console.log(`      ${task.key}: ${task.summary} (${task.status}) - ${task.queryCategory}`);
        });
      }

      console.log('\n⚠️  RECOMMENDATION: Review the tickets above before creating a new epic to avoid duplication.');
    } else {
      console.log('\n✅ No existing tickets found that match the SMB pricing epic scope.');
      console.log('   It appears safe to proceed with creating the new epic.');
    }

  } catch (error) {
    console.error('❌ Error searching for SMB pricing tickets:', error.message);
  }
}

searchSMBPricingTickets();

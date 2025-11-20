import JiraClient from '../core/jiraClient.js';

async function findExpertApplicationsEpicTickets() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Finding epic specifically about Expert Applications with Operations Hub component...\n');

    // More refined search: look for epics that mention "expert applications" in summary or description
    const epicJql = `issuetype = Epic
      AND component = "Operations Hub"
      AND (summary ~ "expert application*" OR description ~ "expert application*")
      ORDER BY created DESC`;

    console.log('📋 Epic search JQL (more specific):');
    console.log(epicJql);
    console.log('');

    const epicResults = await jira.searchIssues(epicJql, 0, 10, [
      'key', 'summary', 'status', 'assignee', 'created', 'priority', 'components', 'labels', 'description'
    ]);

    if (epicResults.total === 0) {
      console.log('❌ No epics found with "expert application*" in title/description.');
      console.log('Searching for any epics with Operations Hub component that might be related...\n');

      // Fallback: search for any epics with Operations Hub component
      const fallbackJql = `issuetype = Epic AND component = "Operations Hub" ORDER BY created DESC`;
      console.log('📋 Fallback search JQL:');
      console.log(fallbackJql);
      console.log('');

      const fallbackResults = await jira.searchIssues(fallbackJql, 0, 10, [
        'key', 'summary', 'status', 'assignee', 'created', 'priority', 'components', 'labels', 'description'
      ]);

      if (fallbackResults.total === 0) {
        console.log('❌ No epics found with Operations Hub component at all.');
        return;
      }

      console.log(`📋 Found ${fallbackResults.total} epics with Operations Hub component:`);
      fallbackResults.issues.forEach((epic, index) => {
        console.log(`   ${index + 1}. ${epic.key}: "${epic.fields.summary}" (Created: ${epic.fields.created})`);
        if (epic.fields.description && epic.fields.description.text) {
          // Extract first 100 chars of description
          const description = epic.fields.description.text.substring(0, 100) + '...';
          console.log(`      Description: ${description}`);
        }
        console.log('');
      });

      console.log('❓ Please clarify which epic you\'re referring to, as none specifically mention "expert applications".');
      return;
    }

    const epic = epicResults.issues[0];
    console.log(`🎯 Found Epic: ${epic.key} - "${epic.fields.summary}"`);
    console.log(`   Status: ${epic.fields.status.name}`);
    console.log(`   Created: ${epic.fields.created}`);
    console.log(`   Priority: ${epic.fields.priority.name}`);
    console.log(`   Components: ${(epic.fields.components || []).map(c => c.name).join(', ') || 'None'}`);
    console.log(`   Labels: ${(epic.fields.labels || []).join(', ') || 'None'}`);

    if (epic.fields.description) {
      console.log(`   Description preview: ${(epic.fields.description.content || [])
        .map(block => block.content?.map(text => text.text).join('') || '').join(' ')
        .substring(0, 200)}...`);
    }
    console.log('');

    // Now find all tickets inside this epic
    const childrenJql = `parent = ${epic.key} ORDER BY issuetype, created ASC`;

    console.log('📋 Child tickets search JQL:');
    console.log(childrenJql);
    console.log('');

    const childrenResults = await jira.searchIssues(childrenJql, 0, 100, [
      'key', 'summary', 'status', 'issuetype', 'assignee', 'created', 'priority', 'labels', 'description'
    ]);

    console.log(`📊 Found ${childrenResults.total} tickets inside the epic:`);
    console.log('');

    if (childrenResults.total === 0) {
      console.log('   No child tickets found in this epic.');
      return;
    }

    // Group tickets by type and display
    const ticketsByType = {};
    childrenResults.issues.forEach(ticket => {
      const type = ticket.fields.issuetype.name;
      if (!ticketsByType[type]) {
        ticketsByType[type] = [];
      }
      ticketsByType[type].push(ticket);
    });

    Object.keys(ticketsByType).forEach(type => {
      console.log(`🔸 ${type}: ${ticketsByType[type].length} tickets`);

      ticketsByType[type].forEach(ticket => {
        const assignee = ticket.fields.assignee ? ticket.fields.assignee.displayName : 'Unassigned';
        const priority = ticket.fields.priority ? ticket.fields.priority.name : 'Not set';
        const labels = ticket.fields.labels && ticket.fields.labels.length ? ` [${ticket.fields.labels.join(', ')}]` : '';

        console.log(`   ├── ${ticket.key}: ${ticket.fields.summary}`);
        console.log(`   │   Status: ${ticket.fields.status.name} | Priority: ${priority} | Assignee: ${assignee}${labels}`);
        console.log(`   │   Created: ${ticket.fields.created}`);
        console.log('');
      });
    });

    // Summary
    console.log('📈 SUMMARY:');
    console.log(`   Epic: ${epic.key} - "${epic.fields.summary}"`);
    console.log(`   Total child tickets: ${childrenResults.total}`);

    Object.keys(ticketsByType).forEach(type => {
      console.log(`   ${type}: ${ticketsByType[type].length}`);
    });

  } catch (error) {
    console.error('❌ Error finding expert applications epic tickets:', error.message);
    if (error.response?.data?.errors) {
      console.error('JQL errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

findExpertApplicationsEpicTickets();

import JiraClient from '../core/jiraClient.js';

async function migrateEngToBkgByCreatingDuplicates() {
  try {
    const jira = new JiraClient();

    // Get the 95 ENG tickets that need migration
    console.log('🔍 Getting ENG tickets that need migration...');
    const jql = 'project = ENG AND status = Backlog AND created < -730d';

    const results = await jira.searchIssues(jql, 0, 100, [
      'summary',
      'description',
      'status',
      'created',
      'assignee',
      'issuetype',
      'priority',
      'labels',
      'comment'
    ]);

    console.log(`Found ${results.total} ENG tickets to migrate`);

    // Process remaining tickets (skip the first 20 that were already migrated)
    const ticketsToMigrate = results.issues.slice(20, 95); // tickets 21-95

    console.log(`\n🚀 Starting migration of ${ticketsToMigrate.length} tickets...`);

    let successCount = 0;
    let failureCount = 0;
    const migratedTickets = [];

    for (let i = 0; i < ticketsToMigrate.length; i++) {
      const engTicket = ticketsToMigrate[i];
      const engKey = engTicket.key;

      try {
        console.log(`\n[${i + 1}/${ticketsToMigrate.length}] Migrating ${engKey}...`);

        // Create new ticket in BKG project with same details
        const ticketData = {
          fields: {
            project: { key: 'BKG' },
            summary: engTicket.fields.summary,
            description: engTicket.fields.description || {
              type: "doc",
              version: 1,
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: `Migrated from ${engKey} (created ${new Date(engTicket.fields.created).toLocaleDateString()})`
                    }
                  ]
                }
              ]
            },
            issuetype: { id: "10194" }, // "Feature Ideas" - the issue type used in BKG project
            assignee: engTicket.fields.assignee ? { accountId: engTicket.fields.assignee.accountId } : undefined,
            priority: engTicket.fields.priority ? { name: engTicket.fields.priority.name } : undefined,
            labels: [...(engTicket.fields.labels || []), 'migrated-from-eng', `original-${engKey}`]
          }
        };

        console.log(`   📝 Creating new BKG ticket...`);
        const newTicket = await jira.client.post('/issue', ticketData);
        const bkgKey = newTicket.data.key;

        console.log(`   ✅ Created ${bkgKey} in BKG project`);

        // Now transition the BKG ticket to "Waiting initial review"
        console.log(`   🔄 Transitioning ${bkgKey} to "Waiting initial review"...`);

        // Get available transitions for the new BKG ticket
        const transitions = await jira.getTransitions(bkgKey);

        // Look for "Waiting initial review" transition
        const targetTransition = transitions.find(t =>
          t.name.toLowerCase().includes('waiting initial review') ||
          t.name === 'Waiting initial review'
        );

        if (targetTransition) {
          await jira.transitionIssue(bkgKey, targetTransition.id);
          console.log(`   ✅ Successfully transitioned ${bkgKey} to "Waiting initial review"`);

          // Add comment to both tickets
          await jira.addComment(bkgKey, `✅ Migration completed: Created from ${engKey} and transitioned to "Waiting initial review" status.`);
          await jira.addComment(engKey, `✅ Migrated to ${bkgKey} in BKG project with "Waiting initial review" status.`);

          migratedTickets.push({
            originalEngKey: engKey,
            newBkgKey: bkgKey,
            status: 'success'
          });

          successCount++;
        } else {
          console.log(`   ⚠️  Could not find "Waiting initial review" transition for ${bkgKey}`);
          console.log(`   Available transitions: ${transitions.map(t => t.name).join(', ')}`);

          // Still mark as partial success since ticket was created
          await jira.addComment(bkgKey, `⚠️ Created from ${engKey} but could not transition to "Waiting initial review". Available transitions: ${transitions.map(t => t.name).join(', ')}.`);
          await jira.addComment(engKey, `⚠️ Migrated to ${bkgKey} in BKG project but status transition failed.`);

          migratedTickets.push({
            originalEngKey: engKey,
            newBkgKey: bkgKey,
            status: 'partial',
            issue: 'Status transition failed'
          });

          successCount++; // Still count as success since ticket was created
        }

      } catch (error) {
        console.error(`   ❌ Error migrating ${engKey}:`, error.message);
        if (error.response?.data) {
          console.error(`   Error details:`, JSON.stringify(error.response.data, null, 2));
        }

        migratedTickets.push({
          originalEngKey: engKey,
          newBkgKey: null,
          status: 'failed',
          error: error.message,
          details: error.response?.data
        });

        failureCount++;
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('📊 Migration Summary:');
    console.log(`   ✅ Successfully processed: ${successCount} items`);
    console.log(`   ❌ Failed: ${failureCount} items`);

    console.log('\n📋 Migration Details:');
    migratedTickets.forEach((migration, index) => {
      const statusIcon = migration.status === 'success' ? '✅' : migration.status === 'partial' ? '⚠️' : '❌';
      console.log(`${index + 1}. ${statusIcon} ${migration.originalEngKey} → ${migration.newBkgKey || 'N/A'} (${migration.status})`);
      if (migration.issue) {
        console.log(`    Issue: ${migration.issue}`);
      }
      if (migration.error) {
        console.log(`    Error: ${migration.error}`);
      }
    });

    console.log('\n🎉 Migration process completed!');
    console.log('\n💡 Next steps:');
    console.log('   1. Review the migrated BKG tickets');
    console.log('   2. Close/delete the original ENG tickets if satisfied with migration');
    console.log('   3. Run this script again for the remaining tickets');

  } catch (error) {
    console.error('❌ Error during migration process:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to create tickets in BKG project');
    }
  }
}

migrateEngToBkgByCreatingDuplicates();

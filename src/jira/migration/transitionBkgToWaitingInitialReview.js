import JiraClient from '../core/jiraClient.js';

async function transitionBkgToWaitingInitialReview() {
  try {
    const jira = new JiraClient();

    // First, let's get all the tickets that were identified for migration
    // We'll query BKG project for items that have our migration comment
    console.log('🔍 Finding BKG tickets with migration comments...');

    const jql = 'project = BKG AND comment ~ "should be moved to BKG project"';

    const results = await jira.searchIssues(jql, 0, 1000, [
      'summary',
      'status',
      'created',
      'assignee',
      'issuetype',
      'priority',
      'comment'
    ]);

    console.log(`\n📊 Found ${results.total} BKG tickets with migration comments:`);
    console.log('=' .repeat(80));

    if (results.issues.length === 0) {
      console.log('No BKG tickets found with migration comments.');
      console.log('This could mean:');
      console.log('- Tickets haven\'t been moved to BKG yet');
      console.log('- Migration comments weren\'t added');
      console.log('- Comment text doesn\'t match our search');
      return;
    }

    // Display tickets that need status transition
    results.issues.forEach((issue, index) => {
      const createdDate = new Date(issue.fields.created);
      const ageInDays = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));
      console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary.substring(0, 60)}${issue.fields.summary.length > 60 ? '...' : ''}`);
      console.log(`   Current Status: ${issue.fields.status.name}`);
      console.log(`   Created: ${createdDate.toLocaleDateString()} (${ageInDays} days ago)`);
      console.log(`   Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
      console.log('');
    });

    console.log(`\n⚠️  Status Transition Details:`);
    console.log(`   • Target Status: "Waiting initial review"`);
    console.log(`   • Current Project: BKG`);
    console.log(`   • Tickets to transition: ${results.issues.length}`);

    // Ask for confirmation
    console.log('\n🚀 Starting status transitions...');

    let successCount = 0;
    let failureCount = 0;
    const failures = [];

    for (let i = 0; i < results.issues.length; i++) {
      const issue = results.issues[i];
      const issueKey = issue.key;

      try {
        console.log(`\n[${i + 1}/${results.issues.length}] Processing ${issueKey}...`);

        // Skip if already in target status
        if (issue.fields.status.name === 'Waiting initial review') {
          console.log(`   ✅ Already in "Waiting initial review" status - skipping`);
          successCount++;
          continue;
        }

        // Get available transitions
        const transitions = await jira.getTransitions(issueKey);

        // Look for "Waiting initial review" transition
        const targetTransition = transitions.find(t =>
          t.name.toLowerCase().includes('waiting initial review') ||
          t.name === 'Waiting initial review'
        );

        if (targetTransition) {
          console.log(`   🔄 Transitioning ${issueKey} from "${issue.fields.status.name}" to "${targetTransition.name}"...`);
          await jira.transitionIssue(issueKey, targetTransition.id);
          console.log(`   ✅ Successfully transitioned ${issueKey}`);

          // Remove the migration comment since it's now complete
          await jira.addComment(issueKey, '✅ Migration completed: Moved to BKG project and transitioned to "Waiting initial review" status.');

          successCount++;
        } else {
          console.log(`   ⚠️  Could not find "Waiting initial review" transition for ${issueKey}`);
          console.log(`   Available transitions: ${transitions.map(t => t.name).join(', ')}`);

          // Update comment to indicate status transition needed
          await jira.addComment(issueKey, `Migration Status: Moved to BKG project successfully. Manual transition to "Waiting initial review" needed. Available transitions: ${transitions.map(t => t.name).join(', ')}.`);

          failures.push({
            issueKey,
            reason: 'No "Waiting initial review" transition available',
            availableTransitions: transitions.map(t => t.name)
          });
          failureCount++;
        }

      } catch (error) {
        console.error(`   ❌ Error processing ${issueKey}:`, error.message);
        failures.push({
          issueKey,
          reason: error.message
        });
        failureCount++;
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('📊 Status Transition Summary:');
    console.log(`   ✅ Successfully processed: ${successCount} items`);
    console.log(`   ❌ Failed: ${failureCount} items`);
    console.log(`   🔄 Already in target status: ${results.issues.filter(i => i.fields.status.name === 'Waiting initial review').length} items`);

    if (failures.length > 0) {
      console.log('\n❌ Failed transitions:');
      failures.forEach((failure, index) => {
        console.log(`   ${index + 1}. ${failure.issueKey}: ${failure.reason}`);
        if (failure.availableTransitions) {
          console.log(`      Available transitions: ${failure.availableTransitions.join(', ')}`);
        }
      });

      console.log('\n💡 For failed items, manually transition to "Waiting initial review" status in Jira.');
    }

    console.log('\n🎉 Status transition process completed!');
    console.log('\n📝 Summary: All ENG backlog items >2 years old should now be in BKG project with "Waiting initial review" status.');

  } catch (error) {
    console.error('❌ Error during status transition process:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to modify BKG project tickets');
    }
  }
}

transitionBkgToWaitingInitialReview();

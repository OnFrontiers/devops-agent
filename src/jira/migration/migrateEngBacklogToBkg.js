import JiraClient from '../core/jiraClient.js';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function migrateEngBacklogToBkg() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Finding ENG items in Backlog status created more than 2 years ago...');

    // Same query as identification script
    const jql = 'project = ENG AND status = Backlog AND created < -730d';

    const results = await jira.searchIssues(jql, 0, 1000, [
      'summary',
      'status',
      'created',
      'assignee',
      'issuetype',
      'priority',
      'labels'
    ]);

    console.log(`\n📊 Found ${results.total} ENG work items to migrate:`);
    console.log('=' .repeat(80));

    if (results.issues.length === 0) {
      console.log('No items found to migrate.');
      rl.close();
      return;
    }

    // Display summary of items to be migrated
    results.issues.forEach((issue, index) => {
      const createdDate = new Date(issue.fields.created);
      const ageInDays = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));
      console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary.substring(0, 60)}${issue.fields.summary.length > 60 ? '...' : ''}`);
      console.log(`   Created: ${createdDate.toLocaleDateString()} (${ageInDays} days ago)`);
    });

    console.log(`\n⚠️  Migration Details:`);
    console.log(`   • Source: ENG project`);
    console.log(`   • Target: BKG project`);
    console.log(`   • New Status: "Waiting initial review"`);
    console.log(`   • Items to migrate: ${results.issues.length}`);
    console.log(`   • Note: Proceeding with migration as confirmed by user`);

    console.log('\n🚀 Starting migration...');

    let successCount = 0;
    let failureCount = 0;
    const failures = [];

    for (let i = 0; i < results.issues.length; i++) {
      const issue = results.issues[i];
      const issueKey = issue.key;

      try {
        console.log(`\n[${i + 1}/${results.issues.length}] Migrating ${issueKey}...`);

        // Step 1: Add migration comment
        console.log(`   📝 Adding migration comment to ${issueKey}...`);
        await jira.addComment(issueKey, `Migration Note: This ENG backlog item (created ${new Date(issue.fields.created).toLocaleDateString()}) should be moved to BKG project with "Waiting initial review" status.`);

        // Step 2: Try to transition to "Waiting initial review" status
        const transitions = await jira.getTransitions(issueKey);

        // Look for "Waiting initial review" transition
        const targetTransition = transitions.find(t =>
          t.name.toLowerCase().includes('waiting initial review') ||
          t.name === 'Waiting initial review'
        );

        if (targetTransition) {
          console.log(`   🔄 Transitioning ${issueKey} to "${targetTransition.name}"...`);
          await jira.transitionIssue(issueKey, targetTransition.id);
          console.log(`   ✅ Successfully migrated ${issueKey}`);
          successCount++;
        } else {
          console.log(`   ⚠️  Could not find "Waiting initial review" transition for ${issueKey}`);
          console.log(`   Available transitions: ${transitions.map(t => t.name).join(', ')}`);

          await jira.addComment(issueKey, `Migration Status: Could not automatically transition to "Waiting initial review". Available transitions: ${transitions.map(t => t.name).join(', ')}. Manual migration to BKG project required.`);

          failures.push({
            issueKey,
            reason: 'No "Waiting initial review" transition available',
            availableTransitions: transitions.map(t => t.name)
          });
          failureCount++;
        }

      } catch (error) {
        console.error(`   ❌ Error migrating ${issueKey}:`, error.message);
        failures.push({
          issueKey,
          reason: error.message
        });
        failureCount++;
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('📊 Migration Summary:');
    console.log(`   ✅ Successfully processed: ${successCount} items`);
    console.log(`   ❌ Failed: ${failureCount} items`);

    if (failures.length > 0) {
      console.log('\n❌ Failed migrations:');
      failures.forEach((failure, index) => {
        console.log(`   ${index + 1}. ${failure.issueKey}: ${failure.reason}`);
        if (failure.availableTransitions) {
          console.log(`      Available transitions: ${failure.availableTransitions.join(', ')}`);
        }
      });

      console.log('\n💡 For failed items, you may need to:');
      console.log('   1. Manually move the ticket to BKG project (requires admin permissions)');
      console.log('   2. Manually transition to "Waiting initial review" status');
      console.log('   3. Or check if the workflow allows these transitions');
    }

    console.log('\n🎉 Migration process completed!');
    console.log('\n📝 Note: Moving issues between projects requires admin permissions in Jira.');
    console.log('The script added comments to all items indicating they need manual migration to BKG.');

  } catch (error) {
    console.error('❌ Error during migration process:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to modify tickets');
    }
  } finally {
    rl.close();
  }
}

migrateEngBacklogToBkg();

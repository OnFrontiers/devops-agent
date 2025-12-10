import JiraClient from '../core/jiraClient.js';

async function migrateSingleEngToBkg() {
  const engKey = process.env.ENG_KEY || 'ENG-1920';
  const bkgProjectKey = 'BKG';
  const bkgIssueTypeId = '10194'; // "Feature Ideas" (confirmed from BKG-7)
  const targetStatusName = 'Waiting initial review';

  const jira = new JiraClient();

  console.log(`🚚 Attempting to migrate ${engKey} to ${bkgProjectKey} without duplication...`);

  // 1) Try a true API move first (very likely to be rejected by Jira)
  try {
    console.log('🔄 Trying true API move (edit issue project/issuetype)...');
    const movePayload = {
      fields: {
        project: { key: bkgProjectKey },
        issuetype: { id: bkgIssueTypeId }
      }
    };
    await jira.updateIssue(engKey, movePayload);
    console.log(`✅ True API move succeeded for ${engKey} → project ${bkgProjectKey}`);

    // Transition to target status in BKG
    const transitions = await jira.getTransitions(engKey);
    const targetTransition = transitions.find(t =>
      t.name.toLowerCase().includes(targetStatusName.toLowerCase())
    );
    if (targetTransition) {
      await jira.transitionIssue(engKey, targetTransition.id);
      console.log(`✅ Transitioned ${engKey} to "${targetStatusName}"`);
    } else {
      console.log(`⚠️ Could not find transition "${targetStatusName}" for ${engKey}. Available: ${transitions.map(t => t.name).join(', ')}`);
    }

    console.log('🎉 Migration complete via true move (no duplication).');
    return;
  } catch (e) {
    console.log('❌ True move rejected by Jira (expected for Product Discovery target).');
    if (e?.response?.data) {
      console.log('   Details:', JSON.stringify(e.response.data));
    }
  }

  // 2) Fallback: Ensure BKG counterpart exists, then delete original ENG so no duplicates remain
  try {
    console.log('🔎 Checking for an existing BKG counterpart created earlier...');
    const findJql = `project = ${bkgProjectKey} AND labels = "original-${engKey}"`;
    const existing = await jira.searchIssues(findJql, 0, 2, ['summary', 'status', 'labels']);
    let bkgKey = null;

    if (existing.issues?.length > 0) {
      bkgKey = existing.issues[0].key;
      console.log(`✅ Found existing BKG counterpart: ${bkgKey}`);
    } else {
      console.log('➕ No existing counterpart found. Creating a new BKG idea from ENG...');
      // Read original ENG fields
      const engIssue = await jira.getIssue(engKey);

      // Build safe description (avoid copying problematic ADF payloads)
      const safeDescription = {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: `Migrated from ${engKey} (created ${new Date(engIssue.fields.created).toLocaleDateString()}).` }
            ]
          }
        ]
      };

      const createPayload = {
        fields: {
          project: { key: bkgProjectKey },
          summary: engIssue.fields.summary,
          description: safeDescription,
          issuetype: { id: bkgIssueTypeId },
          assignee: engIssue.fields.assignee ? { accountId: engIssue.fields.assignee.accountId } : undefined,
          priority: engIssue.fields.priority ? { name: engIssue.fields.priority.name } : undefined,
          labels: [...(engIssue.fields.labels || []), 'migrated-from-eng', `original-${engKey}`]
        }
      };

      const created = await jira.client.post('/issue', createPayload);
      bkgKey = created.data.key;
      console.log(`✅ Created ${bkgKey} in ${bkgProjectKey}`);

      // Transition to target status
      const transitions = await jira.getTransitions(bkgKey);
      const targetTransition = transitions.find(t =>
        t.name.toLowerCase().includes(targetStatusName.toLowerCase())
      );
      if (targetTransition) {
        await jira.transitionIssue(bkgKey, targetTransition.id);
        console.log(`✅ Transitioned ${bkgKey} to "${targetStatusName}"`);
      } else {
        console.log(`⚠️ Could not find transition "${targetStatusName}" for ${bkgKey}. Available: ${transitions.map(t => t.name).join(', ')}`);
      }

      // Add traceability comments
      await jira.addComment(bkgKey, `✅ Migration completed: Created from ${engKey} and transitioned to "${targetStatusName}".`);
    }

    // Add comment to ENG issue and delete it to avoid duplication
    try {
      await jira.addComment(engKey, `✅ Migrated to ${bkgKey} in ${bkgProjectKey} with status "${targetStatusName}". Deleting original ENG issue to avoid duplication.`);
    } catch (_) {}
    try {
      await jira.deleteIssue(engKey);
      console.log(`🗑️  Deleted original ENG issue ${engKey}.`);
      console.log(`🎉 Migration complete via create-and-delete. Single ticket remains: ${bkgKey} in ${bkgProjectKey}.`);
    } catch (delErr) {
      console.log(`❌ Could not delete ${engKey}. It still exists alongside ${bkgKey}.`);
      if (delErr?.response?.data) {
        console.log('   Delete error details:', JSON.stringify(delErr.response.data));
      }
      console.log('👉 Manual deletion in Jira UI may be required due to permissions.');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (error?.response?.data) {
      console.error('   Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

migrateSingleEngToBkg();

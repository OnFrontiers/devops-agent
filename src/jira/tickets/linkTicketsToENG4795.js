import JiraClient from '../core/jiraClient.js';

async function linkTicketsToENG4795() {
  try {
    const jira = new JiraClient();

    console.log('🔗 Creating issue links between ENG-4795 and related tickets...\n');

    // Create link from ENG-4795 to ENG-1846 (relates to)
    console.log('📝 Linking ENG-4795 → ENG-1846...');
    try {
      await jira.client.post('/issueLink', {
        type: { name: 'Relates' },
        inwardIssue: { key: 'ENG-4795' },
        outwardIssue: { key: 'ENG-1846' },
        comment: {
          body: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "ENG-4795 implements the full pricing model which includes seat license purchases and management (covered in sections 1.5 & 1.6)" }
                ]
              }
            ]
          }
        }
      });
      console.log('✅ Link created: ENG-4795 relates to ENG-1846');
    } catch (error) {
      console.log('⚠️  Link may already exist: ' + error.response?.data?.errorMessages?.[0]);
    }

    // Create link from ENG-4795 to ENG-4749 (relates to)
    console.log('\n📝 Linking ENG-4795 → ENG-4749...');
    try {
      await jira.client.post('/issueLink', {
        type: { name: 'Relates' },
        inwardIssue: { key: 'ENG-4795' },
        outwardIssue: { key: 'ENG-4749' },
        comment: {
          body: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "ENG-4795 implements the full pricing model which includes USD pricing (covered in sections 1.1 & 1.3)" }
                ]
              }
            ]
          }
        }
      });
      console.log('✅ Link created: ENG-4795 relates to ENG-4749');
    } catch (error) {
      console.log('⚠️  Link may already exist: ' + error.response?.data?.errorMessages?.[0]);
    }

    // Add a comment to ENG-4795 about the related tickets
    console.log('\n💬 Adding note to ENG-4795 description...');

    const ticket4795 = await jira.getIssue('ENG-4795');
    const currentContent = ticket4795.fields.description.content;

    // Add a "Related Tickets" section at the end
    const updatedContent = [
      ...currentContent,
      {
        type: "paragraph",
        content: [{ type: "text", text: "" }]
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Related Tickets" }]
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "The following existing tickets are related to this implementation:" }]
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "ENG-1846: Establish online seat license purchases and seat management",
                    marks: [{ type: "strong" }]
                  },
                  { type: "text", text: " - Covered by sections 1.5 (Subscription Tab) and 1.6 (Seat Management)" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "ENG-4749: Enable USD Pricing Model",
                    marks: [{ type: "strong" }]
                  },
                  { type: "text", text: " - Covered by sections 1.1 (Create SMB Plan) and 1.3 (Display USD)" }
                ]
              }
            ]
          }
        ]
      }
    ];

    await jira.updateIssue('ENG-4795', {
      fields: {
        description: {
          type: "doc",
          version: 1,
          content: updatedContent
        }
      }
    });
    console.log('✅ Related tickets section added to ENG-4795 description');

    // Verify the changes
    console.log('\n' + '='.repeat(60));
    console.log('VERIFICATION:');
    console.log('='.repeat(60));

    const ticket1846 = await jira.getIssue('ENG-1846');
    const ticket4749 = await jira.getIssue('ENG-4749');

    console.log('\n✅ ENG-1846: ' + ticket1846.fields.summary);
    console.log('   Parent: ' + (ticket1846.fields.parent?.key || 'None'));
    console.log('   Issue Links: ' + (ticket1846.fields.issuelinks?.length || 0) + ' links');
    console.log('   URL: ' + process.env.JIRA_BASE_URL + '/browse/ENG-1846');

    console.log('\n✅ ENG-4749: ' + ticket4749.fields.summary);
    console.log('   Parent: ' + (ticket4749.fields.parent?.key || 'None'));
    console.log('   Issue Links: ' + (ticket4749.fields.issuelinks?.length || 0) + ' links');
    console.log('   URL: ' + process.env.JIRA_BASE_URL + '/browse/ENG-4749');

    console.log('\n' + '='.repeat(60));
    console.log('UPDATED STRUCTURE:');
    console.log('='.repeat(60));

    console.log('\nENG-4784 (Implement New SMB Plan)');
    console.log('├── ENG-4795 (Implement New Pricing Model) - 34 points');
    console.log('│   └── Related: ENG-1846, ENG-4749');
    console.log('├── ENG-4796 (Continuous Charging) - 55 points');
    console.log('├── ENG-4797 (Expedited Onboarding) - 34 points');
    console.log('├── ENG-1846 (Seat license purchases) - Related to 4795');
    console.log('└── ENG-4749 (USD Pricing) - Related to 4795');

    console.log('\n✅ Issue links created and documentation updated!');
    console.log('\n📝 Note: ENG-1846 and ENG-4749 remain children of ENG-4784 but are');
    console.log('   now linked to ENG-4795 which implements their functionality.');

  } catch (error) {
    console.error('❌ Error linking tickets:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
linkTicketsToENG4795();

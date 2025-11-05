import JiraClient from '/Users/borgesenioc/Projects/onfrontiers/devops-agent/src/jira/core/jiraClient.js';

async function run() {
  const issueKey = 'ENG-4762';
  const githubIssueUrl = 'https://github.com/OnFrontiers/operations-hub/issues/146';

  try {
    const jira = new JiraClient();

    // Fetch current description doc (Atlassian Document Format)
    const getResp = await jira.client.get(`/issue/${issueKey}`);
    const currentDesc = getResp.data?.fields?.description;
    const currentContent = Array.isArray(currentDesc?.content) ? currentDesc.content : [];

    // Build EXACT section requested:
    // - Paragraph with bold "Connections to Github"
    // - "Github Projects" + empty bullet
    // - "Github Issues" + bullet with hyperlink to GitHub issue URL
    const connectionsSection = [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Connections to Github',
            marks: [{ type: 'strong' }]
          }
        ]
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Github Projects'
          }
        ]
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    // Empty bullet point (single space)
                    type: 'text',
                    text: ' '
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Github Issues'
          }
        ]
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: githubIssueUrl,
                    marks: [
                      {
                        type: 'link',
                        attrs: { href: githubIssueUrl }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    const updatedDoc = {
      type: 'doc',
      version: 1,
      content: currentContent.concat(connectionsSection)
    };

    // Update Jira description
    await jira.client.put(`/issue/${issueKey}`, {
      fields: {
        description: updatedDoc
      }
    });

    console.log(`✅ Updated ${issueKey} with Connections section`);
  } catch (err) {
    const msg = err?.response?.data ? JSON.stringify(err.response.data, null, 2) : (err?.message || String(err));
    console.error(`❌ Failed to update ${issueKey}:`, msg);
    process.exit(1);
  }
}

run();

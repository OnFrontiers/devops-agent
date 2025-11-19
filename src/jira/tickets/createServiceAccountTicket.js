import JiraClient from '../core/jiraClient.js';
import pickComponents from '../core/prompts/componentsPrompt.js';

async function createServiceAccountTicket() {
  try {
    const jira = new JiraClient();
    console.log('🎯 Creating Operations Hub ticket for Dedicated Service Account...');

    // Create the ticket
    // Confirm components to add on creation (interactive or via flags/env)
    const projectKey = process.env.JIRA_PROJECT_KEY || 'ENG';
    const components = await pickComponents(projectKey);

    const ticketData = {
      summary: "Create Dedicated Service Account for Background Checks",
      issueType: "Story",
      additionalLabels: ["cost-reduction"],
      priority: { name: "2 - Medium" },
      components,
      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Background",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Why This Is Better"
              }
            ]
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
                        text: "Resilience: No dependency on personal account passwords/2FA changes"
                      }
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
                        text: "Security: Principle of least privilege - service account only has needed permissions"
                      }
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
                        text: "Auditability: Clear separation between user actions and automated actions"
                      }
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
                        text: "Maintenance: Password rotation doesn't break production services"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Implementation Plan",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Phase 1: Create Dedicated Service Account",
                marks: [{ type: "strong" }]
              }
            ]
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
                        text: "Create new user in your system"
                      }
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
                        text: "Email: opshub-service@onfrontiers.com (or similar)"
                      }
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
                        text: "Set strong, dedicated password (stored only in AWS Parameter Store)"
                      }
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
                        text: "Grant minimum required permissions:"
                      }
                    ]
                  }
                ]
              }
            ]
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
                        text: "Read all user profiles (name, email, phone, city, country, summary)"
                      }
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
                        text: "Update background_check field on user profiles"
                      }
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
                        text: "Create authentication tokens"
                      }
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
                        text: "Configure 2FA bypass for service account"
                      }
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
                        text: "Ensure the external auth secret works for this account"
                      }
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
                        text: "Test authentication flow without human intervention"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Phase 2: Update AWS Parameter Store",
                marks: [{ type: "strong" }]
              }
            ]
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
                        text: "Update /operations-hub/opshub/graphql/email to new service account email"
                      }
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
                        text: "Update /operations-hub/opshub/graphql/password to new service account password"
                      }
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
                        text: "Verify /operations-hub/opshub/graphql/external_auth_secret still works"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Phase 3: Update GitHub Secrets (for CI/CD)",
                marks: [{ type: "strong" }]
              }
            ]
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
                        text: "Update OPSHUB_GRAPHQL_EMAIL in repository secrets"
                      }
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
                        text: "Update OPSHUB_GRAPHQL_PASSWORD in repository secrets"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Phase 4: Test & Deploy",
                marks: [{ type: "strong" }]
              }
            ]
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
                        text: "Test locally with new credentials"
                      }
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
                        text: "Deploy to staging/production"
                      }
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
                        text: "Verify background checks work from both locations"
                      }
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
                        text: "Monitor logs for authentication errors"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Phase 5: Documentation",
                marks: [{ type: "strong" }]
              }
            ]
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
                        text: "Document service account purpose and permissions"
                      }
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
                        text: "Add password rotation procedure to runbook"
                      }
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
                        text: "Create alerts for authentication failures"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Alternative: API Key Authentication (Future Enhancement)",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Instead of email/password, consider implementing:"
              }
            ]
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
                        text: "Service account API keys (non-expiring tokens)"
                      }
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
                        text: "Stored in AWS Secrets Manager with automatic rotation"
                      }
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
                        text: "No 2FA bypass needed"
                      }
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
                        text: "Easier to revoke and rotate"
                      }
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
                        text: "This would require changes to your GraphQL authentication system but provides better security and maintenance"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Acceptance Criteria",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "orderedList",
            attrs: { order: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Dedicated service account opshub-service@onfrontiers.com created with proper permissions"
                      }
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
                        text: "AWS Parameter Store updated with new credentials"
                      }
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
                        text: "GitHub repository secrets updated for CI/CD"
                      }
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
                        text: "Background checks functionality tested and working in staging/production"
                      }
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
                        text: "Documentation and runbook procedures updated"
                      }
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
                        text: "Monitoring and alerting configured for authentication failures"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Technical Design",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Current State:"
              }
            ]
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
                        text: "Background checks use personal account credentials"
                      }
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
                        text: "Dependency on 2FA and password changes"
                      }
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
                        text: "No clear separation between automated and user actions"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Proposed Solution:"
              }
            ]
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
                        text: "Create dedicated service account with minimal required permissions"
                      }
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
                        text: "Store credentials securely in AWS Parameter Store and GitHub Secrets"
                      }
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
                        text: "Implement proper authentication bypass for automated processes"
                      }
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
                        text: "Set up monitoring and documentation procedures"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    console.log('\n📋 Creating ticket with these settings:');
    console.log(`   Summary: ${ticketData.summary}`);
    console.log(`   Type: ${ticketData.issueType}`);
    console.log(`   Labels: operations-hub, ${ticketData.additionalLabels.join(', ')}`);
    console.log(`   Priority: ${ticketData.priority.name}`);
    console.log(`   Assignee: Unassigned (Operations Hub default)`);
    console.log(`   Components: ${components && components.length ? components.map(c => c.id).join(', ') : 'None'}`);
    console.log(`   Parent Epic: ENG-4769`);

    const ticketResult = await jira.createOperationsHubTicket(ticketData);

    console.log('\n✅ Ticket created successfully!');
    console.log(`🎫 Ticket Key: ${ticketResult.key}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketResult.key}`);

    // Link to parent epic ENG-4769
    console.log('\n🔗 Linking to parent epic ENG-4769...');
    const epicLinkData = {
      fields: {
        parent: {
          key: "ENG-4769"
        }
      }
    };

    await jira.updateIssue(ticketResult.key, epicLinkData);
    console.log('✅ Successfully linked to epic ENG-4769');

    // Set to Definition stage
    console.log('\n📊 Setting ticket status to Definition...');
    const transitions = await jira.getTransitions(ticketResult.key);

    const definitionTransition = transitions.find(t =>
      t.name.toLowerCase().includes('definition') ||
      t.name.toLowerCase().includes('backlog') ||
      t.name.toLowerCase().includes('open')
    );

    if (definitionTransition) {
      await jira.transitionIssue(ticketResult.key, definitionTransition.id);
      console.log(`✅ Transitioned to: ${definitionTransition.name}`);
    } else {
      console.log(`ℹ️ Definition transition not found. Available transitions: ${transitions.map(t => t.name).join(', ')}`);
      console.log('Ticket remains in current status - manually set to Definition if needed');
    }

    console.log('\n🎯 Service Account ticket created successfully!');
    console.log(`📁 ${ticketResult.key}: "${ticketData.summary}"`);
    console.log('\n📋 Ticket Details:');
    console.log('   • Project Space: Operations Hub');
    console.log('   • Type: Story');
    console.log('   • Priority: Medium (2 - Medium)');
    console.log('   • Labels: operations-hub, cost-reduction');
    console.log('   • Parent Epic: ENG-4769');
    console.log('   • Status: Definition');
    console.log('   • Assignee: Unassigned');

  } catch (error) {
    console.error('❌ Error creating Service Account ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

createServiceAccountTicket();

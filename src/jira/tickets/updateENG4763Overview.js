import JiraClient from '../core/jiraClient.js';

async function updateENG4763Overview() {
  try {
    const jira = new JiraClient();
    console.log('Adding high-level overview to ENG-4763 Epic...');

    // Clean, high-level description for the expert recruiting epic
    const cleanDescription = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Purpose",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Migrate the Expert Recruiting system from external tools into the unified Operations Hub platform, bringing campaign definition, batch triggering, and integration with contact enrichment and auto-reply systems under a single interface."
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Timeline",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Start: 2025-11-05 (Wednesday), Due: 2025-11-19 (2 weeks later)"
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Child Implementation Tasks",
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
                      text: "ENG-4764: Create a Dashboard for campaign definition - Campaign configuration and management interface"
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
                      text: "ENG-4765: Triggering new batches - Automated batch creation and execution system"
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
                      text: "ENG-4766: Integration with the Contact Enricher - Connect expert recruiting with contact data enrichment"
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
                      text: "ENG-4767: Integration with the Auto-Replier - Connect expert recruiting with automated response system"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Overall Success Criteria",
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
                      text: "Expert recruiting campaign definition fully integrated into Operations Hub dashboard"
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
                      text: "Batch triggering system automated and responsive to campaign definitions"
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
                      text: "Contact Enricher integration provides enriched data for recruitment campaigns"
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
                      text: "Auto-Replier integration handles automated responses for recruitment outreach"
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
                      text: "All expert recruiting functionality accessible through unified Operations Hub interface"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const updateData = {
      fields: {
        description: cleanDescription
      }
    };

    await jira.updateIssue('ENG-4763', updateData);

    console.log('ENG-4763 overview updated successfully!');
    console.log('URL: https://onfrontiers.atlassian.net/browse/ENG-4763');
    console.log('\nEpic now contains:');
    console.log('   • High-level purpose statement');
    console.log('   • Timeline information');
    console.log('   • List of child implementation tasks');
    console.log('   • Overall success criteria');

  } catch (error) {
    console.error('Error updating ENG-4763 Overview:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4763Overview();

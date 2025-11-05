import JiraClient from '../core/jiraClient.js';

async function updateENG4762ChartsSpec() {
  try {
    const jira = new JiraClient();
    console.log('Updating ENG-4762 spec for ER Funnel candidate charts...');

    // New concise specification focused on ER funnel requirements
    const newDescription = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Current Implementation Status",
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
                      text: "ER Funnel search + select + inline detail: ✅ Complete"
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
                      text: "GenericTable custom body rendering: ✅ Available"
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
                      text: "Candidate data pipeline: ✅ Available (counts by match_state/stage)"
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
              text: "New Specification: ER Candidate Analytics Charts",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Display expert_request_candidate funnel metrics in two charts below ER detail panel in ER Funnel view (/expert-requests/dashboards/er-funnel)."
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
              text: "Layout: Side-by-side charts (50/50 screen split)",
              marks: [{ type: "underline" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "" }]
        },
        {
          type: "heading",
          attrs: { level: 4 },
          content: [
            {
              type: "text",
              text: "📊 LEFT CHART: Marketplace Recruiting"
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
                      text: "Data: Candidates where classification = marketplace (add_method='in_network' or 'suggested' - TBD)"
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
                      text: "Chart Type: [TBD - bar/line showing recruitment funnel progression]"
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
                      text: "Metrics: Suggested → Contacted → Matched → Verified → Vetting → Interested"
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
          type: "heading",
          attrs: { level: 4 },
          content: [
            {
              type: "text",
              text: "📈 RIGHT CHART: Off-Marketplace Recruiting"
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
                      text: "Data: All other candidates (not marketplace-sourced)"
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
                      text: "Chart Type: [Same as left chart for consistency]"
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
                      text: "Metrics: Same funnel stages as marketplace chart"
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
              text: "Technical Requirements",
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
                      text: "Charts render below ER inline detail in GenericTable.customBody (reuse existing ERInlineDetail pattern)"
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
                      text: "Data sourced from cached_expert_request_candidates_raw by selected ER ID"
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
                      text: "Charts update automatically when ER selection changes"
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
                      text: "Chart library integration using existing OpsHub chart patterns (reusable across other views)"
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
                      text: "Error handling for cases with no candidate data"
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
              text: "Open Questions",
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
                      text: "What chart type will be best for showing recruitment funnel progression?"
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
                      text: "How to classify marketplace vs off-marketplace (need add_method field or alternative logic)?"
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
                      text: "Should charts show counts or percentages, or both?"
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
        summary: "Add ER Candidate Analytics Charts to Funnel View",
        description: newDescription
      }
    };

    await jira.updateIssue('ENG-4762', updateData);

    console.log('✅ ENG-4762 specification updated successfully');
    console.log('   • Summary: "Add ER Candidate Analytics Charts to Funnel View"');
    console.log('   • Focus: ER funnel marketplace vs off-marketplace recruiting charts');
    console.log('   • Location: Below ER detail in GenericTable.customBody');
    console.log('   • Data: expert_request_candidates by selected ER ID');
    console.log('   • Layout: Side-by-side charts (50/50 split)');

    console.log('\n📋 Next steps after spec approval:');
    console.log('   1. Decide on chart type (bar/line/funnel visualization)');
    console.log('   2. Determine marketplace classification logic');
    console.log('   3. Create chart components and integrate into ER funnel');
    console.log('   4. Add chart library to OpsHub dependencies');

  } catch (error) {
    console.error('❌ Error updating ENG-4762:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
    process.exit(1);
  }
}

// Run the function
updateENG4762ChartsSpec();

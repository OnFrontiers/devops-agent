import JiraClient from '../core/jiraClient.js';

async function updateENG4757References() {
  try {
    const jira = new JiraClient();
    console.log('Updating ENG-4757 child ticket references...');

    // Update epic to reflect correct child ticket breakdown
    const updatedDescription = {
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
              text: "Migrate the Expert Request (ER) funnel functionality into the Operations Hub application, bringing all ER-related data visualization and analysis capabilities under a unified interface."
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
                      text: "ENG-4760: Implement ER Funnel Search and Filtering - Search by expert_request.id with select+display pattern"
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
                      text: "ENG-4761: Implement 2-way syncs with HubSpot - Sync expert application data to ER funnel charts"
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
                      text: "ENG-4762: Modify Table View Component to Accept Charts - Enable chart integration with existing table infrastructure"
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
                      text: "ER funnel data from HubSpot and system sources fully integrated into Operations Hub table/chart views"
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
                      text: "Search and filtering capabilities match or exceed current standalone ER funnel"
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
                      text: "Real-time data synchronization between HubSpot and Operations Hub ER funnel visualizations"
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
                      text: "Modular components allow ER funnel functionality to be reused in other areas"
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
        description: updatedDescription
      }
    };

    await jira.updateIssue('ENG-4757', updateData);

    console.log('ENG-4757 child references updated successfully!');
    console.log('URL: https://onfrontiers.atlassian.net/browse/ENG-4757');
    console.log('\nUpdated child task breakdown:');
    console.log('   • ENG-4760: ER Funnel Search and Filtering');
    console.log('   • ENG-4761: 2-way HubSpot synchronization');
    console.log('   • ENG-4762: Table View Chart integration');

  } catch (error) {
    console.error('Error updating ENG-4757:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4757References();

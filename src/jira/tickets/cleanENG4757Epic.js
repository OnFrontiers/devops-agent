import JiraClient from '../core/jiraClient.js';

async function cleanENG4757Epic() {
  try {
    const jira = new JiraClient();
    console.log('Cleaning ENG-4757 Epic to high-level overview...');

    // Clean, high-level description for the epic
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
                      text: "ENG-4761: Modify Table View Component to Accept Charts - Enable chart integration with existing table infrastructure"
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
                      text: "ER funnel data fully integrated into Operations Hub table/chart views"
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
        description: cleanDescription
      }
    };

    await jira.updateIssue('ENG-4757', updateData);

    console.log('ENG-4757 cleaned successfully!');
    console.log('URL: https://onfrontiers.atlassian.net/browse/ENG-4757');
    console.log('\nEpic now contains:');
    console.log('   • High-level purpose statement');
    console.log('   • List of child implementation tasks');
    console.log('   • Overall success criteria');
    console.log('\nDetailed specifications moved to child tickets.');

  } catch (error) {
    console.error('Error cleaning ENG-4757 Epic:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
cleanENG4757Epic();

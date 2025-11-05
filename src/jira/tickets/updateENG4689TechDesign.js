import JiraClient from '../core/jiraClient.js';

async function updateENG4689TechDesign() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4689';
    
    console.log(`🔄 Adding technical design to ticket ${ticketKey}...\n`);
    
    // Get the current ticket to preserve existing content
    const currentTicket = await jira.getIssue(ticketKey);
    const currentDescription = currentTicket.fields.description;
    
    // Find where Technical Design starts and replace with comprehensive design
    const newContent = [];
    let foundTechnicalDesign = false;
    
    currentDescription.content.forEach(item => {
      if (!foundTechnicalDesign) {
        newContent.push(item);
        if (item.type === 'paragraph' && item.content && item.content[0] && 
            item.content[0].text === 'Technical Design' && 
            item.content[0].marks && item.content[0].marks.some(mark => mark.type === 'strong')) {
          foundTechnicalDesign = true;
          // Add the technical design implementation
          newContent.push(
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
                          text: "Create 'Authenticate to OnFrontiers' button in operations-hub UI" 
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
                          text: "Use window.open() to launch app.onfrontiers.com/dashboard in new tab" 
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
                          text: "Poll the popup tab to check when dashboard loads completely" 
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
                          text: "Extract access_token from popup's localStorage via postMessage or direct access" 
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
                          text: "Store token in operations-hub localStorage using existing storeToken() function" 
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
                          text: "Close popup tab and update UI to show authenticated state" 
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
                  text: "Implementation Notes",
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
                          text: "Handle cross-origin restrictions with postMessage API if direct localStorage access fails" 
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
                          text: "Add timeout and error handling for authentication failures" 
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
                          text: "Integrate with existing auth.js service for token management" 
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          );
        }
      }
      // Skip any existing technical design content after the header
    });
    
    const updatedDescription = {
      type: "doc",
      version: 1,
      content: newContent
    };
    
    const updateData = {
      fields: {
        description: updatedDescription
      }
    };
    
    await jira.updateIssue(ticketKey, updateData);
    
    console.log('✅ Technical design added successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Added technical design covering:');
    console.log('   • Popup window authentication flow');
    console.log('   • Token extraction from localStorage');
    console.log('   • Cross-origin security considerations');
    console.log('   • Integration with existing auth service');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4689TechDesign();
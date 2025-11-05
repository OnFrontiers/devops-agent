import JiraClient from '../core/jiraClient.js';

async function updateGate1Ticket() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4695';
    
    console.log(`🔄 Updating ticket ${ticketKey} with Gate 1 Brief automation details...\n`);
    
    // Create the structured description with Background and Acceptance Criteria
    const description = {
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
                      text: "We have created Gate 1 (interest) briefs for OAs A8, 11, 12, and 16 by combining inputs from the Snapshot (produced by n8n automation flow), the past performance document provided by Comptech, and a prompt." 
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
                      text: "GPT-3 in agent mode generated a Gate 1 brief per opportunity and we gathered feedback from the internal users." 
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
                      text: "Now we need an automated workflow, in n8n or similar, that produces these documents automatically as they come in." 
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
                      text: "Main challenges to address:" 
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
                          content: [{ type: "text", text: "Ingesting the past performance from clients - clients are not submitting them as they create the workflow" }]
                        }
                      ]
                    },
                    {
                      type: "listItem", 
                      content: [
                        {
                          type: "paragraph",
                          content: [{ type: "text", text: "Summarizing the past performance if it does not exist yet" }]
                        }
                      ]
                    },
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph", 
                          content: [{ type: "text", text: "Calling ChatGPT in agent mode to generate the document" }]
                        }
                      ]
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
                      text: "Automatically generate a Gate 1 Brief document to the output folder moments after a new Typeform Opportunity Assessment request is submitted" 
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
              text: "Technical Design",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "TBD - Design the n8n workflow architecture and integration points" }]
        }
      ]
    };
    
    // Update the ticket summary as well to be more specific
    const updateData = {
      fields: {
        summary: "Automate Gate 1 Brief Generation from Typeform OA Submissions",
        description: description
      }
    };
    
    await jira.updateIssue(ticketKey, updateData);
    
    console.log('✅ Ticket updated successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`📝 Summary: "${updateData.fields.summary}"`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Updated with:');
    console.log('   • Background: Gate 1 brief creation history and challenges');
    console.log('   • Acceptance Criteria: Automated Gate 1 Brief generation');
    console.log('   • Technical Design: Placeholder for n8n workflow design');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateGate1Ticket();
import JiraClient from '../core/jiraClient.js';

async function updateENG4664() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4664';
    
    console.log(`🔄 Adding Profile Builder summary to ticket ${ticketKey}...\n`);
    
    // Create concise story using the template structure
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
                      text: "Operations-hub repository contains Profile Builder section that enriches expert profiles by uploading PDFs and extracting LinkedIn data" 
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
                      text: "Current system updates profiles based on PDF but lacks final polish step" 
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
                      text: "LinkedHelper desktop solution costs $50/month, delivers little value, and adds delays" 
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
                      text: "Add OpenAI integration to Profile Builder for automatic profile polishing after PDF updates" 
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
                      text: "Replace LinkedHelper dependency, saving $50/month and removing delays" 
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
          content: [
            { 
              type: "text", 
              text: "Extend existing AIPolishing component in operations-hub/src/components/ProfilePolisher/AIPolishing.jsx to call OpenAI API for automated profile enhancement across summary, experience, education, and skills sections." 
            }
          ]
        }
      ]
    };
    
    const updateData = {
      fields: {
        description: description
      }
    };
    
    await jira.updateIssue(ticketKey, updateData);
    
    console.log('✅ Profile Builder summary added successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Added concise summary:');
    console.log('   • Background: Profile Builder context and LinkedHelper issues');
    console.log('   • Acceptance Criteria: OpenAI integration and cost savings');
    console.log('   • Technical Design: Extend existing AIPolishing component');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4664();
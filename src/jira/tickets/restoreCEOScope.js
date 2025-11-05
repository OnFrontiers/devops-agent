import JiraClient from '../core/jiraClient.js';

async function restoreCEOScope() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4690';
    
    console.log(`🔄 Restoring CEO scope content above Technical Design in ticket ${ticketKey}...\n`);
    
    // Get the current ticket to preserve the Technical Design section
    const currentTicket = await jira.getIssue(ticketKey);
    const currentDescription = currentTicket.fields.description;
    
    // Find where Technical Design starts to preserve it
    const technicalDesignContent = [];
    let foundTechnicalDesign = false;
    
    currentDescription.content.forEach(item => {
      if (foundTechnicalDesign) {
        technicalDesignContent.push(item);
      } else if (item.type === 'paragraph' && item.content && item.content[0] && 
                 item.content[0].text === 'Technical Design' && 
                 item.content[0].marks && item.content[0].marks.some(mark => mark.type === 'strong')) {
        foundTechnicalDesign = true;
        technicalDesignContent.push(item);
      }
    });
    
    // Build the complete description with CEO scope above Technical Design
    const completeDescription = {
      type: "doc",
      version: 1,
      content: [
        // CEO Scope - Create Script section
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Create Script",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { 
              type: "text", 
              text: "Given a search ID provided, for each expert returned, the following:" 
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
                  content: [{ type: "text", text: "searchID" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "createdAT" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "query" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "expert url" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "expert first name" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "expert email" }]
                }
              ]
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "" }]
        },
        // CEO Scope - Generate Email section  
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Generate Email",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { 
              type: "text", 
              text: "Create GPT where enter this information and creates email to the expert with questions." 
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "" }]
        },
        // Add all the preserved Technical Design content
        ...technicalDesignContent
      ]
    };
    
    const updateData = {
      fields: {
        description: completeDescription
      }
    };
    
    await jira.updateIssue(ticketKey, updateData);
    
    console.log('✅ CEO scope content restored successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Restored sections:');
    console.log('   • Create Script (with expert data requirements)');
    console.log('   • Generate Email (GPT for expert outreach)');
    console.log('   • Technical Design (preserved existing content)');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
restoreCEOScope();
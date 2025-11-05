import JiraClient from '../core/jiraClient.js';

async function updateENG4690TechSpec() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4690';
    
    console.log(`🔄 Getting current details for ticket ${ticketKey}...\n`);
    
    // First, get the current ticket to see its structure
    const currentTicket = await jira.getIssue(ticketKey);
    console.log(`📋 Current Summary: ${currentTicket.fields.summary}`);
    console.log(`📊 Current Status: ${currentTicket.fields.status.name}`);
    
    // Get the current description content
    const currentDescription = currentTicket.fields.description;
    
    // Add the technical specification section
    const newContent = [
      ...currentDescription.content,
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
            text: "Database Monitoring & Triggers",
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
                    text: "Set up RDS replica query monitoring on the GovTrive search query table (table name TBA)" 
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
                    text: "Create database trigger or polling mechanism to detect new search record additions" 
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
            text: "Notification System",
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
                    text: "Send email notification to bcaouette@onfrontiers.com when new records are detected" 
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
                    text: "Alternative: Send Slack notification to bcaouette@onfrontiers.com" 
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
                    text: "Include all parameters requested in the original script for self-vetting process" 
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
            text: "Email Generation Component",
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
                    text: "Create custom GPT agent for email generation" 
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
                    text: "Store dedicated prompt template for generating well-formatted text emails" 
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
                    text: "Email template should be optimized for self-vetting test scenarios" 
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
            text: "Implementation Steps",
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
                content: [{ type: "text", text: "Identify and confirm GovTrive search query table name and schema" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph", 
                content: [{ type: "text", text: "Set up RDS replica monitoring/trigger system" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Implement notification service (email/Slack)" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Create and configure custom GPT for email generation" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Test end-to-end workflow with sample data" }]
              }
            ]
          }
        ]
      }
    ];
    
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
    
    console.log('✅ Technical specification added successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Added technical design sections:');
    console.log('   • Database Monitoring & Triggers (RDS replica)');
    console.log('   • Notification System (email/Slack to bcaouette@onfrontiers.com)');
    console.log('   • Email Generation Component (custom GPT)');
    console.log('   • Implementation Steps (5-step plan)');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4690TechSpec();
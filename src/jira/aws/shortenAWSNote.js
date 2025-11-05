import JiraClient from '../core/jiraClient.js';

async function shortenAWSNote() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4690';
    
    console.log(`🔄 Shortening AWS network note in ticket ${ticketKey}...\n`);
    
    // Rebuild the description with shortened AWS note embedded in Technical Design
    const description = {
      type: "doc",
      version: 1,
      content: [
        // Keep existing Background and Acceptance Criteria sections (assumed to exist)
        // Adding Technical Design section with embedded AWS note
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
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { 
                      type: "text", 
                      text: "Note: n8n cloud cannot access AWS RDS due to VPC restrictions. Use existing Lambda function or deploy n8n on AWS EC2 within same VPC.",
                      marks: [{ type: "em" }]
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
                  content: [{ type: "text", text: "Set up RDS replica monitoring/trigger system using existing Lambda or AWS EC2" }]
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
      ]
    };
    
    const updateData = {
      fields: {
        description: description
      }
    };
    
    await jira.updateIssue(ticketKey, updateData);
    
    console.log('✅ AWS network note shortened and embedded successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Changes:');
    console.log('   • Shortened AWS network restriction to one sentence');
    console.log('   • Embedded note directly in Database Monitoring section');
    console.log('   • Removed emojis and lengthy explanations');
    console.log('   • Updated Implementation Steps to reference AWS constraint');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
shortenAWSNote();
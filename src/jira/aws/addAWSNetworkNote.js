import JiraClient from '../core/jiraClient.js';

async function addAWSNetworkNote() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4690';
    
    console.log(`🔄 Adding AWS network restriction note to ticket ${ticketKey}...\n`);
    
    // Get the current ticket
    const currentTicket = await jira.getIssue(ticketKey);
    const currentDescription = currentTicket.fields.description;
    
    // Add the AWS network restriction note after the Implementation Steps
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
            text: "⚠️ AWS Network Restrictions",
            marks: [{ type: "strong" }]
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Important: n8n cloud may not work for querying AWS RDS due to network security restrictions.",
            marks: [{ type: "em" }]
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Why Lambda Works vs External Services Fail:",
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
                    text: "RDS instance is inside VPC with security group restrictions" 
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
                    text: "Lambda functions run inside the same VPC → ✅ allowed access" 
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
                    text: "External services (n8n cloud, local machines) → ❌ blocked by firewall" 
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
            text: "Alternative Solutions:",
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
                    text: "✅ Use existing Lambda function (modify for our use case)" 
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
                    text: "✅ Deploy n8n on AWS EC2 within the same VPC" 
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
                    text: "✅ Use AWS Systems Manager Session Manager (if configured)" 
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
                    text: "❌ n8n cloud service (external IP not whitelisted)" 
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
            text: "Recommended Approach:",
            marks: [{ type: "strong" }]
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          { 
            type: "text", 
            text: "Extend the existing Lambda function that successfully queries the AWS replica. This maintains security compliance while providing the monitoring functionality needed." 
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
    
    console.log('✅ AWS network restriction note added successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Added sections:');
    console.log('   • ⚠️ AWS Network Restrictions warning');
    console.log('   • Why Lambda works vs external services fail');
    console.log('   • Alternative solutions (Lambda, EC2 in VPC, etc.)');
    console.log('   • Recommended approach: extend existing Lambda');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
addAWSNetworkNote();
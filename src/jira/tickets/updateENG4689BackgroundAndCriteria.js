import JiraClient from '../core/jiraClient.js';

async function updateENG4689BackgroundAndCriteria() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4689';
    
    console.log(`🔄 Updating background and acceptance criteria for ticket ${ticketKey}...\n`);
    
    // Get the current ticket to preserve Technical Design
    const currentTicket = await jira.getIssue(ticketKey);
    const currentDescription = currentTicket.fields.description;
    
    // Find Technical Design content to preserve
    let technicalDesignContent = [];
    let foundTechnicalDesign = false;
    let captureContent = false;
    
    currentDescription.content.forEach(item => {
      if (item.type === 'paragraph' && item.content && item.content[0] && 
          item.content[0].text === 'Technical Design' && 
          item.content[0].marks && item.content[0].marks.some(mark => mark.type === 'strong')) {
        foundTechnicalDesign = true;
        captureContent = true;
      }
      if (captureContent) {
        technicalDesignContent.push(item);
      }
    });
    
    // Build new description with updated Background and Acceptance Criteria
    const newDescription = {
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
                      text: "Operations Hub is an internal tool for OnFrontiers team members to manage expert profiles, process data, and perform administrative tasks" 
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
                      text: "Currently requires manual token management - users must manually extract access tokens from browser localStorage to authenticate GraphQL queries" 
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
                      text: "This manual process creates friction and prevents seamless workflow for internal operations team" 
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
                      text: "Need automated authentication that leverages existing OnFrontiers user session without requiring separate login process" 
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
                      text: "One-click authenticate using the OnFrontiers current user credentials" 
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
        // Add preserved Technical Design content
        ...technicalDesignContent
      ]
    };
    
    const updateData = {
      fields: {
        description: newDescription
      }
    };
    
    await jira.updateIssue(ticketKey, updateData);
    
    console.log('✅ Background and acceptance criteria updated successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Updated sections:');
    console.log('   • Background: Operations Hub context and current authentication friction');
    console.log('   • Acceptance Criteria: One-click authentication using current OnFrontiers credentials');
    console.log('   • Technical Design: Preserved existing implementation details');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4689BackgroundAndCriteria();
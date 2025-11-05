import JiraClient from '../core/jiraClient.js';

async function updateENG4664TechDesign() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4664';
    
    console.log(`🔄 Updating Technical Design section for ticket ${ticketKey}...\n`);
    
    // Get the current ticket to preserve Background and Acceptance Criteria
    const currentTicket = await jira.getIssue(ticketKey);
    const currentDescription = currentTicket.fields.description;
    
    // Find where Technical Design starts and replace it with comprehensive architecture
    const newContent = [];
    let foundTechnicalDesign = false;
    
    currentDescription.content.forEach(item => {
      if (!foundTechnicalDesign) {
        newContent.push(item);
        if (item.type === 'paragraph' && item.content && item.content[0] && 
            item.content[0].text === 'Technical Design' && 
            item.content[0].marks && item.content[0].marks.some(mark => mark.type === 'strong')) {
          foundTechnicalDesign = true;
          // Add the comprehensive technical design
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
                          text: "AWS RDS replica queries to fetch profile data from OnFrontiers database" 
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
                          text: "Lambda functions for PDF processing and data extraction" 
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
                          text: "GraphQL queries to retrieve comprehensive profile data (experiences, education, skills)" 
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
                          text: "Deployment to operations.app.onfrontiers.com for internal team access" 
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
                          text: "OpenAI API integration for automated profile polishing (summary, experience, education, skills)" 
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
                          text: "GraphQL mutations to update polished profile data back to OnFrontiers platform" 
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
      // Skip original technical design content
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
    
    console.log('✅ Technical Design updated with comprehensive architecture!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Updated Technical Design covers:');
    console.log('   • AWS RDS replica queries for profile data');
    console.log('   • Lambda functions for PDF processing');
    console.log('   • GraphQL queries for comprehensive profile retrieval');
    console.log('   • Deployment to operations.app.onfrontiers.com');
    console.log('   • OpenAI API integration for profile polishing');
    console.log('   • GraphQL mutations for profile updates');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4664TechDesign();
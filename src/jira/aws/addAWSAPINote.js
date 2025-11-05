import JiraClient from '../core/jiraClient.js';

async function addAWSAPINote() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4664';
    
    console.log(`🔄 Adding AWS API note to ticket ${ticketKey}...\n`);
    
    // Get the current ticket to preserve existing content
    const currentTicket = await jira.getIssue(ticketKey);
    const currentDescription = currentTicket.fields.description;
    
    // Find the Technical Design bullet list and insert the AWS API note
    const newContent = [];
    let foundTechnicalDesign = false;
    let foundBulletList = false;
    
    currentDescription.content.forEach(item => {
      if (item.type === 'paragraph' && item.content && item.content[0] && 
          item.content[0].text === 'Technical Design' && 
          item.content[0].marks && item.content[0].marks.some(mark => mark.type === 'strong')) {
        foundTechnicalDesign = true;
        newContent.push(item);
      } else if (foundTechnicalDesign && !foundBulletList && item.type === 'bulletList') {
        foundBulletList = true;
        // Add the original bullet list items plus the new AWS API note
        const updatedBulletList = {
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
                      text: "AWS Lambda API for RDS replica queries (required due to browser CORS restrictions and VPC security requirements)" 
                    }
                  ]
                }
              ]
            },
            ...item.content
          ]
        };
        newContent.push(updatedBulletList);
      } else {
        newContent.push(item);
      }
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
    
    console.log('✅ AWS API note added successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Added note about:');
    console.log('   • AWS Lambda API requirement for RDS replica queries');
    console.log('   • Reason: Browser CORS restrictions prevent direct database access');
    console.log('   • Reason: VPC security requirements for database connectivity');
    
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
addAWSAPINote();
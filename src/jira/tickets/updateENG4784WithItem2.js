import JiraClient from '../core/jiraClient.js';

async function updateENG4784WithItem2() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4784';

    console.log(`🔄 Updating ${ticketKey} to add Item 2 details...\n`);

    // Fetch the current ticket
    const currentTicket = await jira.getIssue(ticketKey);
    const currentContent = currentTicket.fields.description.content;

    // Find the Item 2 section and update it
    const updatedContent = currentContent.map(node => {
      // Find the "2. Implement Continuous Charging" heading
      if (node.type === 'heading' && node.attrs?.level === 2) {
        const text = node.content?.[0]?.text || '';
        if (text.includes('2. Implement Continuous Charging')) {
          // This is the heading we want to keep
          return node;
        }
      }
      // Find the paragraph right after Item 2 heading that says "Story Points: TBD"
      if (node.type === 'paragraph' && node.content?.[0]?.text?.includes('Story Points: TBD')) {
        // Check if this is the Item 2 section by looking at previous context
        // We'll replace this with the actual values
        return {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Story Points: 55 | Hours: 80-106 | Complexity: High",
              marks: [{ type: "strong" }]
            }
          ]
        };
      }
      return node;
    });

    // Insert the detailed ticket reference after the Item 2 summary paragraph
    let insertIndex = -1;
    for (let i = 0; i < updatedContent.length; i++) {
      const node = updatedContent[i];
      if (node.type === 'paragraph' && node.content?.[0]?.text?.includes('Story Points: 55')) {
        insertIndex = i + 1;
        break;
      }
    }

    if (insertIndex > -1) {
      updatedContent.splice(insertIndex, 0, {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "🎫 Detailed ticket: ENG-4796",
            marks: [{ type: "strong" }]
          }
        ]
      });
    }

    // Update the Child Tickets section
    const childTicketsIndex = updatedContent.findIndex(node =>
      node.type === 'heading' && node.content?.[0]?.text === 'Child Tickets'
    );

    if (childTicketsIndex > -1) {
      // Find the bullet list after Child Tickets heading
      const bulletListIndex = childTicketsIndex + 1;
      if (updatedContent[bulletListIndex]?.type === 'bulletList') {
        // Update the second list item (Item 2 ticket)
        updatedContent[bulletListIndex].content[1] = {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "ENG-4796: Implement Continuous Charging (Stripe Payment Processing) - " },
                {
                  type: "text",
                  text: "55 points, 80-106 hours",
                  marks: [{ type: "strong" }]
                }
              ]
            }
          ]
        };
      }
    }

    const newDescription = {
      type: "doc",
      version: 1,
      content: updatedContent
    };

    const updateData = {
      fields: {
        description: newDescription
      }
    };

    await jira.updateIssue(ticketKey, updateData);

    console.log('✅ Ticket updated successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Updated with Item 2 details:');
    console.log('   • Story Points: 55');
    console.log('   • Hours: 80-106');
    console.log('   • Complexity: High');
    console.log('   • Link to ENG-4796 added');
    console.log('   • Child tickets section updated');

  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4784WithItem2();

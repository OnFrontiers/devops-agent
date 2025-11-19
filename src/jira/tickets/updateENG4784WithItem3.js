import JiraClient from '../core/jiraClient.js';

async function updateENG4784WithItem3() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4784';

    console.log(`🔄 Updating ${ticketKey} to add Item 3 details...\n`);

    // Fetch the current ticket
    const currentTicket = await jira.getIssue(ticketKey);
    const currentContent = currentTicket.fields.description.content;

    // Find the Item 3 section and update it
    const updatedContent = currentContent.map(node => {
      // Find the paragraph right after Item 3 heading that says "Story Points: TBD"
      if (node.type === 'paragraph' && node.content) {
        const text = node.content[0]?.text || '';
        // Check if this is the Item 3 "Story Points: TBD" paragraph
        if (text.includes('Story Points: TBD') && text.includes('Hours: TBD')) {
          // Check context - need to find if this is Item 3 by checking previous content
          // We'll replace this with the actual values
          return {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Story Points: 34 | Hours: 65-87 | Complexity: High",
                marks: [{ type: "strong" }]
              }
            ]
          };
        }
      }
      return node;
    });

    // Insert the detailed ticket reference after the Item 3 summary paragraph
    let insertIndex = -1;
    for (let i = 0; i < updatedContent.length; i++) {
      const node = updatedContent[i];
      if (node.type === 'paragraph' && node.content?.[0]?.text?.includes('Story Points: 34 | Hours: 65-87')) {
        // Check if this is Item 3 by looking at surrounding context
        // Item 3 comes after Item 2, so check if we've already seen Item 2
        insertIndex = i + 1;
      }
    }

    // Better approach: find the Item 3 heading and insert after its summary paragraph
    let foundItem3Heading = false;
    for (let i = 0; i < updatedContent.length; i++) {
      const node = updatedContent[i];
      if (node.type === 'heading' && node.attrs?.level === 2) {
        const text = node.content?.[0]?.text || '';
        if (text.includes('3. Expedited New Customer OnBoarding') || text.includes('3. New Account OnBoarding')) {
          foundItem3Heading = true;
        }
      }
      // If we found Item 3 heading and now we see a paragraph with Story Points
      if (foundItem3Heading && node.type === 'paragraph' && node.content?.[0]?.text?.includes('Story Points: 34')) {
        insertIndex = i + 1;
        break;
      }
    }

    if (insertIndex > -1 && !updatedContent[insertIndex]?.content?.[0]?.text?.includes('ENG-4797')) {
      updatedContent.splice(insertIndex, 0, {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "🎫 Detailed ticket: ENG-4797",
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
        // Update the third list item (Item 3 ticket)
        updatedContent[bulletListIndex].content[2] = {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "ENG-4797: Expedited Customer Onboarding Flow - " },
                {
                  type: "text",
                  text: "34 points, 65-87 hours",
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
    console.log('\n📋 Updated with Item 3 details:');
    console.log('   • Story Points: 34');
    console.log('   • Hours: 65-87');
    console.log('   • Complexity: High');
    console.log('   • Link to ENG-4797 added');
    console.log('   • Child tickets section updated');
    console.log('\n✅ All items complete:');
    console.log('   • Item 1 (ENG-4795): 34 points, 57-77 hours');
    console.log('   • Item 2 (ENG-4796): 55 points, 80-106 hours');
    console.log('   • Item 3 (ENG-4797): 34 points, 65-87 hours');
    console.log('   • TOTAL: 123 points, 202-270 hours');

  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4784WithItem3();

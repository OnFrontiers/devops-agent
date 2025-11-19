import JiraClient from '../core/jiraClient.js';

async function readENG4780() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4780';

    console.log(`🔄 Getting current details for ticket ${ticketKey}...\n`);

    // Get the current ticket
    const ticket = await jira.getIssue(ticketKey);
    console.log(`📋 Summary: ${ticket.fields.summary}`);
    console.log(`📊 Status: ${ticket.fields.status.name}`);
    console.log(`🏷️ Labels: ${ticket.fields.labels.join(', ') || 'None'}`);

    // Get the description content
    const description = ticket.fields.description;
    console.log('\n📝 Current Description Content:');

    if (description && description.content) {
      description.content.forEach((block, index) => {
        console.log(`\nBlock ${index + 1} (${block.type}):`);
        if (block.type === 'paragraph' && block.content) {
          const text = block.content.map(c => c.text || '').join('');
          console.log(`  "${text}"`);
        } else if (block.type === 'bulletList' && block.content) {
          block.content.forEach((item, itemIndex) => {
            if (item.content && item.content[0] && item.content[0].content) {
              const text = item.content[0].content.map(c => c.text || '').join('');
              console.log(`  • "${text}"`);
            }
          });
        } else if (block.type === 'heading' && block.content) {
          const text = block.content.map(c => c.text || '').join('');
          console.log(`  Heading: "${text}"`);
        }
      });
    } else {
      console.log('  No description content found');
    }

  } catch (error) {
    console.error('❌ Error reading ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
readENG4780();

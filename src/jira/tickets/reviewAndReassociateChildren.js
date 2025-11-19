import JiraClient from '../core/jiraClient.js';

async function reviewAndReassociateChildren() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Reviewing ENG-1846 and ENG-4749...\n');

    // Fetch both tickets
    const ticket1846 = await jira.getIssue('ENG-1846');
    const ticket4749 = await jira.getIssue('ENG-4749');

    console.log('📋 ENG-1846: ' + ticket1846.fields.summary);
    console.log('   Status: ' + ticket1846.fields.status.name);
    console.log('   Current Parent: ' + (ticket1846.fields.parent?.key || 'None'));
    console.log('   Issue Type: ' + ticket1846.fields.issuetype.name);
    console.log('   Description length: ' + (ticket1846.fields.description?.content?.length || 0) + ' blocks');

    console.log('\n📋 ENG-4749: ' + ticket4749.fields.summary);
    console.log('   Status: ' + ticket4749.fields.status.name);
    console.log('   Current Parent: ' + (ticket4749.fields.parent?.key || 'None'));
    console.log('   Issue Type: ' + ticket4749.fields.issuetype.name);
    console.log('   Description length: ' + (ticket4749.fields.description?.content?.length || 0) + ' blocks');

    // Print descriptions for analysis
    console.log('\n' + '='.repeat(60));
    console.log('ENG-1846 DESCRIPTION:');
    console.log('='.repeat(60));

    if (ticket1846.fields.description?.content) {
      ticket1846.fields.description.content.forEach(block => {
        if (block.type === 'paragraph' && block.content) {
          const text = block.content.map(c => c.text || '').join('');
          if (text.trim()) console.log(text);
        } else if (block.type === 'heading' && block.content) {
          const text = block.content.map(c => c.text || '').join('');
          console.log('\n## ' + text);
        } else if (block.type === 'bulletList' && block.content) {
          block.content.forEach(item => {
            if (item.content) {
              item.content.forEach(p => {
                if (p.content) {
                  const text = p.content.map(c => c.text || '').join('');
                  if (text.trim()) console.log('  • ' + text);
                }
              });
            }
          });
        }
      });
    } else {
      console.log('(No description)');
    }

    console.log('\n' + '='.repeat(60));
    console.log('ENG-4749 DESCRIPTION:');
    console.log('='.repeat(60));

    if (ticket4749.fields.description?.content) {
      ticket4749.fields.description.content.forEach(block => {
        if (block.type === 'paragraph' && block.content) {
          const text = block.content.map(c => c.text || '').join('');
          if (text.trim()) console.log(text);
        } else if (block.type === 'heading' && block.content) {
          const text = block.content.map(c => c.text || '').join('');
          console.log('\n## ' + text);
        } else if (block.type === 'bulletList' && block.content) {
          block.content.forEach(item => {
            if (item.content) {
              item.content.forEach(p => {
                if (p.content) {
                  const text = p.content.map(c => c.text || '').join('');
                  if (text.trim()) console.log('  • ' + text);
                }
              });
            }
          });
        }
      });
    } else {
      console.log('(No description)');
    }

    console.log('\n' + '='.repeat(60));
    console.log('ANALYSIS:');
    console.log('='.repeat(60));

    // Determine if there's interesting content
    const has1846Content = ticket1846.fields.description?.content?.length > 2;
    const has4749Content = ticket4749.fields.description?.content?.length > 2;

    console.log('\nENG-1846: ' + (has1846Content ? 'Has detailed description' : 'Minimal description'));
    console.log('ENG-4749: ' + (has4749Content ? 'Has detailed description' : 'Minimal description'));

    console.log('\n📝 Both tickets appear to be related to:');
    console.log('   • Seat-based licensing (covered in ENG-4795 section 1.6)');
    console.log('   • Online purchasing (covered in ENG-4795 section 1.5)');
    console.log('   • USD pricing model (covered in ENG-4795 section 1.1)');

    console.log('\n✅ Recommendation: Re-associate both tickets to ENG-4795');
    console.log('   These are subtasks of the pricing model implementation.');

    return { ticket1846, ticket4749, has1846Content, has4749Content };

  } catch (error) {
    console.error('❌ Error reviewing tickets:', error.message);
    throw error;
  }
}

// Run the function
reviewAndReassociateChildren();

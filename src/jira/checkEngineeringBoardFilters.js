import JiraClient from './core/jiraClient.js';

async function checkEngineeringBoardFilters() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Finding Engineering board...');

    // Get all boards
    const boardsData = await jira.getBoards();

    if (!boardsData.values || boardsData.values.length === 0) {
      console.log('❌ No boards found');
      return;
    }

    // Find Engineering board
    const engineeringBoard = boardsData.values.find(board =>
      board.name.toLowerCase().includes('engineering') ||
      board.name.toLowerCase().includes('eng')
    );

    if (!engineeringBoard) {
      console.log('❌ Engineering board not found. Available boards:');
      boardsData.values.forEach(board => {
        console.log(`  - ${board.name} (ID: ${board.id}, Type: ${board.type})`);
      });
      return;
    }

    console.log(`✅ Found Engineering board: ${engineeringBoard.name} (ID: ${engineeringBoard.id})`);
    console.log(`   Type: ${engineeringBoard.type}`);
    console.log(`   Location: ${engineeringBoard.location?.name || 'N/A'}`);

    // Get board configuration for more details
    console.log('\n🔍 Getting board configuration...');
    const configData = await jira.getBoardConfiguration(engineeringBoard.id);
    console.log(`   Board JQL: ${configData.filter?.jql || 'Default project query'}`);

    // Get quick filters for the board
    console.log('\n🔍 Getting quick filters...');
    const filtersData = await jira.getBoardFilters(engineeringBoard.id);

    if (!filtersData.values || filtersData.values.length === 0) {
      console.log('\n❌ No quick filters configured on the Engineering board');
      console.log('\n🔍 Checking other boards for comparison...\n');

      // Check all boards to see if any have filters
      for (const board of boardsData.values.slice(0, 5)) { // Check first 5 boards
        try {
          const boardFilters = await jira.getBoardFilters(board.id);
          if (boardFilters.values && boardFilters.values.length > 0) {
            console.log(`📋 Board "${board.name}" has ${boardFilters.values.length} quick filter(s):`);
            boardFilters.values.forEach((filter, index) => {
              console.log(`   ${index + 1}. ${filter.name}: ${filter.jql}`);
            });
            console.log('');
          }
        } catch (e) {
          // Skip boards that fail
        }
      }

      console.log('\n💡 To add quick filters to the Engineering board:');
      console.log('   1. Go to your Jira Engineering board');
      console.log('   2. Click "Board settings" (gear icon)');
      console.log('   3. Select "Quick Filters"');
      console.log('   4. Add filters like:');
      console.log('      - "Blocked": status = Blocked');
      console.log('      - "In Review": status = "In Review"');
      console.log('      - "My Tickets": assignee = currentUser()');
      console.log('      - "High Priority": priority = "Highest" OR priority = "High"');

      return;
    }

    console.log('\n📋 Quick Filters on Engineering Board:');
    console.log('='.repeat(50));

    filtersData.values.forEach((filter, index) => {
      console.log(`\n${index + 1}. ${filter.name}`);
      console.log(`   Query: ${filter.jql}`);
      console.log(`   Description: ${filter.description || 'No description'}`);
    });

    console.log(`\n📊 Total quick filters: ${filtersData.values.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the function
checkEngineeringBoardFilters();

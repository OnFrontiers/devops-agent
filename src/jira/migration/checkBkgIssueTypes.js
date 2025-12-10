import JiraClient from '../core/jiraClient.js';

async function checkBkgIssueTypes() {
  try {
    const jira = new JiraClient();

    console.log('🔍 Checking available issue types in BKG project...');

    // Get project metadata for BKG to see available issue types
    const projectData = await jira.client.get('/project/BKG');

    console.log(`\n📋 BKG Project Details:`);
    console.log(`   Name: ${projectData.data.name}`);
    console.log(`   Key: ${projectData.data.key}`);
    console.log(`   Type: ${projectData.data.projectTypeKey}`);

    // Get issue types for BKG project
    console.log('\n🔍 Getting issue types for BKG project...');
    const issueTypesData = await jira.client.get('/project/BKG/types');

    console.log('\n📋 Available Issue Types in BKG:');
    console.log('=' .repeat(50));

    for (const issueType of issueTypesData.data) {
      console.log(`   • ${issueType.name} (ID: ${issueType.id})`);
    }

    // Let's also check what issue types are used in ENG for comparison
    console.log('\n🔍 Checking ENG project issue types for comparison...');
    const engIssueTypesData = await jira.client.get('/project/ENG/types');

    console.log('\n📋 Available Issue Types in ENG:');
    console.log('=' .repeat(50));

    for (const issueType of engIssueTypesData.data) {
      console.log(`   • ${issueType.name} (ID: ${issueType.id})`);
    }

    // Create a mapping suggestion
    console.log('\n💡 Suggested Issue Type Mapping:');
    console.log('=' .repeat(50));

    const engTypes = engIssueTypesData.data.map(t => t.name);
    const bkgTypes = issueTypesData.data.map(t => t.name);

    console.log('ENG Issue Types → BKG Issue Types:');
    engTypes.forEach(engType => {
      // Find closest match in BKG
      const bkgMatch = bkgTypes.find(bkgType =>
        bkgType.toLowerCase().includes(engType.toLowerCase()) ||
        engType.toLowerCase().includes(bkgType.toLowerCase())
      );

      if (bkgMatch) {
        console.log(`   ${engType} → ${bkgMatch} ✅`);
      } else {
        console.log(`   ${engType} → ??? (needs manual mapping)`);
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.status === 404) {
      console.error('BKG project not found. Check if the project key is correct.');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access BKG project.');
    }
  }
}

checkBkgIssueTypes();

import JiraClient from '../core/jiraClient.js';

async function analyzeActiveIssueComponents() {
  try {
    const jira = new JiraClient();
    console.log('🔍 Analyzing active tickets (scoping through deployment) that are missing components...');

    // Target statuses representing active work
    const targetStatuses = [
      'Scoping', 'Triage',
      'Dev Ready', 'In Progress', 'Code Review',
      'Reviewed', 'Ready for Prod'
    ];

    console.log(`Searching for issues in statuses: ${targetStatuses.join(', ')}`);

    // Build JQL for active statuses
    const statusJql = targetStatuses.map(status =>
      `status = "${status}"`
    ).join(' OR ');

    const jql = `(${statusJql}) AND components IS EMPTY`;
    console.log(`JQL: ${jql}`);

    const results = await jira.searchIssues(jql, 0, 1000, [
      'summary', 'project', 'status', 'components', 'issuetype', 'labels',
      'priority', 'assignee', 'created', 'updated'
    ]);

    console.log(`\n📊 Found ${results.total} active tickets without components:`);
    console.log('='.repeat(80));

    if (results.total === 0) {
      console.log('✅ All active tickets already have components assigned!');
      return;
    }

    // Analyze patterns in the issues
    const issuesByProject = {};
    const issuesByType = {};
    const issuesByAssignee = {};
    const labelPatterns = new Set();
    const wordPatterns = new Set();

    results.issues.forEach((issue) => {
      const projectKey = issue.fields.project.key;
      const issueType = issue.fields.issuetype.name;
      const assignee = issue.fields.assignee?.displayName || 'Unassigned';

      // Group by project
      if (!issuesByProject[projectKey]) issuesByProject[projectKey] = [];
      issuesByProject[projectKey].push(issue);

      // Group by type
      if (!issuesByType[issueType]) issuesByType[issueType] = [];
      issuesByType[issueType].push(issue);

      // Group by assignee
      if (!issuesByAssignee[assignee]) issuesByAssignee[assignee] = [];
      issuesByAssignee[assignee].push(issue);

      // Extract patterns from labels
      const labels = issue.fields.labels || [];
      labels.forEach(label => {
        const normalizedLabel = label.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normalizedLabel) labelPatterns.add(normalizedLabel);
      });

      // Extract patterns from summary (key words)
      const summary = issue.fields.summary.toLowerCase();
      const words = summary.split(/\s+/).filter(word => word.length > 3);
      words.forEach(word => {
        if (!['create', 'implement', 'update', 'remove', 'fix', 'bug', 'feature',
             'from', 'with', 'for', 'and', 'the', 'add', 'new', 'api', 'user',
             'system', 'service'].includes(word)) {
          wordPatterns.add(word);
        }
      });
    });

    // Display findings by project
    console.log('\n🏗️ BREAKDOWN BY PROJECT:');
    Object.keys(issuesByProject).forEach(projectKey => {
      const projectIssues = issuesByProject[projectKey];
      console.log(`\n${projectKey}: ${projectIssues.length} issues`);
      console.log('-'.repeat(50));

      projectIssues.slice(0, 10).forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.key}: ${issue.fields.summary}`);
        console.log(`   Status: ${issue.fields.status.name} | Type: ${issue.fields.issuetype.name}`);
        console.log(`   Labels: ${(issue.fields.labels || []).join(', ') || 'None'}`);
        console.log(`   Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
        console.log('');
      });

      if (projectIssues.length > 10) {
        console.log(`... and ${projectIssues.length - 10} more issues`);
      }
    });

    // Component suggestion analysis
    console.log('\n🎯 COMPONENT SUGGESTION ANALYSIS:');
    console.log('='.repeat(50));

    console.log('\n📊 By Issue Type:');
    Object.entries(issuesByType).forEach(([type, issues]) => {
      console.log(`   ${type}: ${issues.length} issues`);
    });

    console.log('\n🏷️ Common Label Patterns:');
    const topLabels = Array.from(labelPatterns).filter(label =>
      !['costreduction', 'productdevelopment', 'cost-reduction', 'product-development'].includes(label)
    ).slice(0, 15);
    console.log(`   ${topLabels.join(', ')}`);

    console.log('\n📝 Common Technical Terms in Summaries:');
    const topWords = Array.from(wordPatterns).filter(word =>
      !['task', 'issue', 'ticket', 'work', 'need', 'should', 'would', 'this'].includes(word)
    ).slice(0, 15);
    console.log(`   ${topWords.join(', ')}`);

    // Suggest component structure
    console.log('\n💡 SUGGESTED COMPONENT STRUCTURE:');
    console.log('Based on the analysis, here are recommended component categories:');

    const suggestions = {
      'Search': [
        'cerca', 'search', 'filter', 'index',
        'query', 'elasticsearch', 'opensearch'
      ],
      'API & Webapp': [
        'api', 'endpoint', 'request', 'response',
        'frontend', 'backend', 'webapp', 'portal',
        'dashboard', 'interface', 'ui', 'user'
      ],
      'Operations Hub': [
        'operations', 'hub', 'orchestration', 'workflow',
        'pipeline', 'automation', 'process'
      ],
      'DevOps': [
        'deployment', 'infrastructure', 'container',
        'kubernetes', 'docker', 'aws', 'cloud', 'ci/cd',
        'monitoring', 'logging'
      ],
      'RM Agent': [
        'agent', 'relationship', 'sourcing', 'matching',
        'recommendation', 'expert'
      ],
      'Product Management': [
        'feature', 'requirement', 'specification',
        'planning', 'roadmap', 'strategy'
      ]
    };

    Object.entries(suggestions).forEach(([component, keywords]) => {
      const matchingIssues = results.issues.filter(issue => {
        const labels = issue.fields.labels || [];
        const summary = issue.fields.summary.toLowerCase();

        const matchesKeywords = keywords.some(keyword =>
          labels.some(label => label.toLowerCase().includes(keyword)) ||
          summary.includes(keyword)
        );

        return matchesKeywords;
      });

      console.log(`\n🏷️ "${component}" (${keywords.join(', ')})`);
      console.log(`   ${matchingIssues.length} potential issues`);
      if (matchingIssues.length > 0) {
        console.log(`   Sample: ${matchingIssues[0].key} - ${matchingIssues[0].fields.summary.slice(0, 50)}...`);
      }
    });

    console.log('\n📋 EXECUTION OPTIONS:');
    console.log('1. Apply these component suggestions automatically');
    console.log('2. Manually review and assign in Jira');
    console.log('3. Create a more detailed categorization script');

    console.log(`\nTotal active issues to categorize: ${results.total}`);

  } catch (error) {
    console.error('❌ Error analyzing active issues:', error.message);
    if (error.response?.status === 401) {
      console.error('Check your API token and email in the .env file');
    } else if (error.response?.status === 403) {
      console.error('Insufficient permissions to access the project');
    }
  }
}

// Run the function
analyzeActiveIssueComponents();

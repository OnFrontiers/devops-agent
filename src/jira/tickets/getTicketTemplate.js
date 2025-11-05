import JiraClient from '../core/jiraClient.js';
import fs from 'fs';
import path from 'path';

async function getTicketAsTemplate(issueKey, templateName) {
  try {
    const jira = new JiraClient();
    console.log(`🔍 Fetching ticket ${issueKey} to create ${templateName} template...`);
    
    const issue = await jira.getIssue(issueKey);
    
    // Create template object with key fields
    const template = {
      templateName: templateName,
      sourceTicket: issue.key,
      issueType: issue.fields.issuetype.name,
      fields: {
        summary: issue.fields.summary,
        description: issue.fields.description,
        priority: issue.fields.priority,
        labels: issue.fields.labels,
        components: issue.fields.components,
        fixVersions: issue.fields.fixVersions
      },
      createdAt: new Date().toISOString(),
      notes: `Template created from ${issue.key}: ${issue.fields.summary}`
    };
    
    // Save to templates directory
    const templatesDir = path.join(process.cwd(), 'templates');
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir);
    }
    
    const templatePath = path.join(templatesDir, `${templateName}.json`);
    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));
    
    console.log(`✅ Template saved to: ${templatePath}`);
    console.log(`📋 Template details:`);
    console.log(`   Source: ${issue.key}`);
    console.log(`   Type: ${issue.fields.issuetype.name}`);
    console.log(`   Summary: ${issue.fields.summary}`);
    console.log(`   Labels: ${issue.fields.labels?.join(', ') || 'None'}`);
    
    return template;
    
  } catch (error) {
    console.error(`❌ Error creating template from ${issueKey}:`, error.message);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const issueKey = process.argv[2] || 'ENG-4657';
  const templateName = process.argv[3] || 'story-template';
  getTicketAsTemplate(issueKey, templateName);
}

export default getTicketAsTemplate;
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class JiraClient {
  constructor() {
    this.baseURL = process.env.JIRA_BASE_URL;
    this.email = process.env.JIRA_EMAIL;
    this.apiToken = process.env.JIRA_API_TOKEN;
    
    if (!this.baseURL || !this.email || !this.apiToken) {
      throw new Error('Missing required environment variables: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN');
    }

    this.client = axios.create({
      baseURL: `${this.baseURL}/rest/api/3`,
      auth: {
        username: this.email,
        password: this.apiToken
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async getIssue(issueKey) {
    try {
      const response = await this.client.get(`/issue/${issueKey}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching issue ${issueKey}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async updateIssue(issueKey, updateData) {
    try {
      const response = await this.client.put(`/issue/${issueKey}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating issue ${issueKey}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async addComment(issueKey, comment) {
    try {
      const response = await this.client.post(`/issue/${issueKey}/comment`, {
        body: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: comment
                }
              ]
            }
          ]
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error adding comment to issue ${issueKey}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async searchIssues(jql, startAt = 0, maxResults = 50, fields = null) {
    try {
      const defaultFields = ['summary', 'status', 'assignee', 'description', 'priority', 'issuetype'];
      const params = {
        jql,
        startAt,
        maxResults,
        fields: (fields || defaultFields).join(',')
      };

      const response = await this.client.get('/search/jql', { params });
      return response.data;
    } catch (error) {
      console.error(`Error searching issues:`, error.response?.data || error.message);
      throw error;
    }
  }

  async transitionIssue(issueKey, transitionId) {
    try {
      const response = await this.client.post(`/issue/${issueKey}/transitions`, {
        transition: { id: transitionId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error transitioning issue ${issueKey}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async getTransitions(issueKey) {
    try {
      const response = await this.client.get(`/issue/${issueKey}/transitions`);
      return response.data.transitions;
    } catch (error) {
      console.error(`Error getting transitions for issue ${issueKey}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async assignIssue(issueKey, accountId) {
    try {
      const response = await this.client.put(`/issue/${issueKey}/assignee`, {
        accountId
      });
      return response.data;
    } catch (error) {
      console.error(`Error assigning issue ${issueKey}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.client.get('/myself');
      return response.data;
    } catch (error) {
      console.error(`Error getting current user:`, error.response?.data || error.message);
      throw error;
    }
  }

  getTemplateDescription(issueType) {
    if (issueType.toLowerCase() === 'bug') {
      return {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Description of the bug",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "..." }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "" }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Which environment?" }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "" }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "One-off or all the time?" }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "" }]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Sample Record",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "" }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "sample1" }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "" }]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Steps to reproduce",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "orderedList",
            attrs: { order: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: " " }]
                  }
                ]
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Intended Result",
                marks: [{ type: "strong" }]
              }
            ]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "..." }]
          }
        ]
      };
    }
    
    // Default story template
    return {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Background",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "tba" }]
                }
              ]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Acceptance Criteria",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "orderedList",
          attrs: { order: 1 },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: " " }]
                }
              ]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Technical Design",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "..." }]
        }
      ]
    };
  }

  async createCostOptimizationTicket(issueData) {
    try {
      // Get current user info
      const currentUser = await this.getCurrentUser();
      
      // Default cost-optimization ticket structure
      const ticketData = {
        fields: {
          project: { key: process.env.JIRA_PROJECT_KEY || 'ENG' },
          summary: issueData.summary,
          description: issueData.description || this.getTemplateDescription(issueData.issueType || 'Story'),
          issuetype: { name: issueData.issueType || 'Story' },
          assignee: { accountId: currentUser.accountId },
          labels: ['cost-reduction', ...(issueData.additionalLabels || [])],
          priority: issueData.priority || { name: '2 - Medium' }
        }
      };

      const response = await this.client.post('/issue', ticketData);
      return response.data;
    } catch (error) {
      console.error(`Error creating cost-optimization ticket:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createProductDevelopmentTicket(issueData) {
    try {
      // Get current user info
      const currentUser = await this.getCurrentUser();

      // Product development ticket structure (excludes cost-reduction label)
      const ticketData = {
        fields: {
          project: { key: process.env.JIRA_PROJECT_KEY || 'ENG' },
          summary: issueData.summary,
          description: issueData.description || this.getTemplateDescription(issueData.issueType || 'Story'),
          issuetype: { name: issueData.issueType || 'Story' },
          assignee: { accountId: currentUser.accountId },
          labels: issueData.additionalLabels || ['product-development'],
          priority: issueData.priority || { name: '2 - Medium' }
        }
      };

      const response = await this.client.post('/issue', ticketData);
      return response.data;
    } catch (error) {
      console.error(`Error creating product-development ticket:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createConsultationTicket(issueData) {
    try {
      // Get current user info
      const currentUser = await this.getCurrentUser();

      // Consultation ticket structure (excludes cost-reduction label)
      const ticketData = {
        fields: {
          project: { key: process.env.JIRA_PROJECT_KEY || 'ENG' },
          summary: issueData.summary,
          description: issueData.description || this.getTemplateDescription(issueData.issueType || 'Story'),
          issuetype: { name: issueData.issueType || 'Story' },
          assignee: { accountId: currentUser.accountId },
          labels: ['consultation', 'product-development', ...(issueData.additionalLabels || [])],
          priority: issueData.priority || { name: '2 - Medium' }
        }
      };

      const response = await this.client.post('/issue', ticketData);
      return response.data;
    } catch (error) {
      console.error(`Error creating consultation ticket:`, error.response?.data || error.message);
      throw error;
    }
  }

  async deleteIssue(issueKey) {
    try {
      const response = await this.client.delete(`/issue/${issueKey}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting issue ${issueKey}:`, error.response?.data || error.message);
      throw error;
    }
  }
}

export default JiraClient;

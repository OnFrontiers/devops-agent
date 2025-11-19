import JiraClient from '../core/jiraClient.js';

async function updateENG4764TechSpec() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4764';

    console.log(`🔄 Getting current details for ticket ${ticketKey}...\n`);

    // First, get the current ticket to see its structure
    const currentTicket = await jira.getIssue(ticketKey);
    console.log(`📋 Current Summary: ${currentTicket.fields.summary}`);
    console.log(`📊 Current Status: ${currentTicket.fields.status.name}`);

    // Get the current description content
    const currentDescription = currentTicket.fields.description;

    // Add the technical specification section
    const newContent = [
      ...currentDescription.content,
      {
        type: "paragraph",
        content: [{ type: "text", text: "" }]
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
        content: [
          {
            type: "text",
            text: "Navigation Path",
            marks: [{ type: "strong" }]
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Expert Requests → Dashboards → Create Campaign"
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Table View Name",
            marks: [{ type: "strong" }]
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Create Campaign"
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Context Tab & View",
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
                content: [
                  { type: "text", text: "Context Tab: dashboards" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "View Name: create-campaign" }
                ]
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
            text: "Component Architecture",
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
                content: [
                  { type: "text", text: "CampaignManagementTable.jsx - Main table for campaign listing" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "CampaignCreationModal.jsx - Modal for creating/editing campaigns" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "CampaignDetailPanel.jsx - Side panel for campaign details and metrics" }
                ]
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
            text: "API Endpoints Required",
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
                content: [
                  { type: "text", text: "GET /api/campaigns - List campaigns for table view" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "POST /api/campaigns - Create new campaign" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "GET /api/campaigns/{id} - Get campaign details" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "PUT /api/campaigns/{id} - Update campaign status/settings" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "POST /api/campaigns/{id}/link-er - Associate ER with campaign" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "GET /api/campaigns/{id}/ers - Get ERs associated with campaign" }
                ]
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
            text: "Database Schema",
            marks: [{ type: "strong" }]
          }
        ]
      },
      {
        type: "codeBlock",
        attrs: { language: "sql" },
        content: [
          {
            type: "text",
            text: "campaigns (\n  id, name, description, type, status,\n  target_criteria, messaging_templates, budget,\n  created_at, updated_at, created_by\n)\ncampaign_er_mappings (\n  campaign_id, expert_request_id\n)"
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Table Structure",
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
                content: [
                  { type: "text", text: "Table Name: Create Campaign" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Primary Action: Create New Campaign button" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Columns: Campaign Name, Status, Target Count, Created Date, Created By, Actions" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Grouping: By Status (Active, Paused, Completed)" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Filtering: By Status, Date Range, Created By" }
                ]
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
            text: "User Experience Flow",
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
                content: [{ type: "text", text: "Access: Navigate to Expert Requests → Dashboards → Create Campaign" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "View Campaigns: See table of existing campaigns with status and metrics" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Create Campaign: Click Create New Campaign button to open modal" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Configure Campaign: Fill form with name, description, target criteria, messaging" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Manage Campaign: View campaign details, associated ERs, performance metrics" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Trigger Actions: Generate ER batches, pause/resume campaigns, view analytics" }]
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
            text: "Integration Points",
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
                content: [
                  { type: "text", text: "Follow GenericTable structure same as ER Funnel" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Use existing SearchBarERFunnel component (adapted for campaign search)" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Implement same toast notification system" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Follow existing modal/overlay patterns" }
                ]
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
            text: "Implementation Phases",
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
                content: [{ type: "text", text: "Phase 1: Basic CRUD operations for campaigns" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Phase 2: Campaign configuration UI (targeting, templates)" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Phase 3: Integration with ER creation workflow" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Phase 4: Analytics and reporting dashboard" }]
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
                content: [{ type: "text", text: "Campaign Creation Interface: Form to define new recruiting campaigns" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Campaign Configuration: Settings for campaign type, target audience, messaging templates" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Campaign Management Dashboard: List/table view of all active campaigns" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Campaign Details View: Detailed view with performance metrics and ER associations" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Integration Points: Connect campaigns to existing ER creation workflow" }]
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
            text: "Success Metrics",
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
                content: [
                  { type: "text", text: "Campaigns fully managed within Operations Hub dashboard interface" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Seamless integration with existing ER creation and tracking workflows" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Consistent UX patterns with ER Funnel (search, tables, modals, toasts)" }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Campaign data drives automated ER batch creation and tracking" }
                ]
              }
            ]
          }
        ]
      }
    ];

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

    console.log('✅ Technical specification added successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Added comprehensive technical specification including:');
    console.log('   • Navigation path and component structure');
    console.log('   • API endpoints and database schema');
    console.log('   • Table structure and UX flow');
    console.log('   • Integration points and implementation phases');
    console.log('   • Acceptance criteria and success metrics');

  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4764TechSpec();

import JiraClient from '../core/jiraClient.js';

async function createENG4784Item1() {
  try {
    const jira = new JiraClient();

    console.log('🎫 Creating new ticket for Item 1: Implement the New Pricing Model...\n');

    // Create the detailed description for Item 1
    const description = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Story Points: 34",
              marks: [{ type: "strong" }]
            },
            { type: "text", text: " | " },
            {
              type: "text",
              text: "Estimated Hours: 57-77 hours (avg 67 hours)",
              marks: [{ type: "strong" }]
            },
            { type: "text", text: " | " },
            {
              type: "text",
              text: "Complexity: High",
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
          content: [
            { type: "text", text: "This ticket implements the new SMB pricing model with the following components:" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1.1 Creation of a New SMB Plan" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Low | Hours: 2-3",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Create a new \"smb\" plan type in the billing system using Enterprise as the starting point." }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Backend (API) Changes:",
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
                  content: [{ type: "text", text: "billing/service/billing_service.go - Add SMBPlan constant" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "migrations/api/models.py - Update BillingAccount.plan choices" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/billing_gql.go - Update GraphQL enum" }]
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
              text: "Frontend (Webapp) Changes:",
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
                  content: [{ type: "text", text: "src/schema.graphql - Update AccountType enum" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/core/viewer.ts - Update TypeScript types" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Run npm run compile to regenerate GraphQL types" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1.2 Introduction of a New Seat Type" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: High | Hours: 14-18",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Create new \"request_only\" service level that allows users to make expert requests, message experts, and request consultations - but the account pays for charges. Users without assigned seats cannot perform these actions." }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Backend (API) Changes:",
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
                  content: [{ type: "text", text: "billing/service/seat.go - Add RequestOnlyServiceLevel constant" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/billing_policies.go - Add permission policy for seat-based actions" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "permission/service/policy.go - Implement seat-check conditional policy" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "consultation/service/ - Add seat permission check before booking" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "messaging/service/ - Add seat permission check before messaging" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "expertrequest/service/ - Add seat permission check before creating request" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "migrations/api/models.py - Update BillingSeat.service_level choices and create migration" }]
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
              text: "Frontend (Webapp) Changes:",
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
                  content: [{ type: "text", text: "src/core/permissions.ts - Add client-side permission checks" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/components/RequestConsultation/ - Disable button for non-seat users" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/profile/components/Actions.tsx - Show seat requirement message" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/expertrequest/components/ - Block access for non-seat users" }]
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
              text: "Risks:",
              marks: [{ type: "strong" }]
            },
            { type: "text", text: " Permission system touches many services; comprehensive testing required across consultation, messaging, expert requests" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1.3 Display USD (Not Credits) in the App & Notifications" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Medium-High | Hours: 10-14",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Conditionally display USD amounts instead of credits for SMB plan accounts. Update expert profiles, request modals, and email notifications while maintaining backwards compatibility." }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Backend (API) Changes:",
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
                  content: [{ type: "text", text: "billing/service/billing_service.go - Add DisplaysUSD(account) helper method" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/billing_gql.go - Add display_currency field to BillingAccount" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/profile_gql.go - Add USD rate fields alongside credit_rate" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "emails/consultation_completed.html - Add conditional USD/credits display" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "emails/consultation_booked.html - Add conditional USD/credits display" }]
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
              text: "Frontend (Webapp) Changes:",
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
                  content: [{ type: "text", text: "src/core/billing.ts - Create shouldDisplayUSD() and formatCurrency() helpers" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/profile/components/Actions.tsx - Replace credits display with conditional USD" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/components/RequestConsultation/RequestConsultation.tsx - Update cost calculator" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/components/CreditsButton/CreditsButton.tsx - Conditionally show balance or hide" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/consultation/components/sections/CallDetails.tsx - Update currency display" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/email/templates/ConsultationCompleted.tsx - Add USD display logic" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1.4 Hide Credit Tab in Settings" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Low | Hours: 1-2",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Conditionally hide Credits tab in both user and team settings for SMB plans." }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Frontend (Webapp) Changes:",
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
                  content: [{ type: "text", text: "src/routes/settings/index.tsx - Filter Credits from requesterItems for SMB" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/routes/teamSettings/index.tsx - Filter Credits from team settings for SMB" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1.5 Create a Subscription Sub-Tab Under Settings" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Medium-High | Hours: 12-16",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Create new Subscription tab displaying plan details with Cancel Subscription and Switch to Annual functionality." }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Backend (API) Changes:",
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
                  content: [{ type: "text", text: "billing/service/stripe.go - Add GetSubscription(), CancelSubscription(), UpdateSubscriptionBillingPeriod() methods" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/billing_gql.go - Add Subscription type and cancelSubscription/switchToAnnualBilling mutations" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Handle webhooks: customer.subscription.updated, customer.subscription.deleted" }]
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
              text: "Frontend (Webapp) Changes:",
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
                  content: [{ type: "text", text: "Create src/components/SubscriptionSettings/SubscriptionSettings.tsx component" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/routes/settings/index.tsx - Add Subscription to requesterItems for SMB" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/routes/teamSettings/index.tsx - Add Subscription to team settings for SMB" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/actions/billing.ts - Add fetchSubscription(), cancelSubscription(), switchToAnnualBilling()" }]
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
              text: "Risks:",
              marks: [{ type: "strong" }]
            },
            { type: "text", text: " Stripe API integration complexity; need to handle edge cases (trial, past due, etc.); cancellation timing considerations" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1.6 Implement Seat Management" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: High | Hours: 18-24",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Implement comprehensive seat management UI with role labels (Team Owner, Full Access, Read Only), real-time seat count updates, and confirmation modals for upgrades." }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Backend (API) Changes:",
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
                  content: [{ type: "text", text: "group/service/member.go - Update member role types with new labels and seat counting logic" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/seat.go - Add ValidateSeatChange() and CalculateSeatUpgradeCost() methods" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/stripe.go - Add UpdateSubscriptionSeats() method" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/group_gql.go - Add updateMemberRole mutation with UpdateMemberRoleResult type" }]
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
              text: "Frontend (Webapp) Changes:",
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
                  content: [{ type: "text", text: "src/routes/team/Team.tsx - Enhance seat display section with X/Y seats used and progress indicator" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Create src/components/SeatManagement/ component with role management, seat counter, confirmation modals" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/routes/teamSettings/index.tsx - Add Team & Seats section" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/actions/group.ts - Add updateMemberRole() and validateSeatChange() actions" }]
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
              text: "Risks:",
              marks: [{ type: "strong" }]
            },
            { type: "text", text: " Complex UI/UX with multiple states; race conditions with concurrent changes; Stripe sync timing; partial failure handling" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Summary & Effort Breakdown" }]
        },
        {
          type: "table",
          attrs: { isNumberColumnEnabled: false, layout: "default" },
          content: [
            {
              type: "tableRow",
              content: [
                {
                  type: "tableHeader",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Sub-Component" }] }]
                },
                {
                  type: "tableHeader",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Complexity" }] }]
                },
                {
                  type: "tableHeader",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Hours" }] }]
                },
                {
                  type: "tableHeader",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Notes" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "1.1 Create SMB Plan" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Low" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "2-3" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Simple enum addition" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "1.2 New Seat Type" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "High" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "14-18" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Permission system changes across services" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "1.3 Display USD" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Medium-High" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "10-14" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Many UI touchpoints, email templates" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "1.4 Hide Credit Tab" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Low" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "1-2" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Simple conditional rendering" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "1.5 Subscription Tab" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Medium-High" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "12-16" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Stripe integration, new UI component" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "1.6 Seat Management" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "High" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "18-24" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Complex UI/UX, real-time updates, pricing" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "TOTAL", marks: [{ type: "strong" }] }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "High", marks: [{ type: "strong" }] }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "57-77", marks: [{ type: "strong" }] }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Average: 67 hours", marks: [{ type: "strong" }] }] }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Dependencies" }]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Stripe products already created (Annual: price_1SI9oOAE1fARVUOGj7ov4n22, Monthly: price_1SI9mtAE1fARVUOGEa05tboF)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Requires product/design mockups for: Subscription settings tab, Seat management UI, Seat upgrade confirmation modal" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Coordination with Item 2 (Continuous Charging) - need to know when/how charges occur" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Testing Requirements" }]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Unit tests for new seat type permissions" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Integration tests for Stripe subscription updates" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "E2E tests for: Seat assignment flow, Role change with seat upgrade, Subscription cancellation flow, USD display across all pages" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Manual QA for edge cases: At seat capacity, Subscription past due, Multiple simultaneous role changes" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Implementation Notes" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "We want to leverage Stripe to the fullest and mimic to the maximum extent possible the patterns and structures stripe uses as they've thought all this stuff through already - no need to re-invent the wheel." }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Stripe product details:",
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
                  content: [{ type: "text", text: "Annual: price_1SI9oOAE1fARVUOGj7ov4n22" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Monthly: price_1SI9mtAE1fARVUOGEa05tboF" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Current promo code (not sure if relevant): promo_1SI9z2AE1fARVUOGXb5M7TBq" }]
                }
              ]
            }
          ]
        }
      ]
    };

    const ticketData = {
      fields: {
        project: { key: process.env.JIRA_PROJECT_KEY || 'ENG' },
        summary: 'Implement New Pricing Model (SMB Plan)',
        description: description,
        issuetype: { name: 'Story' },
        labels: ['smb-plan', 'Q4-priorities', 'pricing-model'],
        parent: { key: 'ENG-4784' }
      }
    };

    const response = await jira.client.post('/issue', ticketData);
    const newTicket = response.data;

    console.log('✅ New ticket created successfully!');
    console.log(`🎫 Ticket: ${newTicket.key}`);
    console.log(`📋 Summary: Implement New Pricing Model (SMB Plan)`);
    console.log(`🔗 Parent: ENG-4784 (Implement New SMB Plan)`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${newTicket.key}`);
    console.log('\n📊 Ticket includes:');
    console.log('   • Story Points: 34');
    console.log('   • Estimated Hours: 57-77 hours (avg 67 hours)');
    console.log('   • Complexity: High');
    console.log('   • All 6 sub-components with detailed implementation specs');
    console.log('   • Effort breakdown table');
    console.log('   • Dependencies and testing requirements');

    return newTicket;

  } catch (error) {
    console.error('❌ Error creating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
    throw error;
  }
}

// Run the function
createENG4784Item1();

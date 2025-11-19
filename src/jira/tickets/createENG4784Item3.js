import JiraClient from '../core/jiraClient.js';

async function createENG4784Item3() {
  try {
    const jira = new JiraClient();

    console.log('🎫 Creating new ticket for Item 3: Expedited Customer Onboarding...\n');

    // Create the detailed description for Item 3
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
              text: "Estimated Hours: 65-87 hours (avg 76 hours)",
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
            { type: "text", text: "Replace the current \"no billing account\" modal with a new multi-step onboarding wizard that allows users to subscribe and set up their account in one go." }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.1 Onboarding Wizard Framework" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Medium-High | Hours: 8-12",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Find and replace current \"no billing account\" modal with multi-step onboarding wizard (5 steps) including step navigation and progress indicator." }
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
                  content: [{ type: "text", text: "Create src/components/OnboardingWizard/ with multi-step framework, navigation, progress bar, state management" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Replace modal trigger points in routes" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add route: /onboarding for standalone access" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.2 Step 1: Company Name Input" }]
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
            { type: "text", text: "Simple form to collect company name with validation (required, min/max length)." }
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
                  content: [{ type: "text", text: "Create src/components/OnboardingWizard/steps/CompanyNameStep.tsx with input field and validation" }]
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
                  content: [{ type: "text", text: "Optional: group/service/ - Add CheckCompanyNameAvailability() method" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.3 Step 2: Add Teammates" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Medium | Hours: 6-8",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Allow adding multiple teammate email addresses with validation, add/remove functionality, and display list." }
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
                  content: [{ type: "text", text: "Create src/components/OnboardingWizard/steps/AddTeammatesStep.tsx with email input, add/remove buttons, list display" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Create reusable src/components/EmailInput/ for email chip input" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Allow skip (teammates are optional)" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.4 Step 3: Subscription Selection & Payment" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: High | Hours: 16-20",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Display monthly vs annual options, seat quantity selector, real-time pricing calculator, Stripe payment collection (CC/ACH), and TOS checkbox." }
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
                  content: [{ type: "text", text: "billing/service/stripe.go - Add CreateOnboardingSubscription() method" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Handle subscription creation with customer creation and payment method attachment" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/billing_gql.go - Add createOnboardingSubscription mutation" }]
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
                  content: [{ type: "text", text: "Create src/components/OnboardingWizard/steps/SubscriptionStep.tsx with plan selection, seat quantity input, pricing calculator" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Integrate Stripe Elements for payment method collection" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Create src/components/PricingCalculator/ reusable component" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Handle payment failures and 3D Secure flow" }]
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
            { type: "text", text: " Stripe Elements integration, payment failures during onboarding, 3D Secure authentication, ACH vs CC differences" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.5 Step 4: Calendly Scheduling (Optional)" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Low-Medium | Hours: 4-6",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Embed Calendly scheduling widget, allow skip, track whether user scheduled, pre-fill form with user details." }
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
                  content: [{ type: "text", text: "Create src/components/OnboardingWizard/steps/SchedulingStep.tsx with Calendly embed and skip button" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Create src/components/CalendlyEmbed/ reusable component" }]
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
                  content: [{ type: "text", text: "Optional: integration/calendly/ - Webhook handler for Calendly events, store scheduled meeting info" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.6 Step 5: Confirmation Page" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Low | Hours: 3-4",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Success message with summary of what was created, next steps guidance, CTA to start using platform." }
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
                  content: [{ type: "text", text: "Create src/components/OnboardingWizard/steps/ConfirmationStep.tsx with success message, summary cards, \"Get Started\" button" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.7 Backend: Account & Team Creation Orchestration" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: High | Hours: 12-16",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Orchestrate full account setup: create billing account with SMB plan, create team/group, link billing to team, assign team owner role and seat, send invitations to teammates, assign seats to teammates." }
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
                  content: [{ type: "text", text: "Create onboarding/service/onboarding_service.go with CompleteOnboarding() orchestration method" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Logic: Create user → billing account → team → membership → seat assignment → teammate invitations" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Use database transactions for atomicity, implement rollback logic" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/onboarding_gql.go - Add completeOnboarding mutation" }]
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
            { type: "text", text: " Complex orchestration with multiple failure points, transaction boundaries, rollback/cleanup, race conditions, idempotency" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.8 Email & Internal Notification System" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Medium | Hours: 8-10",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Welcome email to customer, teammate invitation emails, internal notification to sales/CS team, optional Slack notification." }
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
                  content: [{ type: "text", text: "Create email templates: onboarding_welcome.html, onboarding_teammate_invite.html, internal_onboarding_notification.html" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "onboarding/service/ - Add SendOnboardingEmails() to trigger all emails" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Optional: integration/slack/ - Post notification to internal Slack channel" }]
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
              text: "Frontend (Webapp) - Email Templates:",
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
                  content: [{ type: "text", text: "Create src/email/templates/OnboardingWelcome.tsx and OnboardingTeammateInvite.tsx" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3.9 Error Handling & Edge Cases" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Medium | Hours: 6-8",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Handle payment failures gracefully, duplicate signups, company name conflicts, partial completions, validate seat limits, resume incomplete onboarding." }
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
                  content: [{ type: "text", text: "onboarding/service/ - Add validation, duplicate detection, partial state recovery" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Error logging and alerting for failed onboardings" }]
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
                  content: [{ type: "text", text: "Save wizard state to localStorage for recovery" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Error messages for all failure scenarios with retry mechanisms" }]
                }
              ]
            }
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.1 Wizard Framework" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Medium-High" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "8-12" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Multi-step wizard foundation" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.2 Company Name" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Simple form input" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.3 Add Teammates" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Medium" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "6-8" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Email input with add/remove" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.4 Subscription & Payment" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "High" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "16-20" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Stripe integration, most complex" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.5 Calendly Scheduling" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Low-Medium" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "4-6" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Embed widget, allow skip" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.6 Confirmation" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Low" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3-4" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Success message and summary" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.7 Account Orchestration" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "High" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "12-16" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Create account, team, seats" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.8 Email & Notifications" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Medium" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "8-10" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Multiple templates, internal alerts" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "3.9 Error Handling" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Medium" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "6-8" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Payment failures, recovery" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "65-87", marks: [{ type: "strong" }] }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Average: 76 hours", marks: [{ type: "strong" }] }] }]
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
                  content: [{ type: "text", text: "ENG-4795 (Item 1) and ENG-4796 (Item 2) must be completed first - requires SMB plan, Stripe subscription creation, payment method management, seat assignment" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Product/Design: Onboarding flow mockups, copy for all steps, TOS finalized, Calendly configured, internal notification channels" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Business: Minimum seat requirements defined, pricing display requirements, onboarding success metrics" }]
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
                  content: [{ type: "text", text: "Unit tests: Wizard state management, step validation, pricing calculator, email validation" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Integration tests: Stripe subscription creation, account/team orchestration, email sending, invitation creation" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "E2E tests: Complete flow (happy path), payment failure recovery, skip optional steps, Calendly integration, teammate invitations, resume incomplete onboarding" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Manual QA: All payment methods (CC, ACH), various seat quantities, monthly vs annual, email receipt, mobile responsiveness, edge cases" }]
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
            {
              type: "text",
              text: "Onboarding Best Practices:",
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
                  content: [{ type: "text", text: "Keep each step focused on one task" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Show progress indicator clearly" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Allow back navigation to edit previous steps" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Save state to localStorage for recovery" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Provide clear error messages with next steps" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Minimize required fields (can collect more later)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Celebrate completion (confirmation step)" }]
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
              text: "Monitoring & Analytics:",
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
                  content: [{ type: "text", text: "Track completion rate per step" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Track payment failure reasons" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Track overall conversion rate" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Track which step has highest drop-off" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Alert on failed onboardings" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Key Risks & Considerations" }]
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
                    {
                      type: "text",
                      text: "Conversion Funnel:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " Primary entry point for SMB customers - any bugs = lost revenue" }
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
                    {
                      type: "text",
                      text: "Stripe Payment Complexity:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " 3D Secure, ACH setup, payment failures must be handled gracefully" }
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
                    {
                      type: "text",
                      text: "User Drop-off:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " Multi-step flows have high abandonment - need state recovery" }
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
                    {
                      type: "text",
                      text: "Email Deliverability:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " Critical that welcome and invitation emails arrive promptly" }
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
                    {
                      type: "text",
                      text: "Mobile UX:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " May need mobile-optimized flow or suggest desktop completion" }
                  ]
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
        summary: 'Expedited Customer Onboarding Flow',
        description: description,
        issuetype: { name: 'Story' },
        labels: ['smb-plan', 'Q4-priorities', 'onboarding', 'conversion'],
        parent: { key: 'ENG-4784' }
      }
    };

    const response = await jira.client.post('/issue', ticketData);
    const newTicket = response.data;

    console.log('✅ New ticket created successfully!');
    console.log(`🎫 Ticket: ${newTicket.key}`);
    console.log(`📋 Summary: Expedited Customer Onboarding Flow`);
    console.log(`🔗 Parent: ENG-4784 (Implement New SMB Plan)`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${newTicket.key}`);
    console.log('\n📊 Ticket includes:');
    console.log('   • Story Points: 34');
    console.log('   • Estimated Hours: 65-87 hours (avg 76 hours)');
    console.log('   • Complexity: High');
    console.log('   • All 9 sub-components with detailed implementation specs');
    console.log('   • Effort breakdown table');
    console.log('   • Dependencies and testing requirements');
    console.log('   • Implementation notes with best practices');

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
createENG4784Item3();

import JiraClient from '../core/jiraClient.js';

async function updateENG4784Summary() {
  try {
    const jira = new JiraClient();
    const ticketKey = 'ENG-4784';

    console.log(`🔄 Updating ${ticketKey} with high-level summary...\n`);

    // Create high-level summary description
    const newDescription = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Overview" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "OnFrontiers is launching a new pricing model and making other enhancements to customer onboarding and billing to accommodate a flood of small and medium sized businesses who come through Govtribe (we anticipate this will continue as we add Highergov). We may eventually extend a version of this model to all of our customers."
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The pricing model - "
            },
            {
              type: "text",
              text: "summarized in this doc",
              marks: [
                {
                  type: "link",
                  attrs: { href: "https://resources.onfrontiers.com/govtribe-offer" }
                }
              ]
            },
            {
              type: "text",
              text: " - is defined by the following components:"
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
                  content: [{ type: "text", text: "Pricing is in USD" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Customers are charged a subscription (monthly and annual options) in dollars for a number of seat users" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "We charge booking, consultation, and cancellation / no show fees as incurred to a credit card or bank account on file" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Product Work" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "The main product work is divided into three major initiatives:" }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1. Implement the New Pricing Model" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Story Points: 34 | Hours: 57-77 | Complexity: High",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "🎫 Detailed ticket: ENG-4795",
              marks: [{ type: "strong" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "This work incorporates the following aspects:" }
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
                  content: [
                    {
                      type: "text",
                      text: "Creation of a new SMB plan",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " - Using Enterprise as starting point for defining new SMB Plan" }
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
                      text: "Introduction of a new seat type",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " - New seat type allowing users to make expert requests, message experts, request consultations (account pays). Non-seat users cannot perform these actions" }
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
                      text: "Display USD (not credits) in the App & Notifications",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " - Show USD fees/charges on expert profile, expert request modal, and \"consultations completed\" transactional email" }
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
                      text: "Hide Credit Tab in Settings",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " - For SMB Plans, don't show the credit tab under settings" }
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
                      text: "Create a Subscription Sub-Tab Under Settings",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " - List subscription details and allow customer to (1) cancel subscription, or (2) switch from monthly to annual billing" }
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
                      text: "Implement Seat Management",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " - Display seats purchased/unused, implement roles (Team Owner, Full Access, Read Only), allow role changes with seat upgrade notifications" }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2. Implement Continuous Charging to Credit Card / Bank (via Stripe)" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Story Points: TBD | Hours: TBD | Complexity: TBD",
              marks: [{ type: "em" }]
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
                  content: [{ type: "text", text: "Subscription fee charges implemented through Stripe using subscription management capabilities for recurring element" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "For usage charges, charge user's credit card / ACH bank connection authorized via Stripe:" }]
                },
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [{ type: "text", text: "Booking fees and consultation fees (based on estimated time) charged upon booking" }]
                        }
                      ]
                    },
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [{ type: "text", text: "After consultation completed, final charges made (refund for shorter time or charge for overage)" }]
                        }
                      ]
                    },
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [{ type: "text", text: "No-show or cancelation charges at time of no-show or cancelation" }]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3. Expedited New Customer OnBoarding" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Story Points: TBD | Hours: TBD | Complexity: TBD",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Replace current \"no billing account\" modal with new modal allowing users to subscribe and set-up their account in one go." }
          ]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Flow components:",
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
                  content: [{ type: "text", text: "Name your company" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add teammates" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Choose subscription - monthly or annual, number of seats, enter CC / ACH, acknowledge TOS" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Scheduling page via Calendly to book kick off w/ customer rep (can skip)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Confirmation page" }]
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
              text: "Backend work:",
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
                  content: [{ type: "text", text: "Create billing account" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Create team" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Trigger confirmation email to customer" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Trigger internal notifications to team" }]
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
            { type: "text", text: "We want to leverage Stripe to the fullest and mimic to the maximum extent possible the patterns and structures Stripe uses as they've thought all this stuff through already - no need to re-invent the wheel." }
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
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Child Tickets" }]
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
                    { type: "text", text: "ENG-4795: Implement New Pricing Model (SMB Plan) - " },
                    {
                      type: "text",
                      text: "34 points, 57-77 hours",
                      marks: [{ type: "strong" }]
                    }
                  ]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Item 2 ticket: TBD (Continuous Charging)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Item 3 ticket: TBD (Expedited Onboarding)" }]
                }
              ]
            }
          ]
        }
      ]
    };

    const updateData = {
      fields: {
        description: newDescription
      }
    };

    await jira.updateIssue(ticketKey, updateData);

    console.log('✅ Ticket updated successfully!');
    console.log(`🎫 Ticket: ${ticketKey}`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${ticketKey}`);
    console.log('\n📋 Updated description with:');
    console.log('   • High-level overview of the SMB plan initiative');
    console.log('   • Summary of 3 main product work items');
    console.log('   • Item 1 summary with link to ENG-4795 for details');
    console.log('   • Item 2 & 3 placeholders (TBD)');
    console.log('   • Implementation notes and Stripe product details');
    console.log('   • Child tickets section');

  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
  }
}

// Run the function
updateENG4784Summary();

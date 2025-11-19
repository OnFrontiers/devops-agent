import JiraClient from '../core/jiraClient.js';

async function createENG4784Item2() {
  try {
    const jira = new JiraClient();

    console.log('🎫 Creating new ticket for Item 2: Implement Continuous Charging...\n');

    // Create the detailed description for Item 2
    const description = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Story Points: 55",
              marks: [{ type: "strong" }]
            },
            { type: "text", text: " | " },
            {
              type: "text",
              text: "Estimated Hours: 80-106 hours (avg 93 hours)",
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
            { type: "text", text: "Implement continuous charging to customer credit card or ACH bank account for subscription fees and usage-based charges (booking fees, consultation fees, cancellation fees, no-show fees)." }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2.1 Subscription Fee Charging Infrastructure" }]
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
            { type: "text", text: "Implement recurring subscription charges through Stripe with webhook event handling and payment failure retry logic." }
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
                  content: [{ type: "text", text: "billing/service/stripe.go - Enhance handleStripeEvent() for subscription payment events" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add webhook handlers: customer.subscription.updated, invoice.payment_succeeded, invoice.payment_failed" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/billing_service.go - Add SubscriptionPaymentHistory tracking and HandleFailedPayment()" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "migrations/api/models.py - Add subscription_payments table (payment_date, amount, status, stripe_invoice_id)" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2.2 Payment Method Management" }]
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
            { type: "text", text: "Allow customers to add/update credit cards and ACH bank accounts, stored securely in Stripe." }
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
                  content: [{ type: "text", text: "billing/service/stripe.go - Add AddPaymentMethod(), SetDefaultPaymentMethod(), RemovePaymentMethod(), ListPaymentMethods()" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/billing_gql.go - Add PaymentMethod type and mutations" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "migrations/api/models.py - Add stripe_default_payment_method_id to BillingAccount" }]
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
                  content: [{ type: "text", text: "Create src/components/PaymentMethods/ component with Stripe.js integration" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add \"Payment Methods\" tab to user and team settings" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/actions/billing.ts - Add payment method CRUD actions" }]
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
            { type: "text", text: " Stripe.js integration complexity, PCI compliance, ACH vs credit card differences" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2.3 Booking Fee & Consultation Fee Charging (Upon Booking)" }]
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
            { type: "text", text: "Calculate and charge booking fee + estimated consultation fee immediately when customer books a consultation." }
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
                  content: [{ type: "text", text: "consultation/service/ - Modify booking flow to charge payment method" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add CalculateBookingCharges() and ChargeForBooking() methods" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/stripe.go - Add CreateUsageCharge() with idempotency" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "migrations/api/models.py - Add consultation_charges table (consultation_id, charge_type, amount, stripe_charge_id, status)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "emails/consultation_booked.html - Add charge amount and receipt information" }]
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
                  content: [{ type: "text", text: "src/components/RequestConsultation/ - Show estimated charges and payment method before booking" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Display charge success/failure messages and handle payment failures gracefully" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "src/consultation/components/ - Show charge history and receipt on consultation details" }]
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
            { type: "text", text: " Payment failure during booking, race conditions, idempotency requirements, UX for failed payments" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2.4 Post-Consultation Charge Reconciliation" }]
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
            { type: "text", text: "After consultation completion, calculate actual duration, issue refund if shorter than booked, or charge additional amount if longer." }
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
                  content: [{ type: "text", text: "consultation/service/ - Add ReconcileConsultationCharges() called when consultation marked complete" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/stripe.go - Add RefundCharge() and ChargeAdditional() methods" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add periodic task to reconcile completed consultations" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "migrations/api/models.py - Add refund_amount, additional_charge_amount, reconciled_at fields" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "emails/consultation_completed.html - Show final charges with refund or additional charge" }]
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
                  content: [{ type: "text", text: "src/consultation/components/sections/CallDetails.tsx - Show initial charge, refund/additional charge, and final total" }]
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
            { type: "text", text: " Complex calculation logic, timing of reconciliation, edge cases (very short/long consultations)" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2.5 No-Show & Cancellation Fee Charging" }]
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
            { type: "text", text: "Detect no-show and cancellation events, calculate appropriate fees, and charge customer's payment method." }
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
                  content: [{ type: "text", text: "consultation/service/ - Add HandleNoShow() and HandleCancellation() methods" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/ - Add CalculateNoShowFee() and CalculateCancellationFee() methods" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Calculate cancellation fee based on timing (e.g., <24 hours = full fee, >24 hours = partial/no fee)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Create emails: consultation_noshow_charge.html and consultation_cancellation_charge.html" }]
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
                  content: [{ type: "text", text: "src/consultation/components/ - Show cancellation policy and estimated fee before canceling" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Require confirmation for cancellations with fees" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Display no-show charges in consultation history" }]
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
            { type: "text", text: " Policy definition needs product input, dispute handling, grace periods" }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2.6 Charge History & Receipt Management" }]
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Complexity: Medium | Hours: 8-12",
              marks: [{ type: "em" }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Display all charges to customer (subscriptions + usage), generate receipts/invoices, allow downloading." }
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
                  content: [{ type: "text", text: "billing/service/ - Add GetChargeHistory() and GenerateReceipt() methods" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/stripe.go - Add GetStripeReceipt() returning receipt URL" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "gql/service/schema/billing_gql.go - Add Charge type and charges query with receipt_url field" }]
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
                  content: [{ type: "text", text: "Create src/components/ChargeHistory/ component with pagination and filtering" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add \"Billing History\" tab to user and team settings for SMB plans" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2.7 Failed Payment Handling & Recovery" }]
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
            { type: "text", text: "Detect failed payments via webhooks, implement retry logic, notify customers, handle account suspension for repeated failures." }
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
                  content: [{ type: "text", text: "billing/service/stripe.go - Enhance webhook handling for payment_intent.payment_failed" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add RetryFailedCharge() with exponential backoff" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "billing/service/ - Add HandlePaymentFailure() and account status management (active, payment_failed, suspended)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Add periodic tasks to retry failed payments and check for overdue accounts" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "migrations/api/models.py - Add payment_failures table (account_id, charge_id, failure_reason, retry_count, next_retry_at)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Create emails: payment_failed.html and payment_recovered.html" }]
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
                  content: [{ type: "text", text: "Create src/components/PaymentFailureAlert/ banner with link to update payment method" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Show payment failure status in user and team settings" }]
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
            { type: "text", text: " Complex retry logic, account suspension edge cases, customer communication, regulatory compliance" }
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "2.1 Subscription Fee Infrastructure" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Webhook enhancement, payment history" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "2.2 Payment Method Management" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Stripe.js integration, ACH/CC support" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "2.3 Booking Fee Charging" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Payment during booking flow, idempotency" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "2.4 Post-Consultation Reconciliation" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Complex refund/charge logic, timing" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "2.5 No-Show & Cancellation Fees" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Policy implementation, charge timing" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "2.6 Charge History & Receipts" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Medium" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "8-12" }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Display and receipt generation" }] }]
                }
              ]
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "2.7 Failed Payment Handling" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Retry logic, dunning, account suspension" }] }]
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
                  content: [{ type: "paragraph", content: [{ type: "text", text: "80-106", marks: [{ type: "strong" }] }] }]
                },
                {
                  type: "tableCell",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "Average: 93 hours", marks: [{ type: "strong" }] }] }]
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
                  content: [{ type: "text", text: "ENG-4795 (Item 1) must be completed first - requires SMB plan to exist, payment method tied to billing account, seat management" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Stripe Configuration: Payment method collection setup, webhook endpoints configured, ACH enabled on Stripe account" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Product Input Required: Cancellation fee policy, no-show fee policy, refund policy, dunning schedule and account suspension criteria" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Design/UX Mockups: Payment method management UI, charge history display, payment failure alerts, receipt design" }]
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
                  content: [{ type: "text", text: "Unit tests: Charge calculation, refund calculation, cancellation fee with various timings, payment retry backoff" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Integration tests: Stripe payment method CRUD, charge creation, refund processing, webhook events, failed payment retry" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "E2E tests: Complete booking with charge, consultation completion with refund/additional charge, cancellation with fee, no-show charge, payment method management, failed payment recovery" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Manual QA: Edge cases (very short/long consultations), payment failures at different points, concurrent charges, refund timing, receipt accuracy, email content, account suspension scenarios" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Stripe Test Mode: Use test mode for all development/QA, test card failure scenarios, test ACH failures, test webhook delivery failures" }]
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
              text: "Leverage Stripe Best Practices:",
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
                  content: [{ type: "text", text: "Use Stripe's Payment Intents API (not legacy Charges API)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement 3D Secure for card payments" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Use Stripe's automatic retry logic where possible" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Store idempotency keys for all charge operations" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Use Stripe's built-in receipt functionality" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Follow webhook best practices (verify signatures, handle retries)" }]
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
              text: "Code Structure Recommendations:",
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
                  content: [{ type: "text", text: "Create dedicated charge service/package" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement charge state machine (pending → succeeded/failed → reconciled)" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Use database transactions for charge + consultation updates" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement audit logging for all financial operations" }]
                }
              ]
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Create admin endpoints for support team" }]
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
                      text: "Financial Impact:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " Bugs in charging logic directly affect revenue and customer trust" }
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
                      text: "Idempotency:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " Must ensure charges are not duplicated" }
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
                      text: "Race Conditions:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " Booking, consultation completion, and charges happen asynchronously" }
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
                      text: "Refund Timing:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " When exactly is a consultation \"complete\" for reconciliation?" }
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
                      text: "Compliance:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " PCI compliance for payment handling, dunning compliance" }
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
                      text: "Customer Support:",
                      marks: [{ type: "strong" }]
                    },
                    { type: "text", text: " Need tooling for support team to investigate charges" }
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
        summary: 'Implement Continuous Charging (Stripe Payment Processing)',
        description: description,
        issuetype: { name: 'Story' },
        labels: ['smb-plan', 'Q4-priorities', 'stripe-integration', 'payments'],
        parent: { key: 'ENG-4784' }
      }
    };

    const response = await jira.client.post('/issue', ticketData);
    const newTicket = response.data;

    console.log('✅ New ticket created successfully!');
    console.log(`🎫 Ticket: ${newTicket.key}`);
    console.log(`📋 Summary: Implement Continuous Charging (Stripe Payment Processing)`);
    console.log(`🔗 Parent: ENG-4784 (Implement New SMB Plan)`);
    console.log(`🔗 URL: ${process.env.JIRA_BASE_URL}/browse/${newTicket.key}`);
    console.log('\n📊 Ticket includes:');
    console.log('   • Story Points: 55');
    console.log('   • Estimated Hours: 80-106 hours (avg 93 hours)');
    console.log('   • Complexity: High');
    console.log('   • All 7 sub-components with detailed implementation specs');
    console.log('   • Effort breakdown table');
    console.log('   • Dependencies and testing requirements');
    console.log('   • Implementation notes with Stripe best practices');

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
createENG4784Item2();

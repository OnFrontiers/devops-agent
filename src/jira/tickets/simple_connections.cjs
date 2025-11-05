const JiraClient = require("../core/jiraClient.cjs");

async function addSimpleConnections() {
  try {
    const jira = new JiraClient();

    // Get current ENG-4762 description
    const ticketResponse = await jira.client.get("/issue/ENG-4762");
    const currentContent = ticketResponse.data.fields.description.content;

    // Add simple connections section
    const connectionsContent = [
      { "type": "paragraph", "content": [{ "type": "text", "text": "", "marks": [] }] },
      {
        "type": "paragraph",
        "content": [
          { "type": "text", "text": "Connections to Github", "marks": [{ "type": "strong" }] }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 4 },
        "content": [{ "type": "text", "text": "Github Projects", "marks": [] }]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              { "type": "paragraph", "content": [{ "type": "text", "text": " ", "marks": [] }] }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 4 },
        "content": [{ "type": "text", "text": "Github Issues", "marks": [] }]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "https://github.com/OnFrontiers/operations-hub/issues/146",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": { "href": "https://github.com/OnFrontiers/operations-hub/issues/146" }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    const updatedContent = currentContent.concat(connectionsContent);

    await jira.client.put("/issue/ENG-4762", {
      fields: {
        description: {
          type: "doc",
          version: 1,
          content: updatedContent
        }
      }
    });

    console.log("✅ Added simple Connections section to ENG-4762");

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

addSimpleConnections();

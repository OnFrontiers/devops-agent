#!/usr/bin/env python3
"""
Update ENG-4762 Jira ticket to add Connections section
This script uses the existing node-based Jira client since it's JavaScript-based
"""

import subprocess
import sys

def update_eng4762_connections():
    """
    Create a simple Node.js script and execute it to update ENG-4762
    """
    try:
        # Create the Node.js update script inline
        node_script = '''
const JiraClient = require("../core/jiraClient.js");

async function updateConnections() {
  try {
    const jira = new JiraClient();
    console.log("🔄 Getting current ENG-4762 description...");

    // First get the current ticket to read existing description
    const ticketResponse = await jira.client.get("/issue/ENG-4762");
    const currentContent = ticketResponse.data.fields.description.content;

    console.log("📝 Adding Connections section to ENG-4762...");

    // Create the Connections section to append
    const connectionsSection = [
      {
        "type": "paragraph",
        "content": [{"type": "text", "text": "", "marks": []}]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Connections to Github",
            "marks": [{"type": "strong" }]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [{"type": "text", "text": "", "marks": []}]
      },
      {
        "type": "heading",
        "attrs": {"level": 5},
        "content": [{"type": "text", "text": "Github Projects", "marks": []}]
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
                    "text": " ",
                    "marks": []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {"level": 5},
        "content": [{"type": "text", "text": "Github Issues", "marks": []}]
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
                        "attrs": {
                          "href": "https://github.com/OnFrontiers/operations-hub/issues/146"
                        }
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

    // Append connections section to current content
    const updatedContent = currentContent.concat(connectionsSection);

    // Update the ticket
    const updateData = {
      fields: {
        description: {
          type: "doc",
          version: 1,
          content: updatedContent
        }
      }
    };

    await jira.client.put("/issue/ENG-4762", updateData);

    console.log("✅ ENG-4762 updated successfully!");
    console.log("   Added: Connections to Github section");
    console.log("   GitHub Issues: https://github.com/OnFrontiers/operations-hub/issues/146");

  } catch (error) {
    console.error("❌ Error updating ENG-4762:", error.message);
    process.exit(1);
  }
}

updateConnections();
'''

        # Write the Node.js script to a temporary file and execute it
        with open('temp_update_eng4762.cjs', 'w') as f:
            f.write(node_script)

        print("🔗 Adding Connections section to ENG-4762...")
        print("=" * 50)

        # Run the Node.js script
        result = subprocess.run(
            ['/usr/local/bin/node', 'temp_update_eng4762.cjs'],
            cwd='/Users/borgesenioc/Projects/onfrontiers/devops-agent/src/jira/tickets',
            capture_output=True,
            text=True
        )

        # Clean up temp file
        subprocess.run(['rm', 'temp_update_eng4762.cjs'],
                      cwd='/Users/borgesenioc/Projects/onfrontiers/devops-agent/src/jira/tickets')

        if result.returncode == 0:
            print(result.stdout)
            return True
        else:
            print(f"❌ Error: {result.stderr}")
            return False

    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == '__main__':
    success = update_eng4762_connections()

    if success:
        print()
        print("🎉 SUCCESS: ENG-4762 now has Connections section!")
        print("   Jira: https://onfrontiers.atlassian.net/browse/ENG-4762")
        print("   GitHub: https://github.com/OnFrontiers/operations-hub/issues/146")
        print()
        print("✅ Cross-platform connection established!")
    else:
        print()
        print("❌ FAILED: Could not update ENG-4762")
        sys.exit(1)

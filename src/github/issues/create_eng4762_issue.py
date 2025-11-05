#!/usr/bin/env python3
"""
Create GitHub issue to connect with ENG-4762 Jira ticket

ENG-4762: "Fix call to render unrelated views on the ER Funnel"
This connects the Jira ticket with GitHub issue tracking for the ER Funnel charts implementation.
"""

import sys
import os
from datetime import datetime

# Add the core directory to Python path so we can import github_client
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'core'))

from github_client import GitHubClient

def create_eng4762_github_connection():
    """
    Create GitHub issue connected to ENG-4762 and add cross-references
    """
    try:
        # Initialize GitHub client
        client = GitHubClient()

        # Verify repository access
        repo_info = client.verify_repository_access()
        print(f"📁 Target Repository: {repo_info['full_name']}")
        print(f"🔗 URL: {repo_info['html_url']}")
        print()

        # Create the GitHub issue
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')

        issue_title = "[4762] Fix call to render unrelated views on the ER Funnel"

        issue_body = f"""# [4762] Fix call to render unrelated views on the ER Funnel

**Created:** {timestamp}
**Connected Ticket:** ENG-4762
**Purpose:** Fix issue where ER Funnel charts render unrelated views instead of proper candidate analytics

## 🎫 Jira Connection

**Jira Ticket:** https://onfrontiers.atlassian.net/browse/ENG-4762
**Summary:** Add ER Candidate Analytics Charts to Funnel View
**Status:** Implementation of candidate funnel charts for Expert Recruitment

## 🔍 Issue Description

There is a bug where the ER Funnel charts are rendering unrelated views instead of the proper candidate analytics charts. This needs to be fixed to ensure the charts display the correct ER candidate funnel data.

## 📊 Expected Behavior

The ER Funnel view should display:
- **Marketplace Recruiting Chart** (left side): Candidates from marketplace sources (in_network/suggested)
- **Off-Marketplace Recruiting Chart** (right side): All other recruitment candidates
- **Data Source**: `cached_expert_request_candidates_raw` filtered by selected ER ID
- **Layout**: Side-by-side charts (50/50 screen split)

## 🐛 Current Bug

Instead of showing the proper ER candidate analytics, unrelated views are being rendered in the chart area.

## 🔗 Related Systems

- **Jira Ticket ENG-4762**: https://onfrontiers.atlassian.net/browse/ENG-4762
- **ER Funnel Location**: `/expert-requests/dashboards/er-funnel`
- **Chart Component**: GenericTable.customBody rendering
- **Data Pipeline**: ER candidate funnel metrics by match_state/stage

## ✅ Implementation Checklist

- [ ] Identify the incorrect view being rendered
- [ ] Fix chart data source to use ER candidate pipeline
- [ ] Ensure proper marketplace vs off-marketplace classification
- [ ] Test chart rendering with actual candidate data
- [ ] Verify charts update when ER selection changes

## 🧪 Testing

- [ ] Charts render with correct candidate data
- [ ] Marketplace/off-marketplace classification works properly
- [ ] Charts update dynamically with ER selection
- [ ] No performance issues with large candidate datasets

---
*This GitHub issue is connected to Jira ENG-4762. Please sync any implementation progress between both systems.*"""

        # Create the issue with labels and assignment
        labels = ['eng-4762', 'bug', 'charts', 'er-funnel']
        assignees = [client.username]

        print("🎫 Creating GitHub issue for ENG-4762...")
        print(f"   Title: {issue_title}")

        issue_data = client.create_issue(
            title=issue_title,
            body=issue_body,
            labels=labels,
            assignees=assignees
        )

        print()
        print("✅ GitHub issue created successfully!")
        print(f"   Issue: {issue_data['html_url']}")
        print(f"   Number: #{issue_data['number']}")
        print(f"   Labels: {', '.join([label['name'] if isinstance(label, dict) else str(label) for label in issue_data.get('labels', [])])}")

        print()
        print("🔗 Cross-platform connection established!")
        print(f"   GitHub Issue: {issue_data['html_url']}")
        print("   Jira Ticket: https://onfrontiers.atlassian.net/browse/ENG-4762")
        print()

        # Optional: Add a comment to the GitHub issue with connection details
        connection_comment = f"""🔗 **Connection Established**

This GitHub issue is connected to:
- **Jira Ticket**: ENG-4762
- **URL**: https://onfrontiers.atlassian.net/browse/ENG-4762
- **Purpose**: Fix ER Funnel chart rendering bug
- **Status**: Development tracking for Jira implementation

Please keep both issues synchronized during development."""

        print("💬 Adding connection reference comment...")
        client.add_comment(issue_data['number'], connection_comment)
        print("✅ Connection comment added")

        return issue_data

    except ValueError as e:
        print(f"❌ Error: {e}")
        return None
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return None

if __name__ == '__main__':
    print("🔗 Creating ENG-4762 GitHub connection...")
    print("=" * 50)

    result = create_eng4762_github_connection()

    if result:
        print()
        print("🎉 SUCCESS: ENG-4762 is now connected to GitHub!")
        print(f"   GitHub Issue: {result['html_url']}")
        print("   Jira Ticket: https://onfrontiers.atlassian.net/browse/ENG-4762")
        print()
        print("📝 Next steps:")
        print("   1. Open the GitHub issue to review the connection")
        print("   2. Copy the GitHub URL to add as comment in Jira ENG-4762")
        print("   3. Start implementation and sync progress between systems")
    else:
        print()
        print("❌ FAILED: Could not create GitHub connection for ENG-4762")
        print("Common issues:")
        print("  - GitHub API authentication problems")
        print("  - Repository permission issues")
        print("  - Network connectivity problems")
        sys.exit(1)

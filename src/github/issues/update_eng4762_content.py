#!/usr/bin/env python3
"""
Update GitHub issue #146 with clean ENG-4762 content from Jira
"""

import sys
import os

# Add the core directory to Python path so we can import github_client
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'core'))

from github_client import GitHubClient

def update_eng4762_github():
    """
    Replace the verbose GitHub issue #146 with clean ENG-4762 content
    """
    try:
        # Initialize GitHub client
        client = GitHubClient()

        # Exact ENG-4762 content from updateENG4762ChartsSpec.js
        clean_title = "Add ER Candidate Analytics Charts to Funnel View"

        clean_body = """## Current Implementation Status

- ER Funnel search + select + inline detail: ✅ Complete
- GenericTable custom body rendering: ✅ Available
- Candidate data pipeline: ✅ Available (counts by match_state/stage)

## New Specification: ER Candidate Analytics Charts

Display expert_request_candidate funnel metrics in two charts below ER detail panel in ER Funnel view (/expert-requests/dashboards/er-funnel).

### Layout: Side-by-side charts (50/50 screen split)

#### 📊 LEFT CHART: Marketplace Recruiting

- Data: Candidates where classification = marketplace (add_method='in_network' or 'suggested' - TBD)
- Chart Type: [TBD - bar/line showing recruitment funnel progression]
- Metrics: Suggested → Contacted → Matched → Verified → Vetting → Interested

#### 📈 RIGHT CHART: Off-Marketplace Recruiting

- Data: All other candidates (not marketplace-sourced)
- Chart Type: [Same as left chart for consistency]
- Metrics: Same funnel stages as marketplace chart

## Technical Requirements

1. Charts render below ER inline detail in GenericTable.customBody (reuse existing ERInlineDetail pattern)
2. Data sourced from cached_expert_request_candidates_raw by selected ER ID
3. Charts update automatically when ER selection changes
4. Chart library integration using existing OpsHub chart patterns (reusable across other views)
5. Error handling for cases with no candidate data

## Open Questions

1. What chart type will be best for showing recruitment funnel progression?
2. How to classify marketplace vs off-marketplace (need add_method field or alternative logic)?
3. Should charts show counts or percentages, or both?

## 📋 Next steps after spec approval

1. Decide on chart type (bar/line/funnel visualization)
2. Determine marketplace classification logic
3. Create chart components and integrate into ER funnel
4. Add chart library to OpsHub dependencies"""

        # Update the GitHub issue
        print("🔄 Updating GitHub issue #146 with clean ENG-4762 content...")
        print(f"   New Title: {clean_title}")

        # GitHub API expects the full issue data to be updated
        update_data = {
            "title": clean_title,
            "body": clean_body,
            "labels": ["eng-4762", "charts", "er-funnel"],  # Remove "bug" label since this is a feature
            "assignees": [client.username]
        }

        # Update issue #146
        issue_data = client.session.patch(
            f"{client.repo_url}/issues/146",
            json=update_data
        )
        issue_data = issue_data.json()

        print("✅ GitHub issue #146 updated successfully!")
        print(f"   URL: {issue_data['html_url']}")
        print(f"   Title: {issue_data['title']}")

        return issue_data

    except ValueError as e:
        print(f"❌ Error: {e}")
        return None
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return None

if __name__ == '__main__':
    print("🧹 Updating ENG-4762 GitHub issue with clean content...")
    print("=" * 60)

    result = update_eng4762_github()

    if result:
        print()
        print("🎉 SUCCESS: ENG-4762 GitHub issue cleaned up!")
        print(f"   Issue: {result['html_url']}")
        print("   Content: Clean ENG-4762 specification from Jira")
        print()
        print("📝 Next: Update Jira ENG-4762 to add Connections section")
    else:
        print()
        print("❌ FAILED: Could not update GitHub issue content")
        sys.exit(1)

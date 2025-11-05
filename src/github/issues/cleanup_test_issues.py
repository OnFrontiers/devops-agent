#!/usr/bin/env python3
"""
Clean up test issues created during DevOps Agent GitHub integration testing

This script closes the test issues that were created to verify GitHub integration.
"""

import sys
import os

# Add the core directory to Python path so we can import github_client
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'core'))

from github_client import GitHubClient

def cleanup_test_issues():
    """
    Close the test issues created during GitHub integration testing
    """
    try:
        # Initialize GitHub client
        client = GitHubClient()

        # Test issues to close (created during Phase 2 testing)
        issues_to_close = [143, 144, 145]

        print("🧹 Cleaning up GitHub test issues")
        print("=" * 40)

        closed_count = 0
        already_closed = 0

        for issue_number in issues_to_close:
            try:
                # Get issue details first to check current state
                issue_data = client.get_issue(issue_number)
                current_state = issue_data['state']

                if current_state == 'closed':
                    print(f"ℹ️  Issue #{issue_number} is already closed")
                    already_closed += 1
                else:
                    # Close the issue
                    client.close_issue(issue_number)
                    print(f"✅ Closed issue #{issue_number}")
                    closed_count += 1

                    # Add a closing comment
                    close_comment = """Cleaning up test issues from DevOps Agent GitHub integration verification.

**This issue was automatically closed** as part of phase 2 testing completion.

For future issue creation capabilities, check the DevOps Agent GitHub automation:
- 📍 Repository: operations-hub
- 🔧 Framework: DevOps Agent Python client
- 📋 Features: Automated issue creation, label assignment, user assignment"""

                    client.add_comment(issue_number, close_comment)

            except ValueError as e:
                print(f"⚠️  Failed to process issue #{issue_number}: {e}")
            except Exception as e:
                print(f"❌ Error with issue #{issue_number}: {e}")

        print()
        print(f"🧹 Cleanup Summary:")
        print(f"   • Issues closed: {closed_count}")
        print(f"   • Already closed: {already_closed}")
        print(f"   • Total processed: {len(issues_to_close)}")

        if closed_count > 0 or already_closed > 0:
            print("\n✅ Test issue cleanup completed successfully!")
        else:
            print("\n❓ No issues were found to clean up.")

    except ValueError as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    cleanup_test_issues()

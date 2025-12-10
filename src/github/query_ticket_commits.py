#!/usr/bin/env python3
"""
GitHub Commit and PR Query Tool for Jira Tickets

Queries GitHub for commits and pull requests related to a specific Jira ticket.
"""

import os
import requests
import argparse
from datetime import datetime
from typing import Dict, List, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class TicketCommitQuerier:
    def __init__(self):
        self.token = os.getenv('GITHUB_PERSONAL_ACCESS_TOKEN')
        self.organization = os.getenv('GITHUB_ORGANIZATION')
        self.repository = os.getenv('GITHUB_REPOSITORY')

        if not self.token:
            raise ValueError("GITHUB_PERSONAL_ACCESS_TOKEN environment variable is required")

        if not self.organization or not self.repository:
            raise ValueError("GITHUB_ORGANIZATION and GITHUB_REPOSITORY environment variables are required")

        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'token {self.token}',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'DevOps-Agent/1.0'
        })

        self.base_url = 'https://api.github.com'

    def search_commits(self, ticket_key: str) -> List[Dict[str, Any]]:
        """Search for commits that mention the ticket key in commit message"""
        print(f"🔍 Searching for commits containing '{ticket_key}'...")

        # Use GitHub search API for commits
        search_url = f"{self.base_url}/search/commits"
        params = {
            'q': f'repo:{self.organization}/{self.repository} {ticket_key}',
            'sort': 'committer-date',
            'order': 'desc',
            'per_page': 100
        }

        response = self.session.get(search_url, params=params)
        response.raise_for_status()
        data = response.json()

        commits = []
        for item in data.get('items', []):
            commit = {
                'sha': item['sha'],
                'message': item['commit']['message'],
                'author': item['commit']['author']['name'] if item['commit'].get('author') else 'Unknown',
                'date': item['commit']['committer']['date'] if item['commit'].get('committer') else 'Unknown',
                'url': item['html_url']
            }
            commits.append(commit)

        print(f"Found {len(commits)} commits")
        return commits

    def search_pull_requests(self, ticket_key: str) -> List[Dict[str, Any]]:
        """Search for pull requests that mention the ticket key"""
        print(f"🔍 Searching for pull requests containing '{ticket_key}'...")

        # Use GitHub search API for issues (which includes PRs)
        search_url = f"{self.base_url}/search/issues"
        params = {
            'q': f'repo:{self.organization}/{self.repository} is:pr {ticket_key}',
            'sort': 'updated',
            'order': 'desc',
            'per_page': 100
        }

        response = self.session.get(search_url, params=params)
        response.raise_for_status()
        data = response.json()

        prs = []
        for item in data.get('items', []):
            pr = {
                'number': item['number'],
                'title': item['title'],
                'state': item['state'],
                'created_at': item['created_at'],
                'updated_at': item['updated_at'],
                'user': item['user']['login'] if item.get('user') else 'Unknown',
                'url': item.get('html_url', item.get('url', 'No URL')),
                'body': item.get('body', ''),  # Keep full body for analysis
                'labels': [label['name'] for label in item.get('labels', [])]
            }
            prs.append(pr)

        print(f"Found {len(prs)} pull requests")
        return prs

    def get_commits_in_pr(self, pr_number: int) -> List[Dict[str, Any]]:
        """Get all commits in a specific pull request"""
        commits_url = f"{self.base_url}/repos/{self.organization}/{self.repository}/pulls/{pr_number}/commits"

        response = self.session.get(commits_url)
        response.raise_for_status()
        commits = response.json()

        pr_commits = []
        for commit in commits:
            commit_data = {
                'sha': commit['sha'],
                'message': commit['commit']['message'],
                'author': commit['commit']['author']['name'] if commit['commit'].get('author') else 'Unknown',
                'date': commit['commit']['committer']['date'] if commit['commit'].get('committer') else 'Unknown',
                'url': commit['html_url']
            }
            pr_commits.append(commit_data)

        return pr_commits

    def format_commit_summary(self, commits: List[Dict[str, Any]]) -> str:
        """Format commits into a readable summary"""
        if not commits:
            return "No commits found."

        summary = f"## Commits ({len(commits)}):\n\n"
        for commit in commits:
            date = datetime.fromisoformat(commit['date'].replace('Z', '+00:00')).strftime('%Y-%m-%d %H:%M')
            summary += f"• **{commit['sha'][:7]}** - {commit['message'].split('\n')[0]}\n"
            summary += f"  Author: {commit['author']} | Date: {date}\n"
            summary += f"  URL: {commit['url']}\n\n"

        return summary

    def format_pr_summary(self, prs: List[Dict[str, Any]]) -> str:
        """Format PRs into a readable summary"""
        if not prs:
            return "No pull requests found."

        summary = f"## Pull Requests ({len(prs)}):\n\n"
        for pr in prs:
            status = "🟢" if pr['state'] == 'open' else "🔴"
            created = datetime.fromisoformat(pr['created_at'].replace('Z', '+00:00')).strftime('%Y-%m-%d')
            summary += f"• **{status} PR #{pr['number']}** - {pr['title']}\n"
            summary += f"  Author: {pr['user']} | Created: {created} | Status: {pr['state']}\n"
            summary += f"  URL: {pr['url']}\n"
            if pr['body']:
                summary += f"  Description: {pr['body']}\n"
            summary += "\n"

        return summary


def main():
    parser = argparse.ArgumentParser(description='Query GitHub for commits and PRs related to a Jira ticket')
    parser.add_argument('ticket_key', help='Jira ticket key (e.g., ENG-4766)')
    parser.add_argument('--include-pr-commits', action='store_true', help='Include detailed commits for each PR')

    args = parser.parse_args()

    try:
        querier = TicketCommitQuerier()

        print(f"🎫 Analyzing ticket: {args.ticket_key}\n")

        # Search for commits
        commits = querier.search_commits(args.ticket_key)

        # Search for pull requests
        prs = querier.search_pull_requests(args.ticket_key)

        # If requested, get detailed commits for each PR
        if args.include_pr_commits and prs:
            print("🔍 Getting detailed commits for each PR...")
            for pr in prs:
                pr_commits = querier.get_commits_in_pr(pr['number'])
                pr['commits'] = pr_commits
                pr['commit_count'] = len(pr_commits)

        # Generate summaries
        commit_summary = querier.format_commit_summary(commits)
        pr_summary = querier.format_pr_summary(prs)

        # Print results
        print("=" * 80)
        print(f"SUMMARY FOR TICKET {args.ticket_key}")
        print("=" * 80)

        print(commit_summary)
        print(pr_summary)

        # Overall statistics
        total_commits = len(commits)
        if args.include_pr_commits:
            for pr in prs:
                total_commits += pr.get('commit_count', 0)

        print("=" * 80)
        print("STATISTICS:")
        print(f"• Direct commits: {len(commits)}")
        print(f"• Pull requests: {len(prs)}")
        if args.include_pr_commits:
            for pr in prs:
                print(f"  - PR #{pr['number']}: {pr.get('commit_count', 0)} commits")
        print(f"• Total commits across all PRs: {sum(pr.get('commit_count', 0) for pr in prs) if args.include_pr_commits else 'Not calculated'}")
        print("=" * 80)

    except ValueError as e:
        print(f"❌ Configuration error: {e}")
        return 1
    except requests.exceptions.RequestException as e:
        print(f"❌ API request error: {e}")
        return 1
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return 1

    return 0


if __name__ == "__main__":
    exit(main())

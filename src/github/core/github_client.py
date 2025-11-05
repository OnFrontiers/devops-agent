#!/usr/bin/env python3
"""
GitHub API Client for DevOps Automation

Provides core GitHub API functionality for repository and issue management.
Similar to jiraClient.js but for GitHub operations.
"""

import os
import requests
from typing import Optional, Dict, Any, List
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class GitHubClient:
    """
    GitHub API client for automation tasks
    """

    def __init__(self):
        """Initialize GitHub client with authentication"""
        self.token = os.getenv('GITHUB_PERSONAL_ACCESS_TOKEN')
        self.organization = os.getenv('GITHUB_ORGANIZATION')
        self.repository = os.getenv('GITHUB_REPOSITORY')

        if not self.token:
            raise ValueError("GITHUB_PERSONAL_ACCESS_TOKEN environment variable is required")

        if not self.organization or not self.repository:
            raise ValueError("GITHUB_ORGANIZATION and GITHUB_REPOSITORY environment variables are required")

        # Setup requests session with authentication
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'token {self.token}',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'DevOps-Agent/1.0'
        })

        self.base_url = 'https://api.github.com'
        self.repo_url = f'{self.base_url}/repos/{self.organization}/{self.repository}'

        # Verify authentication on initialization
        self._verify_authentication()

    def _verify_authentication(self) -> None:
        """Verify that the token is valid and has the required permissions"""
        try:
            response = self.session.get(f'{self.base_url}/user')
            response.raise_for_status()
            user_data = response.json()
            self.username = user_data['login']
            print(f"✅ GitHub authentication successful for user: {self.username}")
        except requests.exceptions.RequestException as e:
            if e.response and e.response.status_code == 401:
                raise ValueError("❌ Invalid GitHub token. Please check GITHUB_PERSONAL_ACCESS_TOKEN")
            else:
                raise ValueError(f"❌ Failed to authenticate with GitHub: {e}")

    def verify_repository_access(self) -> Dict[str, Any]:
        """
        Verify access to the configured repository

        Returns:
            Repository information if accessible

        Raises:
            ValueError: If repository is not accessible
        """
        try:
            response = self.session.get(self.repo_url)
            response.raise_for_status()
            repo_data = response.json()

            print(f"✅ Repository access verified: {self.organization}/{self.repository}")
            return repo_data

        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                raise ValueError(f"❌ Repository '{self.organization}/{self.repository}' not found. Check organization and repository names.")
            elif e.response.status_code == 403:
                raise ValueError(f"❌ No access to repository '{self.organization}/{self.repository}'. Check your permissions.")
            else:
                raise ValueError(f"❌ Failed to access repository: {e}")

    def create_issue(self,
                    title: str,
                    body: str,
                    labels: Optional[List[str]] = None,
                    assignees: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Create a new issue in the repository

        Args:
            title: Issue title
            body: Issue description/body
            labels: List of label names
            assignees: List of GitHub usernames to assign

        Returns:
            Created issue data

        Raises:
            ValueError: If issue creation fails
        """
        # Prepare issue data
        issue_data = {
            'title': title,
            'body': body
        }

        if labels:
            issue_data['labels'] = labels

        if assignees:
            issue_data['assignees'] = assignees

        try:
            response = self.session.post(
                f'{self.repo_url}/issues',
                json=issue_data
            )
            response.raise_for_status()
            issue_data = response.json()

            print(f"✅ Issue created successfully!")
            print(f"   Title: {title}")
            print(f"   URL: {issue_data['html_url']}")
            print(f"   Number: #{issue_data['number']}")

            return issue_data

        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 403:
                error_data = e.response.json()
                if 'message' in error_data and 'write' in error_data['message'].lower():
                    raise ValueError(f"❌ Permission denied. Need write access to create issues in {self.organization}/{self.repository}")
                else:
                    raise ValueError(f"❌ No permission to create issues: {error_data.get('message', 'Unknown error')}")
            elif e.response.status_code == 422:
                error_data = e.response.json()
                raise ValueError(f"❌ Issue validation failed: {error_data.get('message', 'Unknown validation error')}")
            else:
                raise ValueError(f"❌ Failed to create issue: {e}")

    def get_issue(self, issue_number: int) -> Dict[str, Any]:
        """Get issue by number"""
        response = self.session.get(f'{self.repo_url}/issues/{issue_number}')
        response.raise_for_status()
        return response.json()

    def list_issues(self, state: str = 'open', labels: Optional[str] = None, limit: int = 30) -> List[Dict[str, Any]]:
        """List repository issues"""
        params = {
            'state': state,
            'per_page': min(limit, 100)
        }
        if labels:
            params['labels'] = labels

        response = self.session.get(f'{self.repo_url}/issues', params=params)
        response.raise_for_status()
        return response.json()

    def close_issue(self, issue_number: int) -> Dict[str, Any]:
        """Close an issue"""
        response = self.session.patch(
            f'{self.repo_url}/issues/{issue_number}',
            json={'state': 'closed'}
        )
        response.raise_for_status()
        return response.json()

    def add_comment(self, issue_number: int, comment: str) -> Dict[str, Any]:
        """Add a comment to an issue"""
        response = self.session.post(
            f'{self.repo_url}/issues/{issue_number}/comments',
            json={'body': comment}
        )
        response.raise_for_status()
        return response.json()


if __name__ == '__main__':
    # Simple test when run directly
    try:
        client = GitHubClient()
        repo_info = client.verify_repository_access()
        print(f"Repository: {repo_info['full_name']}")
        print(f"Description: {repo_info.get('description', 'No description')}")
    except ValueError as e:
        print(e)

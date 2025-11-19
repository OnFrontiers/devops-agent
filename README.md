# Jira Automation Tool - Multi-Repository Ticket Creation Hub

A local Node.js application for creating and managing tickets across multiple OnFrontiers repositories (Engineering, Product Development, Operations Hub) using the Jira REST API.

## Features

- View ticket details
- Update ticket summary and description
- Add comments to tickets
- Search tickets using JQL
- Change ticket status/transitions
- Assign tickets to users
- **Create tickets across multiple project spaces (Engineering, Product Development, Operations Hub)**
- **Automatic space-appropriate defaults and labels**
- Interactive command-line interface

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your Jira credentials:
     ```
     JIRA_BASE_URL=https://your-domain.atlassian.net
     JIRA_EMAIL=your-email@example.com
     JIRA_API_TOKEN=your-api-token
     ```

3. **Get your Jira API token:**
   - Go to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
   - Click "Create API token"
   - Copy the generated token to your `.env` file

## GitHub Repository Setup (For New Users)

If you're setting up this repository from GitHub for the first time:

1. **Install Git** (if not already installed):
   - Download from https://git-scm.com/downloads
   - Follow the installation wizard

2. **Set up SSH keys for GitHub** (recommended):
   ```bash
   # Generate a new SSH key
   ssh-keygen -t ed25519_onfrontiers -C "your-email@example.com"

   # Start the SSH agent
   eval "$(ssh-agent -s)"

   # Add your SSH key to the agent
   ssh-add ~/.ssh/id_ed25519_onfrontiers

   # Copy the public key to add to GitHub
   cat ~/.ssh/id_ed25519_onfrontiers.pub
   ```
   - Go to GitHub.com → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste the public key and save

3. **Clone the repository**:
   ```bash
   git clone git@github.com:onfrontiers/devops-agent.git
   cd devops-agent
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Jira credentials (see Setup section above)
   ```

## Usage

Start the application:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## API Credentials

This tool uses Jira's REST API v3 with basic authentication:
- **Username**: Your Atlassian email address
- **Password**: Your API token (not your actual password)

## Security

- The `.env` file is gitignored to prevent accidentally committing credentials
- Never share your API token or commit it to version control

## Multi-Repository Ticket Creation

### Project Spaces
Create tickets across three main project spaces:

1. **Engineering**: Technical implementation tickets
2. **Product Development**: Product strategy and roadmap tickets
3. **Operations Hub**: Infrastructure, DevOps, and operational improvements

### Automatic Space-Appropriate Defaults
Tickets are automatically configured based on selected space:
- **Labels**: Applied automatically (e.g., "product-development" for Product Development space)
- **Templates**: Agnostic templates work across all spaces
- **Stages**: Defaults to "Definition" stage, with option to specify
- **Assignment**: No default assignee - always confirmed with user

### Quick Scripts
- `node src/create[TicketType].js` - Create tickets with space-appropriate defaults
- `node src/myTickets.js` - View your assigned tickets across all spaces

### Template Storage
Templates are stored in `/templates/` directory:
- `story-template.json` - Based on ENG-4657 structure (Background, Acceptance Criteria, Technical Design)
- `bug-template.json` - Bug reporting template (Description, Environment, Sample Record, Steps to reproduce, Intended Result)

### Available Templates by Issue Type
- **Story/Epic/Task**: Background → Acceptance Criteria → Technical Design
- **Bug**: Description of the bug → Environment questions → Sample Record → Steps to reproduce → Intended Result

## Component selection on ticket creation

When creating tickets, the tool will prompt you to select one or more Jira components for the target project and ask for confirmation.

Interactive
- You will see a numbered list of available components and can select multiple by entering comma-separated numbers.
- A confirmation step shows your selection and requires Y/N to proceed.

Non-interactive and CI
- Provide components by name using one of:
  - --components "Name1,Name2"
  - COMPONENTS="Name1,Name2" (environment variable)
- To skip components explicitly, use:
  - --no-components
  - NO_COMPONENTS=1
- If running in a non-interactive (non-TTY) environment without explicit components or --no-components, the script will fail with a helpful message.

Affected commands/scripts
- Menu: npm start → option "Create cost-optimization ticket"
- node src/jira/product-dev/createProductDevelopmentTicket.js
- node src/jira/product-dev/createTestProductTicket.js
- node src/jira/tickets/createAuthStory.js
- node src/jira/tickets/createServiceAccountTicket.js
- node src/jira/tickets/createSearchImprovementEpic.js

Templates
- templates/epic-template.json now includes "components": [] and "fixVersions": []
- story and bug templates already include "components" and "fixVersions"

Examples
- node src/jira/product-dev/createProductDevelopmentTicket.js --components "Search,Operations Hub"
- COMPONENTS="Search,Operations Hub" node src/jira/tickets/createAuthStory.js
- node src/jira/tickets/createServiceAccountTicket.js --no-components

## Common JQL Examples

- `assignee = currentUser()` - Your assigned tickets
- `status = "In Progress"` - All in-progress tickets
- `project = "PROJ" AND status = Open` - Open tickets in specific project
- `created >= -7d` - Tickets created in the last 7 days
- `project = ENG AND (labels IS EMPTY OR labels NOT IN ("cost-reduction", "product-development"))` - All Engineering tickets
- `labels = "product-development"` - All Product Development tickets
- `project = ENG AND labels = cost-reduction` - All Operations Hub tickets (legacy cost-reduction label)

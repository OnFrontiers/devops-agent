# Jira Automation Rules - Multi-Repository Ticket Creation Hub

## 🎯 Mission Statement

**This repository creates and manages tickets across multiple OnFrontiers repositories.** Agents can create tickets in Engineering, Product Development, or Operations Hub spaces with appropriate defaults and workflows. No more manual ticket creation - use automation tools for consistent, properly categorized tickets.

## 🎯 Project Spaces & Ticket Creation

### Available Project Spaces
When creating tickets, **always ask which space/project the ticket belongs to** and give these 3 options:

1. **Engineering**: `project = ENG AND (labels IS EMPTY OR labels NOT IN ("cost-reduction", "product-development")) ORDER BY Rank ASC`
   - Default project for technical implementation tickets
   - Automatically excludes cost-reduction and product-development labeled tickets

2. **Product Development**: Takes the "product-development" label
   - For product strategy, roadmap, and feature planning tickets
   - Automatically labeled with "product-development"

3. **Operations Hub**: Default space for operations-related tickets
   - For infrastructure, DevOps, and operational improvements
   - Previously known as "cost-optimization" space

### Ticket Creation Rules
- **Space Selection**: Always prompt user to choose from the 3 project spaces above
- **Stage Selection**: Ask user which stage the ticket should be created in (defaults to "Definition")
- **User Assignment**: No default assignee - always double-check with user before assigning. Don't assign everything to Enio - it's fine to add as reporter, but leave assignee unassigned unless explicitly requested
- **Hyperlinks**: When adding URLs in Jira descriptions, use proper hyperlink format instead of plain text
- **Templates**: Use agnostic templates that work across all spaces (no hardcoded labels)
- **Labels**: Apply space-appropriate labels automatically based on selection

## 📋 Core Workflow Patterns

### /analyze-codebase-to-jira-sync
Execute: `cline "analyze operations-hub code patterns → create/update sync script"`
Purpose: Convert code analysis findings into automated Jira updates
**TRIGGER**: When code analysis reveals requirements or implementation that doesn't match Jira

### /update-eng-ticket-with-code-facts
Execute: `node src/updateENGxxxxTechSpec.js` (custom script per ticket)
Purpose: Update Jira Technical Design/Acceptance Criteria with actual implementation
**TRIGGER**: When analyzing operations-hub reveals different technical approach than specified

### /status-transition-based-on-implementation
Execute: `node src/checkENG4757.js` (ticket verification)
Purpose: Transition status when operations-hub implementation reaches milestones
**TRIGGER**: After completing features in operations-hub

## 🔍 Code Analysis → Jira Update Patterns

### Background Section Updates
**WHEN**: Code analysis reveals different operational context than Jira description
```bash
# 1. Analyze operations-hub code
cline "analyze how [feature] actually works in operations-hub"

# 2. Update Jira Background with factual findings
node src/updateENG4757BackgroundAndCriteria.js
```

### Technical Design Updates
**WHEN**: Actual implementation differs from designed approach
```bash
# 1. Extract implementation patterns
cline "extract technical design patterns from operations-hub [file/function]"

# 2. Update Jira Technical Design section
node src/updateENG4757TechDesign.js
```

### Acceptance Criteria Validation
**WHEN**: Feature completion doesn't match acceptance criteria
```bash
# 1. Verify actual implementation meets criteria
cline "verify if operations-hub implementation meets acceptance criteria"

# 2. Update criteria to match reality OR fix implementation
node src/updateENG4757TechSpec.js
```

## 🛠️ Jira Automation Tool Integration

### Using the Jira Tools

#### Environment Setup (CRITICAL)
**ALWAYS load environment first:**
```bash
# Copy template and set variables
cp .env.example .env
# Edit .env with:
# JIRA_BASE_URL=https://onfrontiers.atlassian.net
# JIRA_EMAIL=your-email@onfrontiers.com
# JIRA_API_TOKEN=your-api-token
```

#### Development Mode (Local Testing)
```bash
# Start interactive CLI for testing
npm run dev

# Choose option 1: "Test ENG-4757 updates"
# Only commit changes after local verification
```

### Ticket Update Scripts (ENG-4xxx Pattern)

**FOR ENG-4757 Specifically:**
```bash
# Update Background based on operations-hub analysis
node src/updateENG4757BackgroundAndCriteria.js

# Update Technical Design with implementation facts
node src/updateENG4757TechDesign.js

# Update Acceptance Criteria validation
node src/updateENG4690TechSpec.js  # (use similar pattern)
```

### Story Point Assignment (Based on Code Complexity)
```bash
# Analyze complexity in operations-hub
cline "estimate story points based on operations-hub [feature] complexity"

# Use automation to set points
node src/addStoryPointsToTicket.js
```

## 📝 Implementation Discovery Workflows

### 1. Initial Code Analysis → Ticket Creation
```bash
# 1. Analyze operations-hub to discover what needs to be done
cline "scan operations-hub codebase for [pattern/feature] implementation"

# 2. Create ticket reflecting actual work needed
node src/create[TicketType].js

# 3. Populate with real requirements from code
node src/updateENG4757BackgroundAndCriteria.js
```

### 2. Ongoing Implementation → Ticket Updates
**TRIGGER**: Every time operations-hub implementation changes
```bash
# 1. Commit code changes first
git add . && git commit -m "feat: implement [feature]"

# 2. Update Jira with new implementation details
node src/updateENG4757TechDesign.js

# 3. Check if acceptance criteria now apply
node src/checkENG4757.js
```

### 3. Completion Validation → Status Transitions
```bash
# 1. Verify implementation against operations-hub
cline "verify ENG-4757 implementation is complete in operations-hub"

# 2. Transition status if ready
# Use either CLI or automated script
node src/transitionENG4757ToNextStatus.js
```

## 🏗️ Common ENG-4757 Operations-Hub Integration Points

### Database Schema Discoveries
**WHEN**: Analyzing operations-hub reveals different table structures than specified
```bash
# Check actual schema patterns
cline "analyze database operations in operations-hub"

# Update Jira with accurate schema requirements
node src/updateENG4757TechSpec.js
```

### API Endpoint Changes
**WHEN**: operations-hub API endpoints differ from Jira specifications
```bash
# Analyze actual API implementation
cline "extract API contracts from operations-hub"

# Sync Jira specifications
node src/updateENG4757BackgroundAndCriteria.js
```

### Error Handling Requirements
**WHEN**: Exception patterns in operations-hub reveal missing requirements
```bash
# Analyze error handling patterns
cline "analyze error handling in operations-hub [component]"

# Update acceptance criteria
node src/updateENG4757TechSpec.js
```

## 🎨 ACT MODE Execution Rules (Specific to Jira Operations)

### Within Multi-Repository Context:
1. ✅ **FIRST**: Always ask which project space (Engineering/Product Development/Operations Hub) the ticket belongs to
2. ✅ **THEN**: Use appropriate templates and labels based on space selection
3. ✅ **VERIFY**: Local testing before committing Jira changes
4. ✅ **DOCUMENT**: Major findings in session memory (if structural)

### NEVER in Jira Operations:
1. ❌ **GUESS**: Requirements based on assumptions vs actual code
2. ❌ **STALE SPECS**: Keep Jira specs that don't match implementation
3. ❌ **MANUAL UPDATES**: Update Jira manually when automation exists
4. ❌ **OUTDATED CRITERIA**: Acceptance criteria not grounded in code reality
5. ❌ **DEFAULT ASSIGNMENT**: Never assign tickets without explicit user confirmation

## 📋 Completion Checklist (After Each Jira Operation)

**EVERY Jira update must complete:**
1. ✅ **Code Analysis Complete** - Understand operations-hub reality
2. ✅ **Jira Updates Applied** - Specs match implementation
3. ✅ **Local Testing** - Verify Jira CLI changes work
4. ✅ **Git Commit Ready** - Jira automation changes committed
5. ✅ **Operations-Hub Aligned** - No spec/implementation disconnect

## 🔗 Integration With Operations-Hub Workflows

### Adapting Operations-Hub Memory Patterns for Jira
- **Session Docs**: Create when ticket updates reveal fundamental architecture changes
- **Workflow Execution**: Use `/analyze-codebase-to-jira-sync` for major spec misalignment
- **Context Preservation**: Store findings in `memory/sessions/YYYY-MM-DD/jira-updates/` for continuity

### VPN/Database Operations (When Needed)
```bash
# For AWS operations required by operations-hub analysis
export AWS_PROFILE=prod_access && aws [command]

# Direct database checks (when verifying operations-hub requirements)
/Applications/Postgres.app/Contents/Versions/latest/bin/psql \
  "$CACHE_DATABASE_URL" \
  -c "SELECT * FROM [table] LIMIT 5;"
```

## 🚀 ENG-4757 Specific Guidance

### Current Focus Areas (Based on Operations-Hub Analysis)
- **Background**: Discover real operational context from codebase
- **Technical Design**: Extract actual implementation approaches
- **Acceptance Criteria**: Validate against what's actually built/being built
- **Story Points**: Estimate based on code complexity analysis

### Automation Scripts to Use
1. `updateENG4757BackgroundAndCriteria.js` - Update with code-based facts
2. `updateENG4757TechDesign.js` - Sync with implementation patterns
3. `checkENG4757.js` - Validate completion status
4. Story point automation scripts - Set based on complexity

### Integration Points with Operations-Hub Development
- **Before Starting**: Use `cline "analyze current ENG-4757 state"` to understand codebase
- **During Development**: Run sync scripts after feature completion
- **After Completion**: Use status transition automation to move ticket forward

## ⚠️ Critical Gotchas (Read Before Every Jira Operation)

1. **CLI Testing**: ALWAYS test Jira CLI locally before committed changes
2. **Environment Variables**: ALWAYS verify `.env` has correct Jira credentials
3. **Operations-Hub First**: Analyze code FIRST, then update Jira specs
4. **Story Points**: Base on actual code complexity, not original estimates
5. **Status Transitions**: Only transition based on real implementation completion
6. **Full Command Paths**: ALWAYS use full paths for CLI tools:
   - **GitHub CLI**: `/opt/homebrew/bin/gh`
   - **Node.js**: `/usr/local/bin/node`
   - **AWS CLI**: `/usr/local/bin/aws`
7. **Shell Isolation**: Environment variables don't persist between commands

## 🏃 Quick Commands Reference

```bash
# Setup (first time)
cp .env.example .env && [edit credentials]

# Local development/testing
npm run dev

# Update ENG-4757 sections
node src/updateENG4757BackgroundAndCriteria.js
node src/updateENG4757TechDesign.js

# Check ticket status
node src/checkENG4757.js

# Story points based on code analysis
node src/addStoryPointsToTicket.js

## Claude Flow Setup for Repository Template

This repository is configured as a Claude Flow template for multi-agent automation. The template includes swarm coordination, hive-mind agents, and SPARC methodology workflows designed for team distribution.

### Installation for Others

When cloning this repository:

```bash
git clone https://github.com/OnFrontiers/devops-agent.git
cd devops-agent
npm install        # Automatically installs claude-flow
```

The `npm install` command installs `claude-flow` as a dev dependency. No separate installation needed.

### What's Included

Core configuration files (tracked in git):
- `.claude/settings.json` - Claude Code configuration with hooks, permissions, memory namespaces
- `.claude/agents/` - 30+ agent definitions organized by function (core, swarm, hive-mind, sparc, templates)
- `.claude/commands/` - 45+ slash commands for multi-agent workflows (/swarm, /sparc, /hive-mind, /coordination)
- `.claude/skills/` - Reusable workflow skills (swarm-orchestration, hive-mind-advanced, flow-nexus-swarm)
- `.claude/helpers/` - Utility scripts for setup and checkpoint management
- `.swarm/` - Swarm orchestration runtime state
- `.hive-mind/` - Hive-mind coordination runtime state

Local-only files (not tracked):
- `.claude/settings.local.json` - Local configuration overrides
- `.claude/checkpoints/` - Session checkpoints
- `memory/` - Session memory and execution logs

### Configuration Details

Memory namespaces configured:
- `aws-usage` - AWS CLI commands and SSO patterns
- `npm-node` - Node.js and npm patterns
- `database` - PostgreSQL and connection patterns
- `common-mistakes` - Recurring errors and solutions
- `project-context` - DevOps agent specifics

Pre/post tool hooks enabled for:
- Command validation and resource preparation
- File editing with agent assignment and context loading
- Result tracking and memory updates on completion

### Available Commands

In Claude Code, use slash commands for multi-agent workflows:

- `/swarm` - View swarm modes and status
- `/swarm-spawn` - Launch parallel agent swarms (up to 8 concurrent)
- `/sparc` - SPARC methodology workflows
- `/hive-mind` - Hive-mind multi-agent coordination
- `/swarm-init` - Initialize swarm topology
- Additional commands in `.claude/commands/` subdirectories

### npm Scripts

```bash
npm run sparc              # View SPARC modes
npm run sparc:run          # Run standard SPARC flow
npm run sparc:tdd          # Test-driven development mode
npm run sparc:pipeline     # Full pipeline with all steps
npm run claude-flow        # Reinitialize Claude Flow topology
```

### For Team Distribution

When sharing this template with others:
1. Document any custom agents added to `.claude/agents/custom/`
2. Document any new commands in `.claude/commands/custom/`
3. Update memory namespaces in `.claude/settings.json` as needed
4. Test locally before committing: all files in `.claude/`, `.swarm/`, `.hive-mind/` are versioned

### Customization

To add new capabilities:
- Agents: Create `.md` files in `.claude/agents/` with agent definition format
- Commands: Create `.md` files in `.claude/commands/` for slash command workflows
- Skills: Create directories in `.claude/skills/` for reusable workflows
- After adding: Restart Claude Code for auto-discovery

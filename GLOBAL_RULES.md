# OnFrontiers Global Rules (Organization Baseline)

**Version**: 1.0.0
**Maintained by**: DevOps Team
**Last Updated**: November 2025
**Applies to**: All OnFrontiers repositories

---

## 📋 Overview

This file defines organization-wide standards, guidelines, and best practices for all OnFrontiers projects. It serves as the single source of truth for:
- Operating principles and modes
- Terminal safety and security
- Development workflow standards
- Tool integration (Claude Code, Cline, claude-flow)
- Repository structure conventions

**Key Principle**: These rules apply to ALL projects. Project-specific rules (in `CLAUDE.md` or `.clinerules/default-rules.md`) take precedence for conflicts.

---

## 🎯 Operating Modes

### PLAN MODE
- Gather information and propose steps
- Ask clarifying questions
- Confirm scope and approach
- Identify risks and verification methods
- **NO edits or actions**

### ACT MODE
- Implement exactly as planned
- Make small, atomic changes
- Verify each step
- Report outputs and results
- Follow all safety rules

---

## 🔒 Core Operating Principles

### 1. Explain Before You Act
**Rule**: Summarize your plan before executing
- What will be changed
- Why these changes are needed
- Risks and mitigations
- How to verify success

### 2. Safety First
- ✅ **Always use absolute paths** in terminal (no relative `node`, `aws`, etc.)
- ✅ **Treat each command as isolated** - don't rely on exports persisting
- ✅ **Never hardcode secrets** - use environment variables only
- ✅ **Require explicit approval** for destructive operations
- ✅ **Use full paths** for binaries:
  - Node: `/usr/local/bin/node`
  - AWS CLI: `/usr/local/bin/aws` or `/opt/homebrew/bin/aws`
  - PostgreSQL: `/Applications/Postgres.app/Contents/Versions/latest/bin/psql`

### 3. User Control
- ❌ **DO NOT auto-run applications** for users
- ✅ **Provide commands in text** for users to run locally
- ✅ **Let users test** in their own environment
- ✅ **Report results** without executing tests automatically

---

## 🚀 Claude Flow (Company Standard)

### SPARC Methodology
All complex work follows SPARC phases:

1. **Specification** - Requirements and acceptance criteria
2. **Pseudocode** - Algorithm and logic design
3. **Architecture** - System design and components
4. **Refinement** - TDD implementation with tests
5. **Completion** - Integration and validation

### Core Commands

```bash
# List available modes
npx claude-flow sparc modes

# Run specific mode
npx claude-flow sparc run <mode> "<task>"

# Full TDD workflow
npx claude-flow sparc tdd "<feature>"

# Pipeline execution
npx claude-flow sparc pipeline "<task>"

# Batch processing
npx claude-flow sparc batch <modes> "<task>"
```

### When to Use SPARC
- Complex features with multiple layers
- Cross-team implementations
- Performance-critical code
- Security-sensitive changes
- Multi-file refactoring

---

## 📚 Knowledge Base Hierarchy

**Precedence Order** (highest to lowest):

### 1. Repository-Local Rules (Authoritative)
- **File**: `CLAUDE.md` or `.clinerules/default-rules.md`
- **Scope**: This project only
- **Override**: Takes precedence over global rules
- **Updated**: By project maintainers

### 2. Project-Local Workflows
- **Location**: `.claude/commands/workflows/*.md` (Claude Code)
- **Location**: `.clinerules/workflows/*.md` (Cline)
- **Scope**: Project-specific procedures
- **Override**: Specific implementations of global principles

### 3. Deep Technical References
- **Location**: `memory/patterns/*.md`
- **Scope**: Technical patterns, implementation details
- **Use**: When needing specific technical guidance
- **Updated**: As patterns are discovered

### 4. Project Documentation
- **Location**: `docs/**`, `README.md`, architecture docs
- **Scope**: Project context, system design
- **Use**: Understanding project architecture
- **Reference**: Supporting documentation only

### 5. Global Baseline (This File)
- **Location**: `../onfrontiers/devops-agent/GLOBAL_RULES.md` or direct path
- **Scope**: Organization-wide standards
- **Use**: When local rules don't specify
- **Updated**: By DevOps team

---

## 🛠️ Terminal Rules (Always Apply)

### Absolute Paths (CRITICAL)

**❌ WRONG** - Will fail in Cline/Claude Code terminals
```bash
node scripts/script.js
aws --profile prod_access rds describe-db-instances
```

**✅ CORRECT** - Always use full paths
```bash
/usr/local/bin/node scripts/script.js
/usr/local/bin/aws --profile prod_access --region us-west-2 rds describe-db-instances
```

### Shell Session Isolation (CRITICAL)

**❌ WRONG** - Exports don't persist between commands
```bash
# Message 1:
export AWS_PROFILE=prod_access

# Message 2:
aws rds describe-db-instances  # ❌ AWS_PROFILE is lost!
```

**✅ CORRECT** - Chain with && or pass flags
```bash
# Option 1: Chain in one command
AWS_PROFILE=prod_access /usr/local/bin/aws --region us-west-2 rds describe-db-instances

# Option 2: Pass flags directly
/usr/local/bin/aws --profile prod_access --region us-west-2 rds describe-db-instances
```

### Secrets Management

**❌ NEVER**
```javascript
const apiKey = "sk-1234567890";  // ❌ Hardcoded
const dbUrl = "postgres://user:password@host/db";  // ❌ Hardcoded
```

**✅ ALWAYS**
```javascript
const apiKey = process.env.OPENAI_API_KEY;  // ✅ Environment variable
const dbUrl = process.env.DATABASE_URL;     // ✅ Environment variable
```

---

## 📋 Standard Task Pattern

Follow this pattern for every task:

### 1. Read Local Rules First
```
Read: {repo}/CLAUDE.md or .clinerules/default-rules.md
Read: Relevant {repo}/.claude/commands/workflows/*.md files
```

### 2. PLAN MODE (Propose)
- What needs to be done
- How it will be done
- Where changes will occur
- How to verify success
- Risks and mitigations

### 3. ACT MODE (Execute)
- Make small, atomic changes
- Verify each step independently
- Report outputs and logs
- Don't assume success

### 4. Verify & Report
- Run verification commands
- Check logs and error messages
- Summarize what was accomplished
- Suggest commit/PR text

---

## 📝 Commit & PR Standards

### Commit Message Format
```
type: brief summary (50 chars max)

Longer description explaining the why.
```

### Commit Types
- `feature:` - New functionality
- `fix:` - Bug fixes
- `chore:` - Maintenance, dependencies, config
- `docs:` - Documentation changes
- `refactor:` - Code restructuring without functionality change
- `test:` - Adding/updating tests

### Example Commits
```
feature: add James manager view
fix: normalize PhantomBuster webhook status parsing
docs: update CLAUDE.md with global rules reference
chore: upgrade Node dependencies to v18.x
```

### PR Standards
- **Title**: Same format as commit message
- **Body**: Concise bullets explaining changes
- **Include**: Testing performed, deployment notes
- **Link**: Related issues or PRs

---

## 🔐 Security Considerations

### Database Connections
- ✅ Always use SSL: `sslmode=require`
- ✅ Use connection pooling
- ✅ Close connections in `finally` blocks
- ✅ Use prepared statements (prevent SQL injection)

### API Keys and Tokens
- ✅ Store in `.env` (git-ignored)
- ✅ Never commit secrets to git
- ✅ Rotate regularly
- ✅ Use AWS Secrets Manager for production

### Code Execution
- ✅ Validate user inputs
- ✅ Use input sanitization
- ✅ Principle of least privilege
- ✅ Audit sensitive operations

---

## 🏗️ Repository Structure Conventions

All OnFrontiers repositories should follow this structure:

```
project-name/
├── CLAUDE.md                    # Project-specific rules (references global rules)
├── .claude/                     # Claude Code configuration
│   ├── commands/                # Custom slash commands
│   │   └── workflows/           # Project workflows
│   ├── agents/                  # Custom agents
│   ├── settings.json            # Shared settings
│   └── settings.local.json      # User-specific settings
├── .clinerules/                 # Cline configuration (optional)
│   └── default-rules.md         # (Deprecated - use CLAUDE.md)
├── memory/                      # Documentation directory
│   ├── patterns/                # Technical patterns & best practices
│   ├── sessions/                # Session documentation
│   └── agents/shared/           # Shared agent resources
├── src/                         # Source code
├── tests/                       # Test files
├── docs/                        # Project documentation
├── scripts/                     # Utility scripts
└── README.md                    # Project overview
```

---

## 🔄 Multi-Repository Setup

### Recommended Directory Structure
```
~/Projects/
├── onfrontiers/                         # Organization namespace
│   ├── devops-agent/                    # This repo - shared rules & scripts
│   │   ├── GLOBAL_RULES.md              # Global rules (this file)
│   │   ├── scripts/                     # Bootstrap and setup scripts
│   │   └── README.md
│   ├── operations-hub/                  # Working repo 1
│   ├── consultations/                   # Working repo 2
│   └── contacts/                        # Working repo 3
└── [other-namespaces]/
```

### Setup for Team Members

1. **Clone devops-agent first**
   ```bash
   cd ~/Projects
   mkdir -p onfrontiers
   cd onfrontiers
   git clone https://github.com/onfrontiers/devops-agent.git
   cd devops-agent
   ```

2. **Run bootstrap script** (sets up environment)
   ```bash
   bash scripts/bootstrap-global-rules.sh
   ```

3. **Clone project repositories**
   ```bash
   cd ..
   git clone https://github.com/onfrontiers/operations-hub.git
   git clone https://github.com/onfrontiers/consultations.git
   git clone https://github.com/onfrontiers/contacts.git
   ```

---

## 🚀 Integration with Development Tools

### Claude Code Integration
1. Each project's `CLAUDE.md` references this file
2. Claude Code reads `CLAUDE.md` at startup
3. Project-specific rules override global rules
4. Workflows in `.claude/commands/workflows/` follow global patterns

### Cline Integration
1. Cline reads `CLAUDE.md` as workspace rules
2. Falls back to `~/.cline/cline_rules.md` if not found
3. Global rules available at `../devops-agent/GLOBAL_RULES.md`

### claude-flow Integration
1. SPARC methodology available via `npx claude-flow sparc`
2. Hooks configuration in project's `.claude/settings.json`
3. Memory management via claude-flow tools

---

## 📋 Checklist for New Projects

When creating a new OnFrontiers project:

- [ ] Create `CLAUDE.md` with reference to `../devops-agent/GLOBAL_RULES.md`
- [ ] Initialize `.claude/` directory with `settings.json`
- [ ] Create `memory/patterns/` for technical documentation
- [ ] Create `.claude/commands/workflows/` for project workflows
- [ ] Set up proper `.gitignore` (exclude `.env`, node_modules, etc.)
- [ ] Document project-specific setup in README.md
- [ ] Add bootstrap step to devops-agent setup script

---

## 🔄 How to Update Global Rules

### Process
1. **Propose change** in a PR against `devops-agent`
2. **Review by DevOps team** for organization-wide impact
3. **Merge to main** (applies to all projects)
4. **Notify teams** of updates

### What to Include
- Clear rationale for the change
- Examples of new/updated practices
- Impact on existing projects
- Migration steps if breaking changes

### Deprecation Policy
- Major changes should have a deprecation period
- Old rules stay with deprecation notices
- 2-week notice before complete removal
- Projects get 1-month to adopt new standards

---

## 🎯 Success Metrics

- ✅ All developers follow PLAN → ACT → VERIFY pattern
- ✅ Zero hardcoded secrets in repositories
- ✅ All projects reference global rules
- ✅ Consistent project structure across organization
- ✅ Terminal commands use absolute paths
- ✅ Commits follow type format
- ✅ PRs include testing and verification

---

## 📞 Support & Questions

- **General questions**: Ask in `#devops` Slack channel
- **Global rules updates**: Create PR against `devops-agent`
- **Project-specific issues**: Refer to project's `CLAUDE.md`
- **Claude Code/Cline issues**: Check tool-specific documentation

---

## 📜 Changelog

### v1.0.0 (November 2025)
- Initial global rules document
- Added repository interaction guide
- Added bootstrap script documentation
- Added integration details for Claude Code and Cline

---

**This is the authoritative source for OnFrontiers development standards.**

---

*Last Updated: November 19, 2025*
*Maintained by: DevOps Team*
*Questions? Check project CLAUDE.md or contact DevOps*

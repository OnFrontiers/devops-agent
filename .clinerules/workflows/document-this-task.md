# Document This Task - Session Documentation Workflow

## Workflow Overview
**Purpose**: Standardize session documentation across the devops-agent repository
**Trigger**: After completing any significant task or session
**Location**: `memory/sessions/YYYY-MM-DD/task-description.md`
**Pattern**: Follow operations-hub session documentation format

## Documentation Requirements

### Required Sections (All Sessions)
1. **Session Overview**
   - Date: YYYY-MM-DD format
   - Task/Phase: Brief description of what was accomplished
   - Goal: What you set out to achieve
   - Repository Context: Current state and constraints

2. **Problem/Current State Analysis**
   - What was the starting situation?
   - What problems needed to be solved?
   - What constraints or requirements existed?

3. **Solution/Changes Made**
   - What approach was taken?
   - What specific changes were implemented?
   - What files were modified/created/deleted?

4. **Execution Details**
   - Step-by-step actions taken
   - Commands executed (with full paths)
   - Any challenges encountered and how resolved

5. **Results & Verification**
   - What was accomplished?
   - How was success verified?
   - Any testing or validation performed?

6. **Next Steps & Future Considerations**
   - What remains to be done?
   - Any follow-up tasks identified?
   - Lessons learned for future sessions

## File Naming Convention
`memory/sessions/YYYY-MM-DD/descriptive-task-name.md`

### Examples
- `2025-11-05/jira-operations-hub-migration.md`
- `2025-11-05/github-repository-setup.md`
- `2025-11-05/template-agnostic-updates.md`

## Quality Standards

### Content Requirements
- **Technical Accuracy**: Include actual commands, file paths, error messages
- **Decision Rationale**: Explain why certain approaches were chosen
- **Problem-Solution Mapping**: Connect problems identified to solutions implemented
- **Actionable Details**: Enough detail for another developer to understand/replicate

### Structure Requirements
- **Markdown Formatting**: Use proper headers, code blocks, lists
- **Logical Flow**: Problem → Analysis → Solution → Results → Next Steps
- **Scannable**: Use bullet points, bold key terms, code snippets
- **Complete**: No TODO items or unfinished thoughts

## Integration Points

### With Repository Structure
- Reference `memory/agents/patterns/` for technical guidelines
- Store in `memory/sessions/` for chronological task history
- Link to `.clinerules/` workflows when relevant

### With Git Workflow
- Document sessions after commits, not before
- Reference commit hashes when relevant
- Note any git operations performed (rebases, merges, etc.)

## Automation Triggers

### When to Document
- ✅ **After major refactoring** (file reorganization, architecture changes)
- ✅ **After completing user-requested features** (new functionality, bug fixes)
- ✅ **After infrastructure setup** (new tools, environment configuration)
- ✅ **After debugging sessions** (complex issues resolved)
- ✅ **Before long breaks** (document current state for resumption)

### When NOT to Document
- ❌ **Minor edits** (typo fixes, formatting changes)
- ❌ **Failed attempts** (unless they teach important lessons)
- ❌ **Routine maintenance** (dependency updates, minor config changes)
- ❌ **Unfinished work** (document only completed sessions)

## Template Structure

```markdown
# [Repository] - [Task Description]

## Session Overview
**Date**: YYYY-MM-DD
**Task/Phase**: [Brief description]
**Goal**: [What you set out to achieve]
**Repository Context**: [Current state and constraints]

## Current Problem
- [Problem analysis]
- [Constraints identified]
- [Requirements]

## Solution Implemented
- [Approach taken]
- [Changes made]
- [Files affected]

## Execution Details
1. [Step 1 with commands]
2. [Step 2 with commands]
3. [Challenges and resolutions]

## Results & Verification
- [What was accomplished]
- [Verification methods]
- [Testing performed]

## Next Steps & Future Considerations
- [Remaining work]
- [Follow-up tasks]
- [Lessons learned]

## Notes for Future Developers
- [Important context]
- [Gotchas to avoid]
- [Related files/links]
```

## Quality Checklist (Before Committing)

- [ ] Date and title are accurate
- [ ] All required sections completed
- [ ] Commands include full paths
- [ ] File paths are correct and current
- [ ] Technical details are accurate
- [ ] Document explains both what and why
- [ ] Next steps are clearly identified
- [ ] No TODO items remain
- [ ] Markdown formatting is clean

## Related Workflows
- See `memory/agents/patterns/` for technical implementation guidelines
- Reference `.clinerules/default-rules.md` for repository standards
- Check `memory/sessions/` for examples of completed documentation

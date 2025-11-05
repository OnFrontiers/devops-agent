# DevOps Agent - Src Folder Reorganization (Phase 1)

## Session Overview
**Date**: 2025-10-30
**Phase**: Phase 1 - JavaScript Structure Reorganization
**Goal**: Transform messy 47+ file src folder into organized Jira/GitHub platform structure
**Repository Context**: Single-user repository - can be aggressive with changes

## Current Problem
- **47 JavaScript files** all dumped at src/ root level
- **No organizational structure** - impossible to navigate or understand
- **Domain mixing** - Jira scripts mixed with different business domains
- **No GitHub automation** yet, but structure planned for future

## Target Structure After Phase 1
```
src/
├── jira/                      # All Jira automation scripts (~47 current scripts)
│   ├── core/                  # Core infrastructure: jiraClient.js, index.js
│   ├── tickets/              # Core ticket operations: create*, update*, check*, delete*
│   ├── cost-optimization/    # Cost-related: createCostOptimization, myCostOptimization, etc.
│   ├── product-dev/         # Product dev: createProductDevelopmentTicket, createTestProductTicket
│   ├── aws/                  # AWS-specific: addAWSAPINote, addAWSNetworkNote, shortenAWSNote
│   ├── zoom/                 # Zoom tools: addZoomLabel, cleanZoomTicket, createZoomOptimization
│   ├── recruitment/          # Expert recruiting: createExpertRecruitingEpic
│   ├── integrations/         # External integrations:
│   │   ├── notion/          # createNotionStory
│   │   ├── phantombuster/   # createPhantombusterEpic, fixPhantombusterTicket
│   │   └── sentry/          # createSentryStory
│   └── migration/            # Migration scripts: createMigrationCloseoutEpic
└── github/                   # Future GitHub automation (structure only)
    ├── core/                 # Future githubClient.js structure
    ├── repos/                # Repository management scripts
    ├── issues/               # Issue/PR automation scripts
    └── workflows/            # GitHub Actions workflow scripts
```

## Current File Inventory (src/)

### Core Infrastructure
- jiraClient.js (main Jira API client)
- index.js (CLI interactive menu)

### Ticket Creation Scripts
createAuthStory.js, createCostOptimization.js, createDisassociateTask.js, createERFunnelSearchSubtask.js,
createExpertRecruitingEpic.js, createMigrationCloseoutEpic.js, createNotionStory.js, createOpsHubLaunchEpic.js,
createPhantombusterEpic.js, createProductDevelopmentTicket.js, createSentryStory.js,
createTableViewChartsSubtask.js, createTestCostReductionTicket.js, createTestProductTicket.js,
createZoomOptimization.js

### Ticket Update Scripts
updateCostOptimizationTickets.js, updateENG4664.js, updateENG4664TechDesign.js,
updateENG4689BackgroundAndCriteria.js, updateENG4689TechDesign.js, updateENG4690TechSpec.js,
updateENG4757References.js, updateENG4757TechSpec.js, updateENG4760Implementation.js,
updateENG4761HubspotSync.js, updateENG4762ChartsSpec.js, updateENG4763Overview.js,
updateGate1Ticket.js, updateSpecificTickets.js, updateZoomTicket.js

### Ticket Management Scripts
addStoryPointsToTicket.js, addZoomLabel.js, checkENG4689.js, checkMyDueTickets.js,
checkOriginalENG4690.js, checkSep15Tickets.js, cleanENG4757Epic.js, cleanZoomTicket.js,
convertENG4757ToEpic.js, deleteSpecificTicket.js, deleteTestTicket.js, fixPhantombusterTicket.js,
linkToEpics.js, restoreCEOScope.js, revertCostOptimizationTickets.js

### Utility Scripts
findStoryPointsField.js, getTicketTemplate.js, queryCostReduction.js, shortenAWSNote.js,
testTicket.js

### AWS-Specific Scripts
addAWSAPINote.js, addAWSNetworkNote.js, shortenAWSNote.js

## Migration Execution Strategy

### Phase 1A: Create Directory Structure
Create all target directories using bash commands

### Phase 1B: Move Files in Dependency Order
1. **Move core infrastructure first** (jiraClient.js, index.js) - these are imported by others
2. **Move domain scripts next** - group by business domain to avoid import conflicts
3. **Move utility scripts last** - fewer dependencies

### Phase 1C: Update Import Paths
After moving files, update relative import statements in each moved file:
```javascript
// Before: import JiraClient from './jiraClient.js';
// After:  import JiraClient from '../core/jiraClient.js';
```

### Phase 1D: Cross-File Import Updates
Update imports in files that reference moved scripts:
- package.json scripts (if any reference src/ files)
- Any scripts that import other scripts

### Phase 1E: Verification & Testing
- Run key scripts to verify they still work after moves
- Check `npm run dev` still launches interactive menu
- Verify a ticket creation script runs successfully

### Phase 1F: Cleanup
- Remove old root-level scripts after verification
- Update any documentation referencing old paths

## Dependencies & Import Analysis
- **jiraClient.js**: Imported by ~45+ scripts as `./jiraClient.js`
- **index.js**: Imports jiraClient and myCostOptimization
- **myCostOptimization.js**: Imports jiraClient, exported by index.js
- Most scripts are standalone or only import jiraClient

## Risk Assessment
- **High Risk**: Import path updates - relative paths will break if not updated
- **Medium Risk**: Interactive menu functionality - need to verify after moves
- **Low Risk**: Script functionality - each script tests its own operations

## Success Criteria
- [ ] All target directories created
- [ ] All 47+ files moved to correct domain folders
- [ ] All import paths updated to new relative locations
- [ ] `npm run dev` still launches interactive menu
- [ ] At least 3 sample scripts (create, update, check) work correctly
- [ ] Original root-level src/ files deleted
- [ ] Git status shows clean reorganization commit

## Next Phases (Future Sessions)
- **Phase 2**: Create GitHub automation structure and sample scripts
- **Phase 3**: Python migration assessment and pilot
- **Phase 4**: Full Python migration execution

## Notes for Future Developers
- This is single-user repository, aggressive changes allowed
- No breaking changes to Jira automation during restructure
- Structure designed for easy Python migration later
- Domain grouping based on business logic, not technical similarity

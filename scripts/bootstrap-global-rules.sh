#!/bin/bash

# OnFrontiers Bootstrap Script - Global Rules Setup
# Purpose: Set up global rules and working directory structure for new developers
# Usage: bash scripts/bootstrap-global-rules.sh
# Version: 1.0.0

set -e

echo "🚀 OnFrontiers Bootstrap - Global Rules Setup"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current directory (should be devops-agent root)
DEVOPS_AGENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PARENT_DIR="$(dirname "$DEVOPS_AGENT_DIR")"

echo -e "${BLUE}Current Location:${NC} $DEVOPS_AGENT_DIR"
echo -e "${BLUE}Parent Directory:${NC} $PARENT_DIR"
echo ""

# Step 1: Verify GLOBAL_RULES.md exists
echo -e "${YELLOW}Step 1: Verifying GLOBAL_RULES.md...${NC}"
if [ -f "$DEVOPS_AGENT_DIR/GLOBAL_RULES.md" ]; then
    echo -e "${GREEN}✓${NC} GLOBAL_RULES.md found"
else
    echo -e "${YELLOW}✗${NC} GLOBAL_RULES.md not found in $DEVOPS_AGENT_DIR"
    exit 1
fi
echo ""

# Step 2: Check for existing project repositories
echo -e "${YELLOW}Step 2: Scanning for OnFrontiers project repositories...${NC}"
PROJECTS=()

# Look for common project directories
for dir in "$PARENT_DIR"/*; do
    if [ -d "$dir" ] && [ "$dir" != "$DEVOPS_AGENT_DIR" ]; then
        REPO_NAME=$(basename "$dir")

        # Check if it's a git repo with CLAUDE.md
        if [ -f "$dir/.git/config" ] && [ -f "$dir/CLAUDE.md" ]; then
            PROJECTS+=("$REPO_NAME")
            echo -e "${GREEN}✓${NC} Found project: $REPO_NAME"
        fi
    fi
done

if [ ${#PROJECTS[@]} -eq 0 ]; then
    echo -e "${YELLOW}ℹ${NC} No project repositories found yet. You can clone them later."
else
    echo -e "${GREEN}✓${NC} Found ${#PROJECTS[@]} project repository/repositories"
fi
echo ""

# Step 3: Verify project references to global rules
if [ ${#PROJECTS[@]} -gt 0 ]; then
    echo -e "${YELLOW}Step 3: Verifying project references to global rules...${NC}"

    for project in "${PROJECTS[@]}"; do
        PROJECT_DIR="$PARENT_DIR/$project"
        CLAUDE_MD="$PROJECT_DIR/CLAUDE.md"

        if grep -q "devops-agent/GLOBAL_RULES.md" "$CLAUDE_MD"; then
            echo -e "${GREEN}✓${NC} $project/CLAUDE.md references global rules"
        else
            echo -e "${YELLOW}⚠${NC} $project/CLAUDE.md does NOT reference global rules"
            echo "   Add this section to $project/CLAUDE.md:"
            echo ""
            echo "   ## Global Rules Integration"
            echo "   **Organization Baseline**: \`../devops-agent/GLOBAL_RULES.md\`"
            echo ""
        fi
    done
    echo ""
fi

# Step 4: Display setup instructions
echo -e "${YELLOW}Step 4: Setup Summary${NC}"
echo ""
echo -e "${BLUE}Directory Structure:${NC}"
echo "  $PARENT_DIR/"
echo "  ├── devops-agent/              (This repository)"
echo "  │   ├── GLOBAL_RULES.md        (Organization baseline)"
echo "  │   ├── scripts/"
echo "  │   └── README.md"
for project in "${PROJECTS[@]}"; do
    echo "  ├── $project/"
    echo "  │   ├── CLAUDE.md           (Project-local rules)"
    echo "  │   ├── .claude/            (Claude Code config)"
    echo "  │   └── memory/             (Project documentation)"
done
echo "  └── [other-projects]/          (Clone as needed)"
echo ""

# Step 5: Display next steps
echo -e "${BLUE}Next Steps for Team Members:${NC}"
echo ""
echo "1. Clone devops-agent (if not already done):"
echo "   git clone https://github.com/onfrontiers/devops-agent.git"
echo ""
echo "2. Clone project repositories:"
echo "   git clone https://github.com/onfrontiers/operations-hub.git"
echo "   git clone https://github.com/onfrontiers/consultations.git"
echo "   git clone https://github.com/onfrontiers/contacts.git"
echo ""
echo "3. Verify global rules are accessible:"
echo "   cat ../devops-agent/GLOBAL_RULES.md | head -20"
echo ""
echo "4. Verify each project references global rules:"
echo "   grep -l 'devops-agent/GLOBAL_RULES.md' */CLAUDE.md"
echo ""

# Step 6: Tool integration check
echo -e "${YELLOW}Step 5: Verifying Tool Integration${NC}"
echo ""

# Check if Claude Code is available
if command -v code &> /dev/null; then
    echo -e "${GREEN}✓${NC} VS Code found"
else
    echo -e "${YELLOW}ℹ${NC} VS Code not found in PATH"
fi

# Check if npm is available
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm found: $NPM_VERSION"
else
    echo -e "${YELLOW}ℹ${NC} npm not found in PATH"
fi

# Check if Node.js is available
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js found: $NODE_VERSION"
else
    echo -e "${YELLOW}ℹ${NC} Node.js not found in PATH"
fi

# Check for claude-flow
if npm list -g npx-claude-flow 2>/dev/null | grep -q claude-flow; then
    echo -e "${GREEN}✓${NC} claude-flow found globally"
else
    echo -e "${YELLOW}ℹ${NC} claude-flow not installed globally"
    echo "   Install with: npm install -g claude-flow"
fi

echo ""

# Step 7: Success message
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Bootstrap Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "${BLUE}Global rules are now properly configured.${NC}"
echo ""
echo "For more information, see:"
echo "  - $DEVOPS_AGENT_DIR/GLOBAL_RULES.md (Organization baseline)"
echo "  - $PARENT_DIR/*/CLAUDE.md (Project-specific rules)"
echo ""
echo "Questions? Check the #devops Slack channel or review GLOBAL_RULES.md"
echo ""

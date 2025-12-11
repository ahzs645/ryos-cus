#!/bin/bash
# Sync with upstream ryOS and re-apply customizations
#
# Usage:
#   ./scripts/customize/sync-upstream.sh
#
# This script:
# 1. Fetches latest from upstream
# 2. Resets main to upstream/main
# 3. Re-applies your customizations
# 4. Optionally commits the changes

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 Syncing with upstream ryOS${NC}\n"

# Check if we're in a git repo
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Check if upstream remote exists
if ! git remote | grep -q "upstream"; then
    echo -e "${YELLOW}Adding upstream remote...${NC}"
    git remote add upstream https://github.com/ryokun6/ryos.git
fi

# Fetch upstream
echo -e "${BLUE}Fetching upstream...${NC}"
git fetch upstream

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "Current branch: ${YELLOW}$CURRENT_BRANCH${NC}"

# Stash any local changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}Stashing local changes...${NC}"
    git stash
    STASHED=true
fi

# If on main, reset to upstream
if [ "$CURRENT_BRANCH" = "main" ]; then
    echo -e "${BLUE}Resetting main to upstream/main...${NC}"
    git reset --hard upstream/main
else
    echo -e "${YELLOW}Not on main branch. Creating a new branch from upstream/main...${NC}"
    git checkout -B main-synced upstream/main
fi

# Show how far behind/ahead we were
BEHIND=$(git rev-list --count HEAD..upstream/main 2>/dev/null || echo "0")
AHEAD=$(git rev-list --count upstream/main..HEAD 2>/dev/null || echo "0")
echo -e "Synced! Was ${RED}$BEHIND behind${NC}, ${GREEN}$AHEAD ahead${NC}"

# Apply customizations
echo -e "\n${BLUE}Applying customizations...${NC}"
if [ -f "scripts/customize/apply-customizations.ts" ]; then
    bun run scripts/customize/apply-customizations.ts
else
    echo -e "${RED}Customization script not found!${NC}"
    exit 1
fi

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    echo -e "${YELLOW}Restoring stashed changes...${NC}"
    git stash pop || echo -e "${YELLOW}Could not restore stash (may have conflicts)${NC}"
fi

echo -e "\n${GREEN}✅ Sync complete!${NC}"
echo -e "You can now:"
echo -e "  1. Review changes with: ${YELLOW}git diff${NC}"
echo -e "  2. Commit with: ${YELLOW}git add -A && git commit -m 'Sync with upstream + customizations'${NC}"
echo -e "  3. Push with: ${YELLOW}git push origin main --force${NC}"

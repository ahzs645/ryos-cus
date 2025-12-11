#!/bin/bash
# Apply ryOS customizations
#
# Run this from your ryOS fork directory:
#   ../ryos-customizations/apply.sh
#
# Or specify the ryOS path:
#   ./apply.sh /path/to/ryos

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Get the directory where this script lives
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Target directory (ryOS repo) - default to current directory
TARGET_DIR="${1:-.}"

# Resolve to absolute path
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

echo -e "${BLUE}🔧 Applying ryOS Customizations${NC}"
echo -e "   Script dir: ${YELLOW}$SCRIPT_DIR${NC}"
echo -e "   Target dir: ${YELLOW}$TARGET_DIR${NC}"
echo ""

# Verify we're in a ryOS repo
if [ ! -f "$TARGET_DIR/package.json" ]; then
    echo -e "${RED}Error: No package.json found in $TARGET_DIR${NC}"
    echo "Make sure you're running this from a ryOS directory"
    exit 1
fi

# Check if it looks like ryOS
if ! grep -q '"name": "soundboard"' "$TARGET_DIR/package.json" 2>/dev/null; then
    echo -e "${YELLOW}Warning: This doesn't look like a ryOS repo${NC}"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Copy the apply script to target and run it
echo -e "${BLUE}Copying customization script...${NC}"
mkdir -p "$TARGET_DIR/scripts/customize"
cp -r "$SCRIPT_DIR/templates" "$TARGET_DIR/scripts/customize/"
cp "$SCRIPT_DIR/apply-customizations.ts" "$TARGET_DIR/scripts/customize/"

# Run the TypeScript apply script
echo -e "${BLUE}Running customization script...${NC}"
cd "$TARGET_DIR"

# Try different ways to run TypeScript
if command -v bun &> /dev/null; then
    bun run scripts/customize/apply-customizations.ts
elif command -v npx &> /dev/null; then
    npx tsx scripts/customize/apply-customizations.ts
else
    echo -e "${RED}Error: Need bun or npx (with tsx) to run the script${NC}"
    echo "Install bun: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Customizations applied!${NC}"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff"
echo "  2. Copy .env.example to .env and configure"
echo "  3. Test: npm run dev (or bun run dev)"
echo "  4. Commit: git add -A && git commit -m 'Apply customizations'"

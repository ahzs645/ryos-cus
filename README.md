# ryOS Customizations

Personal customization layer for [ryOS](https://github.com/ryokun6/ryos) fork.

This repo contains scripts and templates to apply your custom branding on top of upstream ryOS without maintaining a diverging fork.

## Quick Start

```bash
# 1. Clone your ryOS fork
git clone https://github.com/ahzs645/ryos.git
cd ryos

# 2. Add upstream remote
git remote add upstream https://github.com/ryokun6/ryos.git

# 3. Clone this customizations repo alongside (or anywhere)
cd ..
git clone https://github.com/ahzs645/ryos-customizations.git

# 4. Run the apply script from your ryOS directory
cd ryos
../ryos-customizations/apply.sh
```

## Syncing with Upstream

When upstream pushes new commits:

```bash
cd ryos

# Fetch and reset to upstream
git fetch upstream
git reset --hard upstream/main

# Re-apply customizations
../ryos-customizations/apply.sh

# Commit and push
git add -A
git commit -m "Sync with upstream + apply customizations"
git push origin main --force
```

## What's Included

### Templates (`templates/`)
- `config-frontend.ts` - Frontend config (Vite env vars)
- `config-backend.ts` - Backend/API config
- `env.example` - Environment variable template
- `persona.md` - AI assistant personality
- `CV.yaml` - Profile data for dynamic branding
- `useCvStore.ts` - Zustand store for CV data
- `cvParser.ts` - YAML parser for CV
- `aiPrompts.ts` - AI system prompts with config
- `deploy-pages.yml` - GitHub Pages deployment workflow

### Scripts
- `apply.sh` - Main apply script (shell wrapper)
- `apply-customizations.ts` - TypeScript implementation
- `sync-upstream.sh` - Full sync + apply in one command

## Customizing

1. **Edit templates** in `templates/` folder
2. **Run apply script** to update your fork
3. **Edit `.env`** in your fork for deployment-specific values

### Key Environment Variables

```env
# OS Branding
VITE_OS_NAME="ahmadOS"
VITE_OS_FIRST_NAME="ahmad"
VITE_CREATOR_NAME="Ahmad Jalil"

# AI Assistant
VITE_AI_ASSISTANT_NAME="Ahmad"
AI_PERSONA_PATH="content/persona.md"

# Feature Flags (for static deployment)
VITE_STATIC_MODE="false"
VITE_ENABLE_AI_CHAT="true"
```

## How It Works

The apply script:
1. Copies config files to the right locations
2. Patches source files to use config imports instead of hardcoded values
3. Updates build configuration for static deployment support

This approach means you never have merge conflicts with upstream - you just reset to their code and re-apply your layer.

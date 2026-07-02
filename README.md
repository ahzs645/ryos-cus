# ryOS Customizations

Personal customization layer for [ryOS](https://github.com/ryokun6/ryos).

**Automatic deployment:** This repo builds a customized ryOS and deploys to GitHub Pages automatically!

## 🚀 How It Works

1. **GitHub Action** runs on push (or daily schedule)
2. **Clones upstream** ryOS (always fresh, latest version)
3. **Applies customizations** (branding, config, etc.)
4. **Builds** for static deployment
5. **Deploys** to `gh-pages` branch → GitHub Pages

**No fork maintenance needed!** Upstream updates are automatically included.

## 🌐 GitHub Pages Setup

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **root**
4. Save

Your site will be live at: `https://ahzs645.github.io/ryos-cus/`

### Custom Domain (Optional)

1. Create `templates/CNAME` with your domain (e.g., `os.ahmadjalil.com`)
2. In workflow, set `VITE_BASE_PATH: "/"`
3. Configure DNS to point to GitHub Pages

## ⚙️ Configuration

### GitHub Repository Variables

Set these in **Settings → Secrets and variables → Actions → Variables**:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_OS_NAME` | OS display name | `ahmadOS` |
| `VITE_OS_FIRST_NAME` | First name for dynamic naming | `ahmad` |
| `VITE_CREATOR_NAME` | Your name | `Ahmad Jalil` |

### Template Files

Edit files in `templates/` to customize:

- **`env.example`** - Default environment variables
- **`persona.md`** - AI assistant personality
- **`CV.yaml`** - Your profile (name, links, etc.)
- **`config-frontend.ts`** - Frontend config defaults

## 📁 Structure

```
├── .github/workflows/
│   └── build-and-deploy.yml  # Auto-build and deploy
├── templates/                 # Your customization files
│   ├── config-frontend.ts    # Frontend config
│   ├── config-backend.ts     # Backend config
│   ├── env.example           # Environment template
│   ├── persona.md            # AI personality
│   ├── CV.yaml               # Your profile data
│   ├── aiPrompts.ts          # AI system prompts
│   └── ...
├── apply-customizations.ts   # Patching script
└── apply.sh                  # Local apply script
```

## 🔄 Manual Trigger

To rebuild manually:
1. Go to **Actions** tab
2. Select **Build and Deploy** workflow
3. Click **Run workflow**

## 🔧 Local Development

```bash
# Clone this repo
git clone https://github.com/ahzs645/ryos-cus.git
cd ryos-cus

# Clone upstream ryOS next to it
git clone https://github.com/ryokun6/ryos.git ../ryos

# Apply customizations locally
cd ../ryos
../ryos-cus/apply.sh

# Run dev server
bun install
bun run dev
```

## 📝 Customization Tips

### Change OS Name
Edit `templates/env.example`:
```env
VITE_OS_NAME="yourOS"
VITE_OS_FIRST_NAME="yourname"
VITE_CREATOR_NAME="Your Name"
```

### Change AI Persona
Edit `templates/persona.md` with your personality.

### Change Profile Data
Edit `templates/CV.yaml` with your info (name, links, experience).

## 🫧 aqua.css Skin (component-mapping testbed)

This overlay can layer [aqua.css](https://github.com/ahzs645/aqua.css) — our
Mac OS X 10.0–10.4 Aqua CSS library — on top of ryOS's built-in **Mac OS X**
theme, so ryOS doubles as a live accuracy testbed for the library.

**How it works**

1. CI (or `apply.sh`, if `aqua.css` is cloned next to this repo) builds
   aqua.css and bundles `aqua.scoped.css` + fonts/icons into
   `public/aqua-css/`.
2. `templates/aqua-css/aquaCssSkin.ts` (installed as `src/lib/aquaCssSkin.ts`)
   watches the theme store; while the `macosx` theme is active it adds
   `class="aqua"` to `<html>` and injects two stylesheets:
   - **`aqua.scoped.css`** — the library with every rule prefixed under
     `.aqua`, so shared class names (`.window`, `.aqua-button`, `.aqua-tab`,
     `.traffic-lights`…) get aqua.css's rendering without touching other
     themes.
   - **`aqua-bridge.css`** (`templates/aqua-css/aqua-bridge.css`) — remaps
     ryOS's `--os-*` design tokens (titlebar gradients, pinstripes, menu bar,
     dock, selection, inputs, fonts) to aqua.css's tokens, plus targeted
     overrides for inline-styled surfaces.
3. Switching to System 7 / XP / 98 removes the class and both stylesheets.

**Component mapping:** the full ryOS-part → aqua.css-component map (including
what's reachable by tokens vs. classes vs. template swaps, and known gaps)
lives in [`docs/RYOS_MAPPING.md` in the aqua.css repo](https://github.com/ahzs645/aqua.css/blob/main/docs/RYOS_MAPPING.md).

**Accuracy-testing setup:** in ryOS pick theme **Mac OS X**, material
**Classic**, appearance **Light**, accent **System** (aqua.css models classic
light Aqua; glass/dark/accents are ryOS extensions that fight the skin).

**Toggle:** set `VITE_AQUA_CSS_SKIN="false"` to build with the skin disabled
and compare ryOS's native Aqua rendering against the aqua.css one.

## How the Script Works

The `apply-customizations.ts` script:
1. Copies config files to the right locations
2. Patches source files to use config imports instead of hardcoded values
3. Updates build configuration for static deployment

This means zero merge conflicts with upstream - just clone fresh and re-apply!

#!/usr/bin/env bun
/**
 * ryOS Customization Script
 *
 * This script applies your custom branding/config layer on top of upstream ryOS.
 * Run this after syncing with upstream to re-apply your customizations.
 *
 * Usage:
 *   bun run scripts/customize/apply-customizations.ts
 *
 * What it does:
 * 1. Copies config files (src/lib/config.ts, api/utils/config.ts, etc.)
 * 2. Patches source files to use config imports instead of hardcoded values
 * 3. Adds GitHub Pages deployment workflow
 * 4. Updates package.json with build:pages script
 * 5. Updates vite.config.ts for static deployment support
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CUSTOMIZE_DIR = path.join(ROOT, "scripts/customize");
const TEMPLATES_DIR = path.join(CUSTOMIZE_DIR, "templates");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
};

function log(message: string, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step: string) {
  log(`\n→ ${step}`, colors.blue);
}

function logSuccess(message: string) {
  log(`  ✓ ${message}`, colors.green);
}

function logWarning(message: string) {
  log(`  ⚠ ${message}`, colors.yellow);
}

function logError(message: string) {
  log(`  ✗ ${message}`, colors.red);
}

/**
 * Copy a template file to its destination
 */
function copyTemplate(templateName: string, destPath: string) {
  const templatePath = path.join(TEMPLATES_DIR, templateName);
  const fullDestPath = path.join(ROOT, destPath);

  if (!fs.existsSync(templatePath)) {
    logError(`Template not found: ${templateName}`);
    return false;
  }

  // Ensure destination directory exists
  const destDir = path.dirname(fullDestPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(templatePath, fullDestPath);
  logSuccess(`Copied ${templateName} → ${destPath}`);
  return true;
}

/**
 * Apply a patch to a file using search/replace
 */
interface Patch {
  file: string;
  patches: Array<{
    search: string | RegExp;
    replace: string;
    description: string;
    optional?: boolean;
  }>;
}

function applyPatch(patch: Patch) {
  const filePath = path.join(ROOT, patch.file);

  if (!fs.existsSync(filePath)) {
    logWarning(`File not found: ${patch.file} (skipping)`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  for (const p of patch.patches) {
    const originalContent = content;

    if (typeof p.search === "string") {
      if (content.includes(p.search)) {
        content = content.replace(p.search, p.replace);
        modified = true;
        logSuccess(`${patch.file}: ${p.description}`);
      } else if (!p.optional) {
        // Check if already patched
        if (content.includes(p.replace)) {
          logSuccess(`${patch.file}: ${p.description} (already applied)`);
        } else {
          logWarning(`${patch.file}: Could not find search pattern for "${p.description}"`);
        }
      }
    } else {
      // RegExp
      if (p.search.test(content)) {
        content = content.replace(p.search, p.replace);
        modified = true;
        logSuccess(`${patch.file}: ${p.description}`);
      } else if (!p.optional) {
        logWarning(`${patch.file}: Could not find pattern for "${p.description}"`);
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
  }
}

/**
 * Add import statement to a file if not already present
 */
function ensureImport(filePath: string, importStatement: string, afterPattern?: string | RegExp) {
  const fullPath = path.join(ROOT, filePath);

  if (!fs.existsSync(fullPath)) {
    logWarning(`File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, "utf-8");

  // Check if import already exists
  if (content.includes(importStatement)) {
    return true; // Already has import
  }

  // Find where to insert
  if (afterPattern) {
    const pattern = typeof afterPattern === "string" ? afterPattern : afterPattern;
    const match = content.match(afterPattern);
    if (match && match.index !== undefined) {
      const insertPos = match.index + match[0].length;
      content = content.slice(0, insertPos) + "\n" + importStatement + content.slice(insertPos);
      fs.writeFileSync(fullPath, content);
      logSuccess(`Added import to ${filePath}`);
      return true;
    }
  }

  // Fallback: add after last import
  const lastImportMatch = content.match(/^import .+$/gm);
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1];
    const insertPos = content.lastIndexOf(lastImport) + lastImport.length;
    content = content.slice(0, insertPos) + "\n" + importStatement + content.slice(insertPos);
    fs.writeFileSync(fullPath, content);
    logSuccess(`Added import to ${filePath}`);
    return true;
  }

  logWarning(`Could not add import to ${filePath}`);
  return false;
}

// ============================================
// MAIN CUSTOMIZATION STEPS
// ============================================

async function main() {
  log("\n🔧 Applying ryOS Customizations\n", colors.blue);

  // Step 1: Copy config files
  logStep("Step 1: Copying config files");

  copyTemplate("config-frontend.ts", "src/lib/config.ts");
  copyTemplate("config-backend.ts", "api/utils/config.ts");
  copyTemplate("env.example", ".env.example");
  copyTemplate("persona.md", "content/persona.md");
  copyTemplate("CV.yaml", "public/data/CV.yaml");
  copyTemplate("deploy-pages.yml", ".github/workflows/deploy-pages.yml");

  // Step 2: Copy CV store and TrafficLights component
  logStep("Step 2: Copying CV store and UI components");
  copyTemplate("useCvStore.ts", "src/stores/useCvStore.ts");
  copyTemplate("cvParser.ts", "src/utils/cvParser.ts");
  copyTemplate("TrafficLights.tsx", "src/components/ui/TrafficLights.tsx");
  copyTemplate("TrafficLights.css", "src/components/ui/TrafficLights.css");

  // Step 3: Patch package.json
  logStep("Step 3: Patching package.json");
  {
    const pkgPath = path.join(ROOT, "package.json");
    let pkg = fs.readFileSync(pkgPath, "utf-8");
    if (pkg.includes('"build:pages"')) {
      logSuccess("package.json: build:pages script (already applied)");
    } else if (pkg.includes('"build": "tsc -b && vite build",')) {
      // Anchor on the stable "build" script (upstream removed "build:tauri")
      pkg = pkg.replace(
        '"build": "tsc -b && vite build",',
        '"build": "tsc -b && vite build",\n    "build:pages": "tsc -b && VITE_STATIC_DEPLOY=true vite build",'
      );
      fs.writeFileSync(pkgPath, pkg);
      logSuccess("package.json: Added build:pages script");
    } else {
      logError("package.json: could not find the \"build\" script to anchor build:pages");
    }
  }

  // Step 4: Patch vite.config.ts for static deployment
  logStep("Step 4: Patching vite.config.ts");

  const viteConfigPath = path.join(ROOT, "vite.config.ts");
  if (fs.existsSync(viteConfigPath)) {
    let viteContent = fs.readFileSync(viteConfigPath, "utf-8");

    // Add static deploy logic if not present
    if (!viteContent.includes("VITE_STATIC_DEPLOY")) {
      // Add the static deploy detection after imports
      const staticDeployCode = `
// Determine base path for GitHub Pages deployment
// VITE_STATIC_DEPLOY enables static deployment mode
// VITE_BASE_PATH allows overriding the base path (default: "/ryos/" for GH Pages, "/" for custom domains)
const isStaticDeploy = process.env.VITE_STATIC_DEPLOY === "true" ||
                       process.env.VITE_STATIC_DEPLOY === "1";

// Allow custom base path override, otherwise use /ryos/ for static deploy
const basePath = process.env.VITE_BASE_PATH || (isStaticDeploy ? "/ryos/" : "/");

console.log("[vite.config] VITE_STATIC_DEPLOY:", process.env.VITE_STATIC_DEPLOY, "VITE_BASE_PATH:", process.env.VITE_BASE_PATH, "basePath:", basePath);
`;

      // Insert after the __dirname polyfill
      const insertMarker = 'const __dirname = path.dirname(__filename);';
      if (viteContent.includes(insertMarker)) {
        viteContent = viteContent.replace(
          insertMarker,
          insertMarker + "\n" + staticDeployCode
        );
        logSuccess("Added static deploy detection");
      }

      // Add base: basePath to defineConfig
      if (!viteContent.includes("base: basePath")) {
        viteContent = viteContent.replace(
          "export default defineConfig({",
          `export default defineConfig({
  // Set base path for GitHub Pages (/<repo-name>/)
  // For custom domains, set VITE_BASE_PATH="/" to use root
  base: basePath,`
        );
        logSuccess("Added base path config");
      }

      fs.writeFileSync(viteConfigPath, viteContent);
    } else {
      logSuccess("vite.config.ts already has static deploy support");
    }
  }

  // Step 5: Patch AboutFinderDialog.tsx
  logStep("Step 5: Patching AboutFinderDialog.tsx");

  const aboutDialogPath = path.join(ROOT, "src/components/dialogs/AboutFinderDialog.tsx");
  if (fs.existsSync(aboutDialogPath)) {
    let content = fs.readFileSync(aboutDialogPath, "utf-8");
    let modified = false;

    // Add imports if not present
    if (!content.includes('from "@/lib/config"')) {
      content = content.replace(
        'import { getTranslatedAppName } from "@/utils/i18n";',
        `import { getTranslatedAppName } from "@/utils/i18n";
import { getCreatorConfig, getFullOSName, getCVConfig } from "@/lib/config";
import { useOSName } from "@/stores/useCvStore";`
      );
      modified = true;
      logSuccess("Added config imports to AboutFinderDialog");
    }

    // Add osName hook usage if not present. Two known upstream layouts:
    // older builds computed `isXpTheme` locally; current upstream reads
    // `currentTheme` from useThemeFlags().
    const osNameHook = `

  // Get OS name from CV store (hook must be called unconditionally)
  const cvOSName = useOSName(currentTheme);
  const useCVBranding = getCVConfig().useCVForBranding;
  const osName = useCVBranding ? cvOSName : getFullOSName(currentTheme);`;
    if (!content.includes("useOSName(currentTheme)")) {
      const isXpAnchor =
        /const isXpTheme = currentTheme === "xp" \|\| currentTheme === "win98";/;
      const themeFlagsAnchor =
        /const \{[^}]*currentTheme[^}]*\} = useThemeFlags\(\);/;
      if (isXpAnchor.test(content)) {
        content = content.replace(isXpAnchor, (m) => m + osNameHook);
        modified = true;
        logSuccess("Added osName hook to AboutFinderDialog");
      } else if (themeFlagsAnchor.test(content)) {
        content = content.replace(themeFlagsAnchor, (m) => m + osNameHook);
        modified = true;
        logSuccess("Added osName hook to AboutFinderDialog (useThemeFlags layout)");
      } else {
        logWarning("Could not find anchor for osName hook in AboutFinderDialog");
      }
    }

    // Replace hardcoded ryOS with theme suffixes
    const osNamePattern = /ryOS\s*\n?\s*\{currentTheme === "system7"\s*\n?\s*\? " 7"\s*\n?\s*: currentTheme === "macosx"\s*\n?\s*\? " X"\s*\n?\s*: currentTheme === "win98"\s*\n?\s*\? " 98"\s*\n?\s*: currentTheme === "xp"\s*\n?\s*\? " XP"\s*\n?\s*: ""\}/;
    if (osNamePattern.test(content)) {
      content = content.replace(osNamePattern, "{osName}");
      modified = true;
      logSuccess("Replaced hardcoded OS name with dynamic osName");
    } else if (content.includes("{osName}")) {
      logSuccess("OS name already dynamic (already applied)");
    } else {
      logWarning("Could not find OS name pattern to replace");
    }

    // Replace hardcoded copyright
    if (content.includes("© Ryo Lu. 1992-{new Date().getFullYear()}")) {
      content = content.replace(
        "<p>© Ryo Lu. 1992-{new Date().getFullYear()}</p>",
        "© {getCreatorConfig().name}. {getCreatorConfig().copyrightStartYear}-{new Date().getFullYear()}"
      );
      modified = true;
      logSuccess("Replaced hardcoded copyright");
    } else if (content.includes("getCreatorConfig().name")) {
      logSuccess("Copyright already dynamic (already applied)");
    } else {
      logWarning("Could not find copyright pattern to replace");
    }

    if (modified) {
      fs.writeFileSync(aboutDialogPath, content);
    }
  }

  // Step 6: Patch MenuBar.tsx
  logStep("Step 6: Patching MenuBar.tsx");

  const menuBarPath = path.join(ROOT, "src/components/layout/MenuBar.tsx");
  if (fs.existsSync(menuBarPath)) {
    let content = fs.readFileSync(menuBarPath, "utf-8");
    let modified = false;

    // Add imports if not present
    if (!content.includes('from "@/lib/config"')) {
      // Find a good place to add the import
      const importMarker = 'import { useIsPhone } from "@/hooks/useIsPhone";';
      if (content.includes(importMarker)) {
        content = content.replace(
          importMarker,
          `${importMarker}
import { getCreatorConfig, getOSConfig } from "@/lib/config";`
        );
        modified = true;
        logSuccess("Added config imports to MenuBar");
      }
    }

    // Add config getters before finderMetadata if not present
    if (!content.includes("const creatorConfig = getCreatorConfig()")) {
      const metadataMarker = "const finderMetadata = {";
      if (content.includes(metadataMarker)) {
        content = content.replace(
          metadataMarker,
          `// Get config values for metadata
const creatorConfig = getCreatorConfig();
const osConfig = getOSConfig();

${metadataMarker}`
        );
        modified = true;
        logSuccess("Added config getters to MenuBar");
      }
    }

    // Replace hardcoded values in finderMetadata
    if (content.includes('name: "Ryo Lu",')) {
      content = content.replace('name: "Ryo Lu",', "name: creatorConfig.name,");
      modified = true;
      logSuccess("Replaced hardcoded creator name");
    }

    if (content.includes('url: "https://ryo.lu",')) {
      content = content.replace('url: "https://ryo.lu",', "url: creatorConfig.url,");
      modified = true;
      logSuccess("Replaced hardcoded creator URL");
    }

    if (content.includes('github: "https://github.com/ryokun6/ryos",')) {
      content = content.replace('github: "https://github.com/ryokun6/ryos",', "github: osConfig.githubUrl,");
      modified = true;
      logSuccess("Replaced hardcoded GitHub URL");
    }

    if (modified) {
      fs.writeFileSync(menuBarPath, content);
    } else {
      logSuccess("MenuBar already patched or patterns not found");
    }
  }

  // Step 7: Patch api/utils/aiPrompts.ts
  logStep("Step 7: Patching aiPrompts.ts");

  const aiPromptsPath = path.join(ROOT, "api/utils/aiPrompts.ts");
  if (fs.existsSync(aiPromptsPath)) {
    let aiPromptsContent = fs.readFileSync(aiPromptsPath, "utf-8");

    // Check if already using config
    if (!aiPromptsContent.includes('from "./config"')) {
      // This file needs more substantial changes - copy the template instead
      copyTemplate("aiPrompts.ts", "api/utils/aiPrompts.ts");
    } else {
      logSuccess("aiPrompts.ts already uses config");
    }
  }

  // Step 8: Patch index.html for dynamic OS name
  logStep("Step 8: Patching index.html");

  applyPatch({
    file: "index.html",
    patches: [
      {
        search: '<title>ryOS</title>',
        replace: '<title>%VITE_OS_NAME%</title>',
        description: "Replace hardcoded title with env var",
      },
      {
        search: '<meta property="og:title" content="ryOS" />',
        replace: '<meta property="og:title" content="%VITE_OS_NAME%" />',
        description: "Replace OG title",
      },
      {
        search: '<meta property="twitter:title" content="ryOS" />',
        replace: '<meta property="twitter:title" content="%VITE_OS_NAME%" />',
        description: "Replace Twitter title",
      },
      {
        search: '<meta name="twitter:title" content="ryOS" />',
        replace: '<meta name="twitter:title" content="%VITE_OS_NAME%" />',
        description: "Replace Twitter title (alternate)",
        optional: true,
      },
      {
        search: '<meta name="apple-mobile-web-app-title" content="ryOS" />',
        replace: '<meta name="apple-mobile-web-app-title" content="%VITE_OS_NAME%" />',
        description: "Replace Apple app title",
      },
      {
        search: '<meta property="og:site_name" content="ryOS" />',
        replace: '<meta property="og:site_name" content="%VITE_OS_NAME%" />',
        description: "Replace OG site name",
      },
    ],
  });

  // Step 9: Patch translation files for AI name and OS branding
  logStep("Step 9: Patching translation files");

  // Read config to get replacement values
  const envExamplePath = path.join(TEMPLATES_DIR, "env.example");
  let aiName = "Ahmad";
  let osName = "ahmadOS";

  if (fs.existsSync(envExamplePath)) {
    const envContent = fs.readFileSync(envExamplePath, "utf-8");
    const aiNameMatch = envContent.match(/VITE_AI_ASSISTANT_NAME="([^"]+)"/);
    const osNameMatch = envContent.match(/VITE_OS_NAME="([^"]+)"/);
    if (aiNameMatch) aiName = aiNameMatch[1];
    if (osNameMatch) osName = osNameMatch[1];
  }

  const localesDir = path.join(ROOT, "src/lib/locales");
  if (fs.existsSync(localesDir)) {
    const languages = fs.readdirSync(localesDir).filter(f =>
      fs.statSync(path.join(localesDir, f)).isDirectory()
    );

    for (const lang of languages) {
      const translationPath = path.join(localesDir, lang, "translation.json");
      if (!fs.existsSync(translationPath)) continue;

      let content = fs.readFileSync(translationPath, "utf-8");
      let modified = false;

      // Replace AI assistant name references
      // Be careful to preserve case and context
      const replacements = [
        // Chat with Ryo -> Chat with Ahmad
        [/"Chat with Ryo"/g, `"Chat with ${aiName}"`],
        [/"chat with Ryo"/g, `"chat with ${aiName}"`],
        // Ryo will respond -> Ahmad will respond
        [/"Ryo will respond/g, `"${aiName} will respond`],
        // i'm ryo -> i'm ahmad
        [/i'm ryo\./g, `i'm ${aiName.toLowerCase()}.`],
        // @ryo -> @ahmad (but keep as a handle)
        [/"@ryo"/g, `"@${aiName.toLowerCase()}"`],
        // "ryo": "Ryo" -> "ryo": "Ahmad" (the display name)
        [/"ryo": "Ryo"/g, `"ryo": "${aiName}"`],
        // greeting with ryo
        [/hey! i'm ryo\./g, `hey! i'm ${aiName.toLowerCase()}.`],
        // Login to ryOS -> Login to ahmadOS
        [/"Login to ryOS"/g, `"Login to ${osName}"`],
        [/"loginToRyOS": "Login to ryOS"/g, `"loginToRyOS": "Login to ${osName}"`],
        // ryOS Account -> ahmadOS Account (keep key, change value)
        [/"ryOSAccount": "ryOS Account"/g, `"ryOSAccount": "${osName} Account"`],
        // ryOS Login -> ahmadOS Login
        [/"dialogTitle": "ryOS Login"/g, `"dialogTitle": "${osName} Login"`],
        // ryOS Code Preview
        [/"ryOS Code Preview"/g, `"${osName} Code Preview"`],
        // Chat with Ryo descriptions
        [/chat with Ryo/g, `chat with ${aiName}`],
        [/chatting with Ryo/g, `chatting with ${aiName}`],
        // Ask Ryo to
        [/Ask Ryo to/g, `Ask ${aiName} to`],
        // Mention @ryo for AI
        [/Mention @ryo for/g, `Mention @${aiName.toLowerCase()} for`],
        // Ryo becomes a DJ
        [/Ryo becomes a DJ/g, `${aiName} becomes a DJ`],
        // let Ryo AI
        [/let Ryo AI/g, `let ${aiName} AI`],
        // AI chat mode with ryo
        [/chat mode with ryo/g, `chat mode with ${aiName.toLowerCase()}`],
        // Chat with ryo
        [/Chat with ryo/g, `Chat with ${aiName.toLowerCase()}`],
      ];

      for (const [search, replace] of replacements) {
        if (search instanceof RegExp && search.test(content)) {
          content = content.replace(search, replace as string);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(translationPath, content);
        logSuccess(`Patched translations for ${lang}`);
      }
    }
  } else {
    logWarning("Locales directory not found");
  }

  // Step 10: Patch ChatsAppComponent for @ryo -> @yourname
  logStep("Step 10: Patching ChatsAppComponent");

  const chatsAppPath = path.join(ROOT, "src/apps/chats/components/ChatsAppComponent.tsx");
  if (fs.existsSync(chatsAppPath)) {
    let content = fs.readFileSync(chatsAppPath, "utf-8");
    let modified = false;

    // Add config import if not present
    if (!content.includes('from "@/lib/config"')) {
      content = content.replace(
        'import { useTranslation }',
        `import { getAIConfig } from "@/lib/config";\nimport { useTranslation }`
      );
      modified = true;
      logSuccess("Added config import to ChatsAppComponent");
    }

    // Replace hardcoded "Ryo" username in messages
    if (content.includes('username: msg.role === "user" ? username || "You" : "Ryo"')) {
      content = content.replace(
        'username: msg.role === "user" ? username || "You" : "Ryo"',
        'username: msg.role === "user" ? username || "You" : getAIConfig().name'
      );
      modified = true;
      logSuccess("Replaced hardcoded AI name in message username");
    }

    // Replace "@ryo" display strings in window title (line 528)
    // : "@ryo"  ->  : \`@\${getAIConfig().name.toLowerCase()}\`
    if (content.includes(': "@ryo"')) {
      content = content.replace(/: "@ryo"/g, ': `@${getAIConfig().name.toLowerCase()}`');
      modified = true;
      logSuccess("Replaced @ryo window title with dynamic AI name");
    }

    if (modified) {
      fs.writeFileSync(chatsAppPath, content);
    }
  }

  // Step 11: Patch BootScreen.tsx for dynamic OS name
  logStep("Step 11: Patching BootScreen.tsx");

  const bootScreenPath = path.join(ROOT, "src/components/dialogs/BootScreen.tsx");
  if (fs.existsSync(bootScreenPath)) {
    let content = fs.readFileSync(bootScreenPath, "utf-8");
    let modified = false;

    // Add config import if not present
    if (!content.includes('from "@/lib/config"')) {
      content = content.replace(
        'import { useTranslation } from "react-i18next";',
        `import { useTranslation } from "react-i18next";
import { getOSConfig } from "@/lib/config";`
      );
      modified = true;
      logSuccess("Added config import to BootScreen");
    }

    // Replace hardcoded <span className="text-blue-500">ry</span>OS with dynamic name
    if (content.includes('<span className="text-blue-500">ry</span>OS')) {
      content = content.replace(
        '<span className="text-blue-500">ry</span>OS',
        '{getOSConfig().name}'
      );
      modified = true;
      logSuccess("Replaced hardcoded OS name in BootScreen");
    } else if (content.includes('{getOSConfig().name}')) {
      logSuccess("BootScreen already uses dynamic OS name");
    }

    if (modified) {
      fs.writeFileSync(bootScreenPath, content);
    }
  }

  // Step 12: Patch ControlPanelsAppComponent
  logStep("Step 12: Patching ControlPanelsAppComponent");

  const controlPanelsPath = path.join(ROOT, "src/apps/control-panels/components/ControlPanelsAppComponent.tsx");
  if (fs.existsSync(controlPanelsPath)) {
    let content = fs.readFileSync(controlPanelsPath, "utf-8");
    let modified = false;

    // Replace hardcoded ryOS with config
    let osConfigNeeded = false;
    if (!content.includes('getOSConfig()')) {
      // Replace ryOS display name - try multiple patterns for upstream compatibility
      const osNamePatterns = [
        'ryOS {displayVersion}{displayBuild}',
        'ryOS {displayVersion}',
      ];
      for (const pattern of osNamePatterns) {
        if (content.includes(pattern)) {
          content = content.replace(
            pattern,
            pattern.replace('ryOS', '{getOSConfig().name}')
          );
          modified = true;
          osConfigNeeded = true;
          logSuccess("Replaced hardcoded OS name in ControlPanelsAppComponent");
          break;
        }
      }
    }

    // Replace hardcoded GitHub download URL
    if (content.includes('https://github.com/ryokun6/ryos/releases')) {
      content = content.replace(
        /https:\/\/github\.com\/ryokun6\/ryos\/releases\/download\/v\$\{desktopVersion\}\/ryOS_\$\{desktopVersion\}_aarch64\.dmg/g,
        '${getOSConfig().githubUrl}/releases/download/v${desktopVersion}/${getOSConfig().name}_${desktopVersion}_aarch64.dmg'
      );
      modified = true;
      osConfigNeeded = true;
      logSuccess("Replaced hardcoded GitHub URL in ControlPanelsAppComponent");
    }

    // Only add the import if getOSConfig is actually used
    if (osConfigNeeded && !content.includes('from "@/lib/config"')) {
      content = content.replace(
        'import { useTranslation }',
        `import { getOSConfig } from "@/lib/config";\nimport { useTranslation }`
      );
    }

    if (modified) {
      fs.writeFileSync(controlPanelsPath, content);
    }
  }

  // Step 13: Patch App.tsx for desktop download toast notifications
  logStep("Step 13: Patching App.tsx");

  const appTsxPath = path.join(ROOT, "src/App.tsx");
  if (fs.existsSync(appTsxPath)) {
    let content = fs.readFileSync(appTsxPath, "utf-8");
    let modified = false;

    // Only add the config import when something below will actually use it —
    // current upstream removed the download toasts, and an unused import
    // fails the tsc -b build (TS6133).
    const hasConfigTargets =
      content.includes('toast(`ryOS ${result.version} for Mac is available`') ||
      content.includes('toast("ryOS is available as a Mac app"') ||
      /https:\/\/github\.com\/ryokun6\/ryos\/releases\/download\//.test(content);

    // Add config import if not present
    if (!content.includes('from "@/lib/config"') && hasConfigTargets) {
      // Try the actual import path used in App.tsx
      if (content.includes('import { Toaster } from "./components/ui/sonner"')) {
        content = content.replace(
          'import { Toaster } from "./components/ui/sonner";',
          `import { Toaster } from "./components/ui/sonner";\nimport { getOSConfig } from "@/lib/config";`
        );
        modified = true;
        logSuccess("Added config import to App.tsx");
      } else if (content.includes('import { Toaster } from "sonner"')) {
        content = content.replace(
          'import { Toaster } from "sonner";',
          `import { Toaster } from "sonner";\nimport { getOSConfig } from "@/lib/config";`
        );
        modified = true;
        logSuccess("Added config import to App.tsx");
      } else {
        // Fallback: add after any Toaster import
        content = content.replace(
          /^(import \{ Toaster \} from [^\n]+)$/m,
          `$1\nimport { getOSConfig } from "@/lib/config";`
        );
        modified = true;
        logSuccess("Added config import to App.tsx (fallback)");
      }
    }

    // Replace toast message: "ryOS ${result.version} for Mac is available"
    if (content.includes('toast(`ryOS ${result.version} for Mac is available`')) {
      content = content.replace(
        'toast(`ryOS ${result.version} for Mac is available`',
        'toast(`${getOSConfig().name} ${result.version} for Mac is available`'
      );
      modified = true;
      logSuccess("Replaced version update toast message");
    }

    // Replace toast message: "ryOS is available as a Mac app"
    if (content.includes('toast("ryOS is available as a Mac app"')) {
      content = content.replace(
        'toast("ryOS is available as a Mac app"',
        'toast(`${getOSConfig().name} is available as a Mac app`'
      );
      modified = true;
      logSuccess("Replaced first-time download toast message");
    }

    // Replace GitHub download URLs in App.tsx
    // Pattern: https://github.com/ryokun6/ryos/releases/download/v${result.version}/ryOS_${result.version}_aarch64.dmg
    const appGithubUrlPattern = /https:\/\/github\.com\/ryokun6\/ryos\/releases\/download\/v\$\{result\.version\}\/ryOS_\$\{result\.version\}_aarch64\.dmg/g;
    if (appGithubUrlPattern.test(content)) {
      content = content.replace(
        appGithubUrlPattern,
        '${getOSConfig().githubUrl}/releases/download/v${result.version}/${getOSConfig().name}_${result.version}_aarch64.dmg'
      );
      modified = true;
      logSuccess("Replaced GitHub download URLs in App.tsx");
    }

    if (modified) {
      fs.writeFileSync(appTsxPath, content);
    }
  }

  // Step 14: Patch WindowFrame.tsx to use TrafficLights component
  logStep("Step 14: Patching WindowFrame.tsx for TrafficLights");

  const windowFramePath = path.join(ROOT, "src/components/layout/WindowFrame.tsx");
  if (fs.existsSync(windowFramePath)) {
    let content = fs.readFileSync(windowFramePath, "utf-8");
    let modified = false;
    let trafficLightsReplaced = false;

    // Check if using the new TrafficLightButton component pattern (current upstream)
    if (content.includes('<TrafficLightButton') && content.includes('color="red"')) {
      // Find the traffic lights section and replace with our TrafficLights component
      const startMarker = '{/* Traffic Light Buttons */}';
      // Try multiple possible end markers (upstream may change the comment)
      const endMarkers = [
        '{/* Title - white for notitlebar, themed otherwise */}',
        '{/* Title - removed white background */}',
        '{/* Title */',
      ];

      const startIdx = content.indexOf(startMarker);
      let endIdx = -1;

      for (const marker of endMarkers) {
        const idx = content.indexOf(marker);
        if (idx !== -1 && idx > startIdx) {
          endIdx = idx;
          break;
        }
      }

      if (startIdx !== -1 && endIdx !== -1) {
        const before = content.substring(0, startIdx);
        const after = content.substring(endIdx);

        const replacement = `{/* Traffic Light Buttons */}
              <div className="ml-1.5">
                <TrafficLights
                  isForeground={isForeground}
                  onClose={handleClose}
                  onMinimize={handleMinimize}
                  onMaximize={handleFullMaximize}
                />
              </div>

              `;

        content = before + replacement + after;

        // Remove the TrafficLightButton import since we're replacing it
        content = content.replace(
          /import \{ TrafficLightButton \} from "@\/components\/shared\/TrafficLightButton";\n?/,
          ''
        );

        modified = true;
        trafficLightsReplaced = true;
        logSuccess("Replaced TrafficLightButton components with TrafficLights");
      } else {
        logWarning("Could not find traffic lights section markers in WindowFrame.tsx");
      }
    }
    // Legacy: Check for old inline traffic lights pattern (older upstream versions)
    else if (content.includes('{/* Close Button (Red) */}') && content.includes('{/* Maximize Button (Green) */}')) {
      const startMarker = '{/* Traffic Light Buttons */}';
      const endMarker = '{/* Title - removed white background */}';

      const startIdx = content.indexOf(startMarker);
      const endIdx = content.indexOf(endMarker);

      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        const before = content.substring(0, startIdx);
        const after = content.substring(endIdx);

        const replacement = `{/* Traffic Light Buttons */}
              <div className="ml-1.5">
                <TrafficLights
                  isForeground={isForeground}
                  onClose={handleClose}
                  onMinimize={handleMinimize}
                  onMaximize={handleFullMaximize}
                />
              </div>

              `;

        content = before + replacement + after;
        modified = true;
        trafficLightsReplaced = true;
        logSuccess("Replaced inline traffic lights with TrafficLights component");
      } else {
        logWarning("Could not find traffic lights markers in WindowFrame.tsx");
      }
    } else if (content.includes('<TrafficLights')) {
      logSuccess("WindowFrame already uses TrafficLights component");
    } else {
      logWarning("Could not identify traffic lights pattern in WindowFrame.tsx");
    }

    // Only add TrafficLights import if we actually replaced the traffic lights section
    // (or if TrafficLights is already used in the file). This avoids TS6133 unused import errors.
    if (trafficLightsReplaced && !content.includes('import { TrafficLights }')) {
      content = content.replace(
        'import { ThemedIcon } from "@/components/shared/ThemedIcon";',
        `import { ThemedIcon } from "@/components/shared/ThemedIcon";
import { TrafficLights } from "@/components/ui/TrafficLights";`
      );
      modified = true;
      logSuccess("Added TrafficLights import to WindowFrame");
    }

    if (modified) {
      fs.writeFileSync(windowFramePath, content);
    }
  }

  // Step 15: Patch AppManager.tsx for desktop click to unfocus windows
  logStep("Step 15: Patching AppManager.tsx for window focus management");

  const appManagerPath = path.join(ROOT, "src/apps/base/AppManager.tsx");
  if (fs.existsSync(appManagerPath)) {
    let content = fs.readFileSync(appManagerPath, "utf-8");
    let modified = false;

    // Add onClick handler to Desktop component for unfocusing windows
    const desktopPatternOld = `appStates={{ windowOrder: instanceOrder, apps: legacyAppStates }}
      />`;
    const desktopPatternNew = `appStates={{ windowOrder: instanceOrder, apps: legacyAppStates }}
        onClick={() => {
          // Clicking on desktop unfocuses all windows
          bringInstanceToForeground("");
        }}
      />`;

    if (content.includes(desktopPatternOld) && !content.includes('bringInstanceToForeground("")')) {
      content = content.replace(desktopPatternOld, desktopPatternNew);
      modified = true;
      logSuccess("Added desktop click handler to unfocus windows");
    } else if (content.includes('bringInstanceToForeground("")')) {
      logSuccess("AppManager already has desktop unfocus handler");
    } else {
      logWarning("Could not find Desktop component pattern in AppManager.tsx");
    }

    if (modified) {
      fs.writeFileSync(appManagerPath, content);
    }
  }

  // Step 16: Install aqua.css skin (component-mapping testbed)
  logStep("Step 16: Installing aqua.css skin");

  copyTemplate("aqua-css/aquaCssSkin.ts", "src/lib/aquaCssSkin.ts");
  copyTemplate("aqua-css/aqua-bridge.css", "public/aqua-css/aqua-bridge.css");
  copyTemplate(
    "aqua-css/AquaTrafficLightButton.tsx",
    "src/components/shared/AquaTrafficLightButton.tsx"
  );

  ensureImport(
    "src/main.tsx",
    'import "./lib/aquaCssSkin";',
    /import "\.\/index\.css";/
  );

  // Swap the titlebar's traffic lights for the aqua.css-styled adapter
  // (current upstream layout; see docs/RYOS_MAPPING.md — TEMPLATE mechanism)
  applyPatch({
    file: "src/components/layout/window-frame/WindowFrameTitleBar.tsx",
    patches: [
      {
        search:
          'import { TrafficLightButton } from "@/components/shared/TrafficLightButton";',
        replace:
          'import { TrafficLightButton } from "@/components/shared/AquaTrafficLightButton";',
        description: "Use aqua.css traffic lights",
      },
      {
        // aqua.css reveals the ×/−/+ glyphs via a .traffic-lights:hover
        // container rule — tag the existing control group with that class.
        // --always-colored matches real Aqua: foreground windows show colored
        // orbs at rest (inactive state comes from .aqua-inactive per button).
        search: 'className="group/traffic flex items-center gap-2 ml-1.5 relative"',
        replace:
          'className="group/traffic traffic-lights traffic-lights--always-colored flex items-center gap-2 ml-1.5 relative"',
        description: "Tag titlebar control group as .traffic-lights",
      },
    ],
  });

  // Attach aqua.css component classes to ryOS's chrome so the library's own
  // component styles (not just bridged tokens) drive the rendering:
  // menu bar (.menu-bar incl. gloss layer), menu titles (.menu-title),
  // dropdown panels (.aqua-menu), dock shelf (.dock incl. reflection).
  applyPatch({
    file: "src/components/layout/menu-bar/MacTopMenuBar.tsx",
    patches: [
      {
        search:
          "className={`mac-top-menubar fixed top-0 left-0 right-0 flex items-center font-os-ui",
        replace:
          "className={`mac-top-menubar menu-bar fixed top-0 left-0 right-0 flex items-center font-os-ui",
        description: "Tag menu bar with aqua.css .menu-bar",
      },
    ],
  });
  applyPatch({
    file: "src/components/ui/menubar.tsx",
    patches: [
      {
        // Tag every menubar trigger (app menubars hardcode their own class
        // strings, so the shared MenubarTrigger component is the one place
        // that covers them all)
        search:
          'isMacOSTheme && "rounded-none data-[state=open]:bg-[var(--os-color-selection-bg)] data-[state=open]:text-[var(--os-color-selection-text)] data-[state=closed]:!bg-transparent data-[state=closed]:!text-inherit",',
        replace:
          'isMacOSTheme && "menu-title rounded-none data-[state=open]:bg-[var(--os-color-selection-bg)] data-[state=open]:text-[var(--os-color-selection-text)] data-[state=closed]:!bg-transparent data-[state=closed]:!text-inherit",',
        description: "Tag menubar triggers with aqua.css .menu-title",
      },
      {
        search:
          '"z-[10003] min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",',
        replace:
          '"aqua-menu z-[10003] min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",',
        description: "Tag menubar dropdowns with aqua.css .aqua-menu",
      },
    ],
  });
  applyPatch({
    file: "src/components/layout/dock/MacDock.tsx",
    patches: [
      {
        search: 'className="mac-dock-surface inline-flex items-end"',
        replace: 'className="mac-dock-surface dock inline-flex items-end"',
        description: "Tag dock shelf with aqua.css .dock",
      },
    ],
  });

  // aqua.css models classic Aqua (10.0–10.4): default the material to
  // "classic" so the skin isn't out-specified by the glass override sheet.
  // Users can still switch material in Control Panels.
  applyPatch({
    file: "src/themes/index.ts",
    patches: [
      {
        search: 'export const DEFAULT_AQUA_MATERIAL: AquaMaterial = "glass";',
        replace: 'export const DEFAULT_AQUA_MATERIAL: AquaMaterial = "classic";',
        description: "Default Aqua material to classic for the aqua.css skin",
      },
    ],
  });

  // Bundle the built aqua.css library if a dist directory was provided
  // (set AQUA_CSS_DIST; CI builds it from ahzs645/aqua.css, apply.sh builds
  // it from a sibling checkout). Fonts/icons must sit next to the CSS file
  // because the stylesheet references them with relative URLs.
  const aquaDist = process.env.AQUA_CSS_DIST;
  if (aquaDist && fs.existsSync(path.join(aquaDist, "aqua.scoped.css"))) {
    const destDir = path.join(ROOT, "public/aqua-css");
    fs.mkdirSync(destDir, { recursive: true });
    for (const entry of fs.readdirSync(aquaDist)) {
      const keep =
        entry === "aqua.scoped.css" ||
        entry === "aqua.scoped.css.map" ||
        entry === "progress.png" ||
        entry === "icon" ||
        /\.(woff2?|ttf|otf)$/i.test(entry);
      if (!keep) continue;
      fs.cpSync(path.join(aquaDist, entry), path.join(destDir, entry), {
        recursive: true,
      });
    }
    logSuccess(`Bundled aqua.scoped.css + assets from ${aquaDist}`);
  } else {
    logWarning(
      "AQUA_CSS_DIST not set (or aqua.scoped.css missing) — skin installed but the aqua.css stylesheet is not bundled; it will 404 until public/aqua-css/aqua.scoped.css exists"
    );
  }

  // Done!
  log("\n✨ Customizations applied successfully!\n", colors.green);
  log("Next steps:", colors.blue);
  log("  1. Copy .env.example to .env and fill in your values");
  log("  2. Edit content/persona.md with your AI persona");
  log("  3. Edit public/data/CV.yaml with your info");
  log("  4. Run 'bun run dev' to test\n");
}

main().catch(console.error);

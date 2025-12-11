import fs from "fs";
import path from "path";

/**
 * Configuration loader for ryOS
 * Reads from environment variables and markdown files
 */

// Cache for persona content
let personaCache: string | null = null;

/**
 * Get creator/branding configuration
 */
export function getCreatorConfig() {
  return {
    name: process.env.CREATOR_NAME || "Ryo Lu",
    url: process.env.CREATOR_URL || "https://ryo.lu",
    email: process.env.CREATOR_EMAIL || "me@ryo.lu",
    github: process.env.CREATOR_GITHUB || "https://github.com/ryokun6",
    copyrightStartYear: process.env.COPYRIGHT_START_YEAR || "1992",
  };
}

/**
 * Get AI assistant configuration
 */
export function getAIConfig() {
  return {
    name: process.env.AI_ASSISTANT_NAME || "Ryo",
    handle: process.env.AI_ASSISTANT_HANDLE || "ryo",
    personaPath: process.env.AI_PERSONA_PATH || "content/persona.md",
  };
}

/**
 * Get OS branding configuration
 */
export function getOSConfig() {
  return {
    name: process.env.OS_NAME || "ryOS",
    url: process.env.OS_URL || "https://os.ryo.lu",
    githubUrl: process.env.OS_GITHUB_URL || "https://github.com/ryokun6/ryos",
  };
}

/**
 * Get social links configuration
 */
export function getSocialConfig() {
  return {
    twitter: process.env.TWITTER_URL || "https://x.com/ryolu_",
    linkedin: process.env.LINKEDIN_URL || "",
  };
}

/**
 * Get browser/Internet Explorer configuration
 */
export function getBrowserConfig() {
  return {
    defaultUrl: process.env.BROWSER_DEFAULT_URL || "https://apple.com",
    defaultYear: process.env.BROWSER_DEFAULT_YEAR || "2001",
    passthroughDomains: (
      process.env.PASSTHROUGH_DOMAINS || "os.ryo.lu,ryo.lu"
    ).split(","),
    favoritePersonal: {
      title: process.env.FAVORITE_PERSONAL_TITLE || "Ryo",
      url: process.env.FAVORITE_PERSONAL_URL || "https://ryo.lu",
    },
  };
}

/**
 * Get default settings
 */
export function getDefaultSettings() {
  return {
    theme: process.env.DEFAULT_THEME || "macosx",
    language: process.env.DEFAULT_LANGUAGE || "en",
  };
}

/**
 * Load persona markdown content
 * Reads from the configured persona file path
 */
export function loadPersonaContent(): string {
  // Return cached content if available
  if (personaCache !== null) {
    return personaCache;
  }

  const aiConfig = getAIConfig();
  const personaPath = path.resolve(process.cwd(), aiConfig.personaPath);

  try {
    if (fs.existsSync(personaPath)) {
      personaCache = fs.readFileSync(personaPath, "utf-8");
      return personaCache;
    }
  } catch (error) {
    console.warn(`Failed to load persona from ${personaPath}:`, error);
  }

  // Return default persona if file not found
  const creator = getCreatorConfig();
  const social = getSocialConfig();

  personaCache = `# AI Persona Instructions

Your name is ${creator.name}.

## Contact
- Website: ${creator.url}
- Email: ${creator.email}
- Twitter/X: ${social.twitter}

## Communication Style
Keep responses concise and helpful.
`;

  return personaCache;
}

/**
 * Clear persona cache (useful for development/testing)
 */
export function clearPersonaCache(): void {
  personaCache = null;
}

/**
 * Get all configuration as a single object
 */
export function getAllConfig() {
  return {
    creator: getCreatorConfig(),
    ai: getAIConfig(),
    os: getOSConfig(),
    social: getSocialConfig(),
    browser: getBrowserConfig(),
    defaults: getDefaultSettings(),
  };
}

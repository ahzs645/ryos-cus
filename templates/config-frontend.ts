/**
 * Frontend configuration loader for ryOS
 * Reads from Vite environment variables (VITE_ prefix)
 */

/**
 * Helper to parse boolean env vars
 */
function parseBool(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === "") return defaultValue;
  return value.toLowerCase() === "true";
}

/**
 * Get creator/branding configuration
 */
export function getCreatorConfig() {
  return {
    name: import.meta.env.VITE_CREATOR_NAME || "Ryo Lu",
    url: import.meta.env.VITE_CREATOR_URL || "https://ryo.lu",
    email: import.meta.env.VITE_CREATOR_EMAIL || "me@ryo.lu",
    github: import.meta.env.VITE_CREATOR_GITHUB || "https://github.com/ryokun6",
    copyrightStartYear: import.meta.env.VITE_COPYRIGHT_START_YEAR || "1992",
  };
}

/**
 * Get AI assistant configuration
 */
export function getAIConfig() {
  return {
    name: import.meta.env.VITE_AI_ASSISTANT_NAME || "Ryo",
    handle: import.meta.env.VITE_AI_ASSISTANT_HANDLE || "ryo",
  };
}

/**
 * Get CV/Profile configuration
 */
export function getCVConfig() {
  return {
    // Path to CV YAML file (relative to public folder)
    yamlPath: import.meta.env.VITE_CV_YAML_PATH || "/data/CV.yaml",
    // How to display the name: "first", "last", "full", "custom"
    nameDisplayMode: import.meta.env.VITE_NAME_DISPLAY_MODE || "first",
    // Custom name to use when nameDisplayMode is "custom"
    customName: import.meta.env.VITE_CUSTOM_NAME || "",
    // Whether to use CV data for OS branding (if false, uses VITE_OS_FIRST_NAME)
    useCVForBranding: parseBool(import.meta.env.VITE_USE_CV_FOR_BRANDING, false),
  };
}

/**
 * Get OS branding configuration
 */
export function getOSConfig() {
  return {
    // Base name without theme suffix (e.g., "ahmadOS", "ryOS")
    name: import.meta.env.VITE_OS_NAME || "ryOS",
    // First name for "firstnameOS X" style branding (e.g., "ahmad" -> "ahmadOS X")
    // This is used as fallback when CV data is not loaded or useCVForBranding is false
    firstName: import.meta.env.VITE_OS_FIRST_NAME || "",
    // OS suffix to append after firstName (e.g., "OS" -> "ahmadOS")
    suffix: import.meta.env.VITE_OS_SUFFIX || "OS",
    // Suffix style: "themed" (adds X/7/98/XP based on theme), "none", or custom suffix
    suffixStyle: import.meta.env.VITE_OS_SUFFIX_STYLE || "themed",
    // Custom suffix when suffixStyle is not "themed" or "none" (e.g., "X", "XP")
    customSuffix: import.meta.env.VITE_OS_CUSTOM_SUFFIX || "",
    url: import.meta.env.VITE_OS_URL || "https://os.ryo.lu",
    githubUrl:
      import.meta.env.VITE_OS_GITHUB_URL || "https://github.com/ryokun6/ryos",
  };
}

/**
 * Get the full OS name with theme suffix
 * @param theme - Current theme (system7, macosx, win98, xp)
 * @returns The full branded OS name (e.g., "ahmadOS X", "ryOS 98")
 */
export function getFullOSName(theme?: string): string {
  const osConfig = getOSConfig();
  const baseName = osConfig.name;
  const suffixStyle = osConfig.suffixStyle;

  // If using firstName pattern, construct the name dynamically
  // e.g., firstName="ahmad" -> "ahmadOS" or with suffix "ahmadOS X"
  const displayName = osConfig.firstName
    ? `${osConfig.firstName}OS`
    : baseName;

  if (suffixStyle === "none") {
    return displayName;
  }

  if (suffixStyle === "themed" && theme) {
    const themeSuffixes: Record<string, string> = {
      system7: " 7",
      macosx: " X",
      win98: " 98",
      xp: " XP",
    };
    return displayName + (themeSuffixes[theme] || "");
  }

  // Custom suffix
  if (osConfig.customSuffix) {
    return `${displayName} ${osConfig.customSuffix}`;
  }

  return displayName;
}

/**
 * Get OS name without suffix (base name only)
 */
export function getBaseOSName(): string {
  const osConfig = getOSConfig();
  return osConfig.firstName ? `${osConfig.firstName}OS` : osConfig.name;
}

/**
 * Get social links configuration
 */
export function getSocialConfig() {
  return {
    twitter: import.meta.env.VITE_TWITTER_URL || "https://x.com/ryolu_",
    linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
  };
}

/**
 * Get browser/Internet Explorer configuration
 */
export function getBrowserConfig() {
  return {
    defaultUrl: import.meta.env.VITE_BROWSER_DEFAULT_URL || "https://apple.com",
    defaultYear: import.meta.env.VITE_BROWSER_DEFAULT_YEAR || "2001",
    passthroughDomains: (
      import.meta.env.VITE_PASSTHROUGH_DOMAINS || "os.ryo.lu,ryo.lu"
    ).split(","),
    favoritePersonal: {
      title: import.meta.env.VITE_FAVORITE_PERSONAL_TITLE || "Ryo",
      url: import.meta.env.VITE_FAVORITE_PERSONAL_URL || "https://ryo.lu",
    },
  };
}

/**
 * Get default settings
 */
export function getDefaultSettings() {
  return {
    theme: import.meta.env.VITE_DEFAULT_THEME || "macosx",
    language: import.meta.env.VITE_DEFAULT_LANGUAGE || "en",
  };
}

/**
 * Get feature flags for enabling/disabling functionality
 * Useful for static deployments without backend
 */
export function getFeatureFlags() {
  const staticMode = parseBool(import.meta.env.VITE_STATIC_MODE, false);

  // In static mode, disable all backend-dependent features
  if (staticMode) {
    return {
      staticMode: true,
      enableAIChat: false,
      enableChatRooms: false,
      enableIETimeTravel: false,
      enableVoiceInput: false,
      enableAIApplets: false,
      enablePCApp: true, // PC app works without backend
    };
  }

  return {
    staticMode: false,
    enableAIChat: parseBool(import.meta.env.VITE_ENABLE_AI_CHAT, true),
    enableChatRooms: parseBool(import.meta.env.VITE_ENABLE_CHAT_ROOMS, true),
    enableIETimeTravel: parseBool(import.meta.env.VITE_ENABLE_IE_TIME_TRAVEL, true),
    enableVoiceInput: parseBool(import.meta.env.VITE_ENABLE_VOICE_INPUT, true),
    enableAIApplets: parseBool(import.meta.env.VITE_ENABLE_AI_APPLETS, true),
    enablePCApp: parseBool(import.meta.env.VITE_ENABLE_PC_APP, true),
  };
}

/**
 * Get all configuration as a single object
 */
export function getAllConfig() {
  return {
    creator: getCreatorConfig(),
    ai: getAIConfig(),
    cv: getCVConfig(),
    os: getOSConfig(),
    social: getSocialConfig(),
    browser: getBrowserConfig(),
    defaults: getDefaultSettings(),
    features: getFeatureFlags(),
  };
}

// Export config singleton for convenience
export const config = getAllConfig();

// Export feature flags as a convenient shorthand
export const features = getFeatureFlags();

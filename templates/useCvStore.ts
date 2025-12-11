/**
 * CV Data Store for ryOS
 *
 * Zustand store for loading and managing CV/profile data from YAML.
 * Used for dynamic OS branding and user personalization.
 */

import { create } from 'zustand';
import {
  CVData,
  loadCVFromURL,
  getDefaultCVData,
  getFirstName,
  getLastName,
} from '@/utils/cvParser';

type NameDisplayMode = 'first' | 'last' | 'full' | 'custom';

interface CvState {
  // Raw CV data
  cvData: CVData | null;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadCV: (url?: string) => Promise<void>;
  setCvData: (data: CVData) => void;
  reset: () => void;

  // Computed getters
  getDisplayName: (mode?: NameDisplayMode, customName?: string) => string;
  getFullName: () => string;
  getEmail: () => string;
  getWebsite: () => string;
  getLocation: () => string;
  getSocialLinks: () => Array<{ network: string; url: string; username?: string }>;
}

const DEFAULT_CV_PATH = '/data/CV.yaml';

export const useCvStore = create<CvState>((set, get) => ({
  cvData: null,
  isLoaded: false,
  isLoading: false,
  error: null,

  loadCV: async (url?: string) => {
    const cvPath = url || import.meta.env.VITE_CV_YAML_PATH || DEFAULT_CV_PATH;

    set({ isLoading: true, error: null });

    try {
      const data = await loadCVFromURL(cvPath);
      set({
        cvData: data,
        isLoaded: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load CV data:', error);
      set({
        cvData: getDefaultCVData(),
        isLoaded: true,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load CV',
      });
    }
  },

  setCvData: (data: CVData) => {
    set({ cvData: data, isLoaded: true });
  },

  reset: () => {
    set({
      cvData: null,
      isLoaded: false,
      isLoading: false,
      error: null,
    });
  },

  getDisplayName: (mode?: NameDisplayMode, customName?: string) => {
    const { cvData } = get();
    const fullName = cvData?.cv?.name || '';

    // Get mode from env if not provided
    const displayMode = mode || (import.meta.env.VITE_NAME_DISPLAY_MODE as NameDisplayMode) || 'first';
    const fallbackCustomName = customName || import.meta.env.VITE_CUSTOM_NAME || 'User';

    switch (displayMode) {
      case 'first':
        return getFirstName(fullName) || fallbackCustomName;
      case 'last':
        return getLastName(fullName) || fallbackCustomName;
      case 'full':
        return fullName || fallbackCustomName;
      case 'custom':
        return fallbackCustomName;
      default:
        return getFirstName(fullName) || fallbackCustomName;
    }
  },

  getFullName: () => {
    const { cvData } = get();
    return cvData?.cv?.name || '';
  },

  getEmail: () => {
    const { cvData } = get();
    return cvData?.cv?.email || '';
  },

  getWebsite: () => {
    const { cvData } = get();
    return cvData?.cv?.website || '';
  },

  getLocation: () => {
    const { cvData } = get();
    return cvData?.cv?.location || '';
  },

  getSocialLinks: () => {
    const { cvData } = get();
    return cvData?.cv?.social || [];
  },
}));

/**
 * Hook to get OS name dynamically from CV data
 * Combines display name with OS suffix based on theme
 */
export function useOSName(theme?: string): string {
  const getDisplayName = useCvStore((state) => state.getDisplayName);
  const isLoaded = useCvStore((state) => state.isLoaded);

  // Get config values
  const osSuffix = import.meta.env.VITE_OS_SUFFIX || 'OS';
  const suffixStyle = import.meta.env.VITE_OS_SUFFIX_STYLE || 'themed';
  const customSuffix = import.meta.env.VITE_OS_CUSTOM_SUFFIX || '';

  // If CV not loaded yet, use config fallback
  const displayName = isLoaded ? getDisplayName() : (import.meta.env.VITE_OS_FIRST_NAME || 'ry');

  // Build base OS name (e.g., "ahmadOS")
  const baseName = `${displayName}${osSuffix}`;

  if (suffixStyle === 'none') {
    return baseName;
  }

  if (suffixStyle === 'themed' && theme) {
    const themeSuffixes: Record<string, string> = {
      system7: ' 7',
      macosx: ' X',
      win98: ' 98',
      xp: ' XP',
    };
    return baseName + (themeSuffixes[theme] || '');
  }

  // Custom suffix
  if (customSuffix) {
    return `${baseName} ${customSuffix}`;
  }

  return baseName;
}

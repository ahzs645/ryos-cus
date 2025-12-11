/**
 * CV YAML Parser for ryOS
 *
 * Parses CV data from YAML format (compatible with XPortfolio CV.yaml)
 * Used for dynamic OS branding based on user's name and other info.
 */

export interface CVSocial {
  network: string;
  username?: string;
  url: string;
}

export interface CVExperiencePosition {
  title: string;
  start_date?: string;
  end_date?: string;
  highlights?: string[];
}

export interface CVExperience {
  company: string;
  position?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  positions?: CVExperiencePosition[];
  highlights?: string[];
}

export interface CVEducation {
  institution: string;
  degree?: string;
  field?: string;
  start_date?: string;
  end_date?: string;
  highlights?: string[];
}

export interface CVData {
  cv: {
    name: string;
    location?: string;
    email?: string;
    phone?: string;
    website?: string;
    social?: CVSocial[];
    sections?: {
      experience?: CVExperience[];
      education?: CVEducation[];
      [key: string]: unknown[] | undefined;
    };
  };
}

/**
 * Parse CV YAML text into structured data
 * This is a simple YAML parser tailored for CV format
 */
export function parseCVYaml(yamlText: string): CVData {
  const lines = yamlText.split('\n');
  const result: CVData = { cv: { name: '', sections: {} } };

  let currentSection: string | null = null;
  let currentItem: Record<string, unknown> | null = null;
  let currentPosition: Record<string, unknown> | null = null;
  let inHighlights = false;
  let inPositions = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const indent = line.search(/\S/);

    if (!trimmed || trimmed.startsWith('#')) continue;

    // Handle basic CV info (name, email, etc.)
    if (indent === 2 && trimmed.includes(':') && !trimmed.startsWith('sections:')) {
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      if (value) {
        (result.cv as Record<string, unknown>)[key] = value;
      }
    }

    // Handle social array
    if (indent === 4 && trimmed.startsWith('- network:')) {
      if (!result.cv.social) result.cv.social = [];
      const network = trimmed.split(':')[1].trim();
      const social: CVSocial = { network, url: '' };
      result.cv.social.push(social);

      // Look ahead for username and url
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith('username:')) {
        social.username = lines[i + 1].split(':')[1].trim();
        i++;
      }
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith('url:')) {
        const urlLine = lines[i + 1];
        const colonIndex = urlLine.indexOf(':');
        social.url = urlLine.substring(colonIndex + 1).trim();
        i++;
      }
    }

    // Handle sections
    if (indent === 4 && trimmed.endsWith(':') && !trimmed.startsWith('-')) {
      currentSection = trimmed.slice(0, -1);
      result.cv.sections![currentSection] = [];
      currentItem = null;
      inHighlights = false;
      inPositions = false;
    }

    // Handle section items (experience)
    if (indent === 6 && trimmed.startsWith('- company:') && currentSection) {
      const company = trimmed.split(':')[1].trim();
      currentItem = { company };
      (result.cv.sections![currentSection] as Record<string, unknown>[]).push(currentItem);
      inHighlights = false;
      inPositions = false;
    }

    // Handle education items
    if (indent === 6 && trimmed.startsWith('- institution:') && currentSection) {
      const institution = trimmed.split(':')[1].trim();
      currentItem = { institution };
      (result.cv.sections![currentSection] as Record<string, unknown>[]).push(currentItem);
      inHighlights = false;
      inPositions = false;
    }

    // Handle item properties
    if (indent === 8 && currentItem && trimmed.includes(':')) {
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();

      if (key === 'positions') {
        currentItem[key] = [];
        inPositions = true;
        inHighlights = false;
      } else if (key === 'highlights') {
        currentItem[key] = [];
        inHighlights = true;
        inPositions = false;
      } else if (value) {
        currentItem[key] = value;
      }
    }

    // Handle positions array
    if (indent === 10 && inPositions && trimmed.startsWith('- title:')) {
      const title = trimmed.split(':')[1].trim();
      currentPosition = { title };
      (currentItem!.positions as Record<string, unknown>[]).push(currentPosition);
    }

    // Handle position properties
    if (indent === 12 && currentPosition && trimmed.includes(':')) {
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();

      if (key === 'highlights') {
        currentPosition[key] = [];
        // Look ahead for highlight items
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j];
          const nextTrimmed = nextLine.trim();
          const nextIndent = nextLine.search(/\S/);

          if (nextIndent === 14 && nextTrimmed.startsWith('- ')) {
            (currentPosition.highlights as string[]).push(nextTrimmed.substring(2));
            j++;
          } else {
            break;
          }
        }
        i = j - 1;
      } else if (value) {
        currentPosition[key] = value;
      }
    }

    // Handle highlights at item level
    if (indent === 10 && inHighlights && trimmed.startsWith('- ')) {
      (currentItem!.highlights as string[]).push(trimmed.substring(2));
    }
  }

  return result;
}

/**
 * Get default CV data structure for fallback
 */
export function getDefaultCVData(): CVData {
  return {
    cv: {
      name: 'User',
      location: '',
      email: '',
      website: '',
      social: [],
      sections: {
        experience: [],
        education: [],
      },
    },
  };
}

/**
 * Load CV data from a URL
 */
export async function loadCVFromURL(url: string): Promise<CVData> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch CV data from ${url}: ${response.status}`);
      return getDefaultCVData();
    }

    const yamlText = await response.text();
    return parseCVYaml(yamlText);
  } catch (error) {
    console.warn(`Error loading CV data from ${url}:`, error);
    return getDefaultCVData();
  }
}

/**
 * Extract first name from full name
 */
export function getFirstName(fullName: string): string {
  if (!fullName) return '';
  return fullName.split(' ')[0] || '';
}

/**
 * Extract last name from full name
 */
export function getLastName(fullName: string): string {
  if (!fullName) return '';
  const parts = fullName.split(' ');
  return parts[parts.length - 1] || '';
}

import { createContext } from 'react';

import type { TextSize } from '../types/accessibility-preferences';

export interface AccessibilityPreferencesContextValue {
  textSize: TextSize;
  setTextSize: (textSize: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (highContrast: boolean) => void;
}

export const AccessibilityPreferencesContext =
  createContext<AccessibilityPreferencesContextValue | undefined>(
    undefined,
  );
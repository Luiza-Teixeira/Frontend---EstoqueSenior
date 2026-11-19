import { useContext } from 'react';

import { AccessibilityPreferencesContext } from '../context/accessibility-preferences-context';

export function useAccessibilityPreferences() {
  const context = useContext(
    AccessibilityPreferencesContext,
  );

  if (!context) {
    throw new Error(
      'useAccessibilityPreferences deve ser usado dentro de AccessibilityPreferencesProvider.',
    );
  }

  return context;
}
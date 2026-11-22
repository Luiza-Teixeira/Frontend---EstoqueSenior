import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { TextSize } from '../types/accessibility-preferences';
import { AccessibilityPreferencesContext } from './accessibility-preferences-context';

interface AccessibilityPreferencesProviderProps {
  children: ReactNode;
}

const TEXT_SIZE_STORAGE_KEY =
  'estoque-senior-text-size';

const HIGH_CONTRAST_STORAGE_KEY =
  'estoque-senior-high-contrast';

function getInitialTextSize(): TextSize {
  const savedTextSize = localStorage.getItem(
    TEXT_SIZE_STORAGE_KEY,
  );

  if (
    savedTextSize === 'default' ||
    savedTextSize === 'large' ||
    savedTextSize === 'extra-large'
  ) {
    return savedTextSize;
  }

  return 'default';
}

function getInitialHighContrast() {
  return (
    localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) ===
    'true'
  );
}

export function AccessibilityPreferencesProvider({
  children,
}: AccessibilityPreferencesProviderProps) {
  const [textSize, setTextSize] =
    useState<TextSize>(getInitialTextSize);

  const [highContrast, setHighContrast] =
    useState(getInitialHighContrast);

  useEffect(() => {
    localStorage.setItem(
      TEXT_SIZE_STORAGE_KEY,
      textSize,
    );

    document.documentElement.dataset.textSize =
      textSize;
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem(
      HIGH_CONTRAST_STORAGE_KEY,
      String(highContrast),
    );

    document.documentElement.dataset.highContrast =
      String(highContrast);
  }, [highContrast]);

  const value = useMemo(
    () => ({
      textSize,
      setTextSize,
      highContrast,
      setHighContrast,
    }),
    [textSize, highContrast],
  );

  return (
    <AccessibilityPreferencesContext.Provider
      value={value}
    >
      {children}
    </AccessibilityPreferencesContext.Provider>
  );
}
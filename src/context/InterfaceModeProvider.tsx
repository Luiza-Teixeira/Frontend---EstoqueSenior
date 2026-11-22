import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { InterfaceMode } from '../types/interface-mode';
import { InterfaceModeContext } from './interface-mode-context';

interface InterfaceModeProviderProps {
  children: ReactNode;
}

const INTERFACE_MODE_STORAGE_KEY =
  'estoque-senior-interface-mode';

function getInitialMode(): InterfaceMode {
  const savedMode = localStorage.getItem(
    INTERFACE_MODE_STORAGE_KEY,
  );

  if (
    savedMode === 'standard' ||
    savedMode === 'simplified'
  ) {
    return savedMode;
  }

  return 'standard';
}

export function InterfaceModeProvider({
  children,
}: InterfaceModeProviderProps) {
  const [mode, setMode] =
    useState<InterfaceMode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem(
      INTERFACE_MODE_STORAGE_KEY,
      mode,
    );
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () =>
        setMode((currentMode) =>
          currentMode === 'standard'
            ? 'simplified'
            : 'standard',
        ),
    }),
    [mode],
  );

  return (
    <InterfaceModeContext.Provider value={value}>
      {children}
    </InterfaceModeContext.Provider>
  );
}
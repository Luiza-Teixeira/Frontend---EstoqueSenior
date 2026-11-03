import { useMemo, useState, type ReactNode } from 'react';

import type { InterfaceMode } from '../types/interface-mode';
import { InterfaceModeContext } from './interface-mode-context';

interface InterfaceModeProviderProps {
  children: ReactNode;
}

export function InterfaceModeProvider({
  children,
}: InterfaceModeProviderProps) {
  const [mode, setMode] = useState<InterfaceMode>('standard');

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () =>
        setMode((currentMode) =>
          currentMode === 'standard' ? 'simplified' : 'standard',
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
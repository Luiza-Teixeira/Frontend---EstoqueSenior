import { createContext } from 'react';

import type { InterfaceMode } from '../types/interface-mode';

export interface InterfaceModeContextValue {
  mode: InterfaceMode;
  setMode: (mode: InterfaceMode) => void;
  toggleMode: () => void;
}

export const InterfaceModeContext =
  createContext<InterfaceModeContextValue | undefined>(undefined);
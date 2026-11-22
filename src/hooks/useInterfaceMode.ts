import { useContext } from 'react';

import { InterfaceModeContext } from '../context/interface-mode-context';

export function useInterfaceMode() {
  const context = useContext(InterfaceModeContext);

  if (!context) {
    throw new Error(
      'useInterfaceMode must be used inside InterfaceModeProvider',
    );
  }

  return context;
}
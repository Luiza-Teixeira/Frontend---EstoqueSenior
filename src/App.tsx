import { BrowserRouter } from 'react-router-dom';

import { AccessibilityPreferencesProvider } from './context/AccessibilityPreferencesProvider';
import { InterfaceModeProvider } from './context/InterfaceModeProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <AccessibilityPreferencesProvider>
      <InterfaceModeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </InterfaceModeProvider>
    </AccessibilityPreferencesProvider>
  );
}

export default App;
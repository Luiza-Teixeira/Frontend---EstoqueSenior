import { BrowserRouter } from 'react-router-dom';

import { AccessibilityPreferencesProvider } from './context/AccessibilityPreferencesProvider';
import { AuthProvider } from './context/AuthProvider';
import { InterfaceModeProvider } from './context/InterfaceModeProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <AccessibilityPreferencesProvider>
      <InterfaceModeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </InterfaceModeProvider>
    </AccessibilityPreferencesProvider>
  );
}

export default App;

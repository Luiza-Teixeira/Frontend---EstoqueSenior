import { BrowserRouter } from 'react-router-dom';

import { InterfaceModeProvider } from './context/InterfaceModeProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <InterfaceModeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </InterfaceModeProvider>
  );
}

export default App;
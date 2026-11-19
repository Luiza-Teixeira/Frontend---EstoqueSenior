import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AppLayout } from '../components/layout/AppLayout';
import { PlaceholderPage } from '../components/ui/PlaceholderPage';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';
import { HomePage } from '../features/home/pages/HomePage';
import { SettingsPage } from '../features/preferences/pages/SettingsPage';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
      <Route path="/redefinir-senha" element={<ResetPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/produtos"
            element={
              <PlaceholderPage
                title="Produtos"
                description="Gerenciamento de produtos."
              />
            }
          />

          <Route
            path="/estoque"
            element={
              <PlaceholderPage
                title="Estoque"
                description="Consulta e movimentação de estoque."
              />
            }
          />

          <Route
            path="/vendas"
            element={
              <PlaceholderPage
                title="Vendas"
                description="Registro de vendas."
              />
            }
          />

          <Route
            path="/historico"
            element={
              <PlaceholderPage
                title="Histórico"
                description="Histórico de movimentações."
              />
            }
          />

          <Route path="/configuracoes" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

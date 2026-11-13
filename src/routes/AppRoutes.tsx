import { Route, Routes } from 'react-router-dom';

import { AppLayout } from '../components/layout/AppLayout';
import { PlaceholderPage } from '../components/ui/PlaceholderPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { SettingsPage } from '../features/preferences/pages/SettingsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <PlaceholderPage
              title="Início"
              description="Visão inicial do Estoque Sênior."
            />
          }
        />

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

        <Route
          path="/configuracoes"
          element={
            <SettingsPage
            />
          }
        />
      </Route>

      <Route 
        path="/login" 
        element={
          <LoginPage/>
        } 
      />
    </Routes>
  );
}
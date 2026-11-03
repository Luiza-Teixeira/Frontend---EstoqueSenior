import { NavLink, Outlet } from 'react-router-dom';

import { useInterfaceMode } from '../../hooks/useInterfaceMode';

const navigationItems = [
  { to: '/', label: 'Início' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/estoque', label: 'Estoque' },
  { to: '/vendas', label: 'Vendas' },
  { to: '/historico', label: 'Histórico' },
];

export function AppLayout() {
  const { mode, toggleMode } = useInterfaceMode();

  const isSimplified = mode === 'simplified';

  return (
    <>
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo principal
      </a>

      <header className="app-header">
        <div>
          <strong>Estoque Sênior</strong>
          <span className="mode-label">
            {isSimplified ? 'Modo Simplificado' : 'Modo Padrão'}
          </span>
        </div>

        <button type="button" onClick={toggleMode}>
          {isSimplified
            ? 'Usar modo padrão'
            : 'Usar modo simplificado'}
        </button>
      </header>

      <nav className="main-navigation" aria-label="Navegação principal">
        {navigationItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main id="main-content" className="app-main">
        <Outlet />
      </main>
    </>
  );
}
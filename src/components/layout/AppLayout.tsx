import { NavLink, Outlet } from 'react-router-dom';

import { useInterfaceMode } from '../../hooks/useInterfaceMode';
import './app-layout.css';

type IconName =
  | 'home'
  | 'products'
  | 'inventory'
  | 'sales'
  | 'history'
  | 'settings'
  | 'logout';

interface NavigationItem {
  to: string;
  label: string;
  icon: IconName;
}

const navigationItems: NavigationItem[] = [
  { to: '/', label: 'Início', icon: 'home' },
  { to: '/produtos', label: 'Produtos', icon: 'products' },
  { to: '/estoque', label: 'Estoque', icon: 'inventory' },
  { to: '/vendas', label: 'Vendas', icon: 'sales' },
  { to: '/historico', label: 'Histórico', icon: 'history' },
];

function NavigationIcon({ name }: { name: IconName }) {
  const commonProps = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'home') {
    return (
      <svg {...commonProps}>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10.5V20h13v-9.5" />
        <path d="M9.5 20v-6h5v6" />
      </svg>
    );
  }

  if (name === 'products') {
    return (
      <svg {...commonProps}>
        <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
        <path d="M4 7.5V16l8 5 8-5V7.5" />
        <path d="M12 12v9" />
      </svg>
    );
  }

  if (name === 'inventory') {
    return (
      <svg {...commonProps}>
        <path d="M4 7h16" />
        <path d="M5 7l1 13h12l1-13" />
        <path d="M8 11h8" />
        <path d="M9 4h6l1 3H8l1-3Z" />
      </svg>
    );
  }

  if (name === 'sales') {
    return (
      <svg {...commonProps}>
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M3 4h2l2.5 11h10l2-8H6" />
      </svg>
    );
  }

  if (name === 'history') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </svg>
    );
  }

  if (name === 'settings') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.12-1.28l2-1.55-2-3.46-2.4.97A7 7 0 0 0 14.3 5.4L14 3h-4l-.3 2.4a7 7 0 0 0-2.18 1.28l-2.4-.97-2 3.46 2 1.55A7 7 0 0 0 5 12c0 .44.04.87.12 1.28l-2 1.55 2 3.46 2.4-.97A7 7 0 0 0 9.7 18.6L10 21h4l.3-2.4a7 7 0 0 0 2.18-1.28l2.4.97 2-3.46-2-1.55A7 7 0 0 0 19 12Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M10 5H5v14h5" />
      <path d="m14 8 4 4-4 4" />
      <path d="M18 12H9" />
    </svg>
  );
}

function BrandIcon() {
  return (
    <svg
      className="sidebar-brand-icon"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path d="M32 5 55 18 32 31 9 18 32 5Z" fill="#B7DCFF" />
      <path d="M9 18 32 31 32 58 9 45V18Z" fill="#62A8E8" />
      <path d="M55 18 32 31 32 58 55 45V18Z" fill="#FFFFFF" />
    </svg>
  );
}

export function AppLayout() {
  const { mode, toggleMode } = useInterfaceMode();

  const isSimplified = mode === 'simplified';

  return (
    <div
      className={`app-shell ${
        isSimplified ? 'app-shell--simplified' : ''
      }`}
    >
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo principal
      </a>

      <aside className="app-sidebar">
        <div>
          <div className="sidebar-brand">
            <BrandIcon />

            <div>
              <strong>Estoque</strong>
              <strong>Sênior</strong>
            </div>
          </div>

          <div className="sidebar-mode">
            {isSimplified ? 'Modo Simplificado' : 'Modo Padrão'}
          </div>

          <nav
            className="sidebar-navigation"
            aria-label="Navegação principal"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? 'sidebar-link--active' : ''
                  }`
                }
              >
                <NavigationIcon name={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <NavLink
            to="/configuracoes"
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'sidebar-link--active' : ''
              }`
            }
          >
            <NavigationIcon name="settings" />
            <span>Configurações</span>
          </NavLink>

          <button className="sidebar-link sidebar-logout" type="button">
            <NavigationIcon name="logout" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <div className="app-content-area">
        <header className="content-header">
          <div className="content-header-mode">
            <span>Interface atual</span>
            <strong>
              {isSimplified ? 'Simplificada' : 'Padrão'}
            </strong>
          </div>

          <button
            className="mode-switch-button"
            type="button"
            onClick={toggleMode}
          >
            {isSimplified
              ? 'Usar modo padrão'
              : 'Usar modo simplificado'}
          </button>
        </header>

        <main id="main-content" className="shell-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
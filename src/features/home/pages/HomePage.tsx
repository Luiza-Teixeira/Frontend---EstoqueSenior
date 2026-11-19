import {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import { useInterfaceMode } from '../../../hooks/useInterfaceMode';
import { ApiError } from '../../../services/api';
import {
  getDashboardSummary,
  type DashboardSummary,
} from '../services/dashboard-service';
import '../styles/home.css';

type HomeIconProps = {
  className?: string;
};

function ProductIcon({ className }: HomeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 4.5 7.2 12 11.4l7.5-4.2L12 3Z" />
      <path d="M4.5 7.2v8.6L12 20l7.5-4.2V7.2" />
      <path d="M12 11.4V20" />
    </svg>
  );
}

function InventoryIcon({ className }: HomeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8h16v11H4z" />
      <path d="M7 5h10l2 3H5l2-3Z" />
      <path d="M8 12h3v3H8z" />
      <path d="M13 12h3v3h-3z" />
    </svg>
  );
}

function SaleIcon({ className }: HomeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4h2l2.1 9.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L20 8H6.2" />
      <circle cx="9.5" cy="19" r="1.2" />
      <circle cx="17" cy="19" r="1.2" />
    </svg>
  );
}

function HistoryIcon({ className }: HomeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function RevenueIcon({ className }: HomeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 12h10" />
      <path d="M12 8v8" />
      <path d="M15 9.5c-.6-.8-1.6-1.2-3-1.2-1.7 0-2.8.7-2.8 1.8 0 2.7 5.6 1.2 5.6 3.8 0 1.1-1.1 1.8-2.8 1.8-1.4 0-2.5-.4-3.1-1.3" />
    </svg>
  );
}

const quickActions = [
  {
    to: '/produtos',
    label: 'Produtos',
    simplifiedLabel: 'Gerenciar produtos',
    Icon: ProductIcon,
  },
  {
    to: '/estoque',
    label: 'Estoque',
    simplifiedLabel: 'Controlar estoque',
    Icon: InventoryIcon,
  },
  {
    to: '/vendas',
    label: 'Vendas',
    simplifiedLabel: 'Realizar vendas',
    Icon: SaleIcon,
  },
  {
    to: '/historico',
    label: 'Histórico',
    simplifiedLabel: 'Ver histórico',
    Icon: HistoryIcon,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value ?? 0);
}

function SimplifiedHome({ firstName }: { firstName?: string }) {
  return (
    <section className="home-page home-page--simplified" aria-labelledby="home-title">
      <header className="home-heading">
        <span className="home-kicker">Início</span>
        <h1 id="home-title">
          {firstName ? `Olá, ${firstName}!` : 'Início'}
        </h1>
        <p>O que você deseja fazer?</p>
      </header>

      <div className="simplified-actions" aria-label="Ações principais">
        {quickActions.map((action) => {
          const { Icon } = action;

          return (
            <Link key={action.to} to={action.to} className="simplified-action-card">
              <Icon className="home-action-icon" />
              <strong>{action.simplifiedLabel}</strong>
              <span className="home-action-arrow" aria-hidden="true">›</span>
            </Link>
          );
        })}
      </div>

      <aside className="home-tip">
        <span aria-hidden="true">i</span>
        <p>
          <strong>Dica</strong>
          Use as opções acima para acessar as principais funções do sistema.
        </p>
      </aside>
    </section>
  );
}

function StandardHome({ firstName }: { firstName?: string }) {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getDashboardSummary()
      .then((data) => {
        if (isMounted) setSummary(data);
      })
      .catch((error: unknown) => {
        if (!isMounted) return;

        if (error instanceof ApiError) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Não foi possível carregar o resumo do dia.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = [
    {
      label: 'Produtos cadastrados',
      value: summary?.totalProdutosCadastrados ?? '—',
      Icon: ProductIcon,
    },
    {
      label: 'Estoque baixo',
      value: summary?.quantidadeProdutosEstoqueBaixo ?? '—',
      Icon: InventoryIcon,
    },
    {
      label: 'Vendas hoje',
      value: summary?.quantidadeVendasDia ?? '—',
      Icon: SaleIcon,
    },
    {
      label: 'Total vendido hoje',
      value: summary
        ? formatCurrency(summary.valorTotalVendidoDia)
        : '—',
      Icon: RevenueIcon,
    },
  ];

  return (
    <section className="home-page" aria-labelledby="home-title">
      <header className="home-heading">
        <span className="home-kicker">Visão geral</span>
        <h1 id="home-title">Início</h1>
        <p>
          {firstName
            ? `Bem-vindo(a), ${firstName}, ao Estoque Sênior!`
            : 'Bem-vindo(a) ao Estoque Sênior!'}
        </p>
      </header>

      {errorMessage && (
        <p className="home-status-message" role="status">
          {errorMessage}
        </p>
      )}

      <div className="dashboard-cards" aria-busy={isLoading}>
        {cards.map((card) => {
          const { Icon } = card;

          return (
            <article key={card.label} className="dashboard-card">
              <Icon className="dashboard-card-icon" />
              <strong>{isLoading ? '...' : card.value}</strong>
              <span>{card.label}</span>
            </article>
          );
        })}
      </div>

      <section className="quick-access" aria-labelledby="quick-access-title">
        <h2 id="quick-access-title">Acesso rápido</h2>
        <div className="quick-access-grid">
          {quickActions.map((action) => {
            const { Icon } = action;

            return (
              <Link key={action.to} to={action.to} className="quick-access-card">
                <Icon className="home-action-icon" />
                <strong>{action.label}</strong>
                <span className="home-action-arrow" aria-hidden="true">›</span>
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export function HomePage() {
  const { mode } = useInterfaceMode();
  const { user } = useAuth();
  const firstName = user?.nome?.trim().split(/\s+/)[0];

  if (mode === 'simplified') {
    return <SimplifiedHome firstName={firstName} />;
  }

  return <StandardHome firstName={firstName} />;
}

import {
  useEffect,
  useState,
  type SubmitEvent,
} from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { useAccessibilityPreferences } from '../../../hooks/useAccessibilityPreferences';
import { useAuth } from '../../../hooks/useAuth';
import { useInterfaceMode } from '../../../hooks/useInterfaceMode';
import { ApiError } from '../../../services/api';
import {
  getCurrentUser,
  updateProfile,
} from '../../auth/services/auth-service';
import type { TextSize } from '../../../types/accessibility-preferences';
import '../styles/settings.css';

type SettingsTab = 'profile' | 'accessibility';

interface TextSizeOption {
  value: TextSize;
  label: string;
  description: string;
  preview: string;
}

const textSizeOptions: TextSizeOption[] = [
  {
    value: 'default',
    label: 'Padrão',
    description: 'Tamanho normal dos textos do sistema.',
    preview: 'Aa',
  },
  {
    value: 'large',
    label: 'Grande',
    description: 'Aumenta os textos para facilitar a leitura.',
    preview: 'Aa',
  },
  {
    value: 'extra-large',
    label: 'Muito grande',
    description: 'Amplia ainda mais os textos da interface.',
    preview: 'Aa',
  },
];

export function SettingsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, setUser } = useAuth();
  const { mode, setMode } = useInterfaceMode();
  const {
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
  } = useAccessibilityPreferences();

  const activeTab: SettingsTab =
    searchParams.get('aba') === 'acessibilidade'
      ? 'accessibility'
      : 'profile';
  const [name, setName] = useState(user?.nome ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(() => !user);

  const isSimplified = mode === 'simplified';

  useEffect(() => {
    let isMounted = true;

    getCurrentUser()
      .then((currentUser) => {
        if (!isMounted) return;
        setUser(currentUser);
        setName(currentUser.nome);
        setEmail(currentUser.email);
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        if (error instanceof ApiError) {
          setProfileError(error.message);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingProfile(false);
      });

    return () => {
      isMounted = false;
    };
  }, [setUser]);


  function handleTabChange(tab: SettingsTab) {
    const nextParams = new URLSearchParams(searchParams);

    if (tab === 'accessibility') {
      nextParams.set('aba', 'acessibilidade');
    } else {
      nextParams.delete('aba');
    }

    setSearchParams(nextParams, { replace: true });
  }

  async function handleProfileSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    setProfileError('');
    setProfileSuccess('');

    if (!normalizedName) {
      setProfileError('Informe seu nome.');
      return;
    }

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setProfileError('Informe um e-mail válido.');
      return;
    }

    setIsSavingProfile(true);

    try {
      const updatedUser = await updateProfile({
        nome: normalizedName,
        email: normalizedEmail,
      });

      setUser(updatedUser);
      setName(updatedUser.nome);
      setEmail(updatedUser.email);
      setProfileSuccess('Perfil atualizado com sucesso.');
    } catch (error) {
      if (error instanceof ApiError) {
        setProfileError(error.message);
      } else {
        setProfileError('Não foi possível atualizar o perfil.');
      }
    } finally {
      setIsSavingProfile(false);
    }
  }

  return (
    <section
      className={`settings-page ${
        isSimplified ? 'settings-page--simplified' : ''
      }`}
      aria-labelledby="settings-title"
    >
      <header className="settings-header">
        <div>
          <span className="settings-kicker">Personalização</span>
          <h1 id="settings-title">Configurações</h1>
          <p>
            Gerencie seus dados e ajuste o sistema para uma experiência
            mais confortável e fácil de usar.
          </p>
        </div>

        <div className="settings-status" aria-live="polite">
          <span>Modo atual</span>
          <strong>{isSimplified ? 'Simplificado' : 'Padrão'}</strong>
        </div>
      </header>

      <div className="settings-tabs" aria-label="Áreas de configuração">
        <button
          type="button"
          className={activeTab === 'profile' ? 'settings-tab-active' : ''}
          aria-pressed={activeTab === 'profile'}
          onClick={() => handleTabChange('profile')}
        >
          Perfil
        </button>

        <button
          type="button"
          className={activeTab === 'accessibility' ? 'settings-tab-active' : ''}
          aria-pressed={activeTab === 'accessibility'}
          onClick={() => handleTabChange('accessibility')}
        >
          Acessibilidade
        </button>
      </div>

      {activeTab === 'profile' ? (
        <section className="settings-panel" aria-labelledby="profile-title">
          <div className="settings-panel-heading">
            <div className="settings-panel-icon" aria-hidden="true">👤</div>
            <div>
              <h2 id="profile-title">Meu perfil</h2>
              <p>Gerencie suas informações pessoais de acesso.</p>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleProfileSubmit} noValidate>
            <div className="profile-field">
              <label htmlFor="profile-name">Nome completo</label>
              <input
                id="profile-name"
                value={name}
                disabled={isSavingProfile || isLoadingProfile}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-email">E-mail</label>
              <input
                id="profile-email"
                type="email"
                value={email}
                disabled={isSavingProfile || isLoadingProfile}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="profile-password-card">
              <div>
                <strong>Senha</strong>
                <p>
                  Por segurança, a troca de senha é feita pelo fluxo de
                  redefinição enviado ao seu e-mail.
                </p>
              </div>
              <button
                type="button"
                className="settings-secondary-action"
                onClick={() => navigate('/esqueci-senha')}
              >
                Alterar senha
              </button>
            </div>

            {profileError && (
              <p className="settings-message settings-message--error" role="alert">
                {profileError}
              </p>
            )}

            {profileSuccess && (
              <p className="settings-message settings-message--success" role="status">
                {profileSuccess}
              </p>
            )}

            <div className="profile-actions">
              <button
                type="submit"
                className="settings-primary-action"
                disabled={isSavingProfile || isLoadingProfile}
              >
                {isSavingProfile ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          </form>
        </section>
      ) : (
        <>
          <section className="settings-panel" aria-labelledby="interface-mode-title">
            <div className="settings-panel-heading">
              <div className="settings-panel-icon" aria-hidden="true">Aa</div>
              <div>
                <h2 id="interface-mode-title">Preferência de interface</h2>
                <p>Escolha como você deseja visualizar e utilizar o sistema.</p>
              </div>
            </div>

            <fieldset className="mode-fieldset">
              <legend className="sr-only">Escolha o modo da interface</legend>
              <div className="mode-options">
                <label
                  className={`mode-card ${
                    mode === 'standard' ? 'mode-card--selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="interface-mode"
                    value="standard"
                    checked={mode === 'standard'}
                    onChange={() => setMode('standard')}
                  />
                  <span className="custom-radio" aria-hidden="true" />
                  <div>
                    <strong>Modo Padrão</strong>
                    <p>Mais controles e informações disponíveis ao mesmo tempo.</p>
                    <small>Ideal para quem já possui familiaridade com sistemas.</small>
                  </div>
                </label>

                <label
                  className={`mode-card ${
                    mode === 'simplified' ? 'mode-card--selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="interface-mode"
                    value="simplified"
                    checked={mode === 'simplified'}
                    onChange={() => setMode('simplified')}
                  />
                  <span className="custom-radio" aria-hidden="true" />
                  <div>
                    <strong>Modo Simplificado</strong>
                    <p>Menos opções por vez, textos maiores e ações mais diretas.</p>
                    <small>Ideal para quem prefere uma navegação mais simples.</small>
                  </div>
                </label>
              </div>
            </fieldset>
          </section>

          <section className="settings-panel" aria-labelledby="text-size-title">
            <div className="settings-panel-heading">
              <div className="settings-panel-icon" aria-hidden="true">T</div>
              <div>
                <h2 id="text-size-title">Tamanho do texto</h2>
                <p>Ajuste o tamanho das letras em todo o sistema.</p>
              </div>
            </div>

            <fieldset className="mode-fieldset">
              <legend className="sr-only">Escolha o tamanho dos textos</legend>
              <div className="text-size-options">
                {textSizeOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`text-size-card ${
                      textSize === option.value ? 'text-size-card--selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="text-size"
                      value={option.value}
                      checked={textSize === option.value}
                      onChange={() => setTextSize(option.value)}
                    />
                    <span
                      className={`text-size-preview text-size-preview--${option.value}`}
                      aria-hidden="true"
                    >
                      {option.preview}
                    </span>
                    <div>
                      <strong>{option.label}</strong>
                      <p>{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>

          <section className="settings-panel" aria-labelledby="contrast-title">
            <div className="settings-panel-heading">
              <div className="settings-panel-icon" aria-hidden="true">◐</div>
              <div>
                <h2 id="contrast-title">Alto contraste</h2>
                <p>Aumente a diferença entre textos, controles e fundos.</p>
              </div>
            </div>

            <label className="contrast-option">
              <div>
                <strong>Usar alto contraste</strong>
                <p>
                  Usa cores mais fortes para facilitar a identificação dos
                  elementos da interface.
                </p>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(event) => setHighContrast(event.target.checked)}
              />
              <span className="contrast-switch" aria-hidden="true" />
            </label>
          </section>

          <aside className="settings-accessibility-tip">
            <div aria-hidden="true">i</div>
            <p>
              <strong>Dica:</strong> essas preferências alteram apenas a forma
              como o sistema é apresentado. Produtos, vendas e informações do
              estoque continuam iguais.
            </p>
          </aside>
        </>
      )}
    </section>
  );
}

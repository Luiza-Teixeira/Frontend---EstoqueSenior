import { useState, type SubmitEvent } from 'react';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import '../styles/login.css';

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="input-icon"
    >
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-7 2.2-7 5v1h14v-1c0-2.8-3-5-7-5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="input-icon"
    >
      <path
        d="M8 10V8a4 4 0 1 1 8 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="input-icon eye-icon"
    >
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function EnterIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="button-icon"
    >
      <path
        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17l5-5-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12H3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberAccess, setRememberAccess] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    let hasError = false;

    setEmailError('');
    setPasswordError('');

    if (!normalizedEmail) {
      setEmailError('Informe seu e-mail.');
      hasError = true;
    } else if (!normalizedEmail.includes('@')) {
      setEmailError('Informe um e-mail válido.');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Informe sua senha.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    console.log({
      email: normalizedEmail,
      password,
      rememberAccess,
    });
  }

  return (
    <main className="login-page">
      <section
        className="login-wrapper"
        aria-labelledby="login-title"
      >
        <div className="login-card">
          <div
            className="corner-shape corner-top-left"
            aria-hidden="true"
          />

          <div
            className="corner-shape corner-bottom-right"
            aria-hidden="true"
          />

          <header className="login-header">
            <div className="brand-block">
              <BrandLogo
                variant="light"
                className="brand-logo"
              />

              <div className="brand-text-block">
                <h1
                  id="login-title"
                  className="brand-title"
                >
                  Estoque Sênior
                </h1>
              </div>
            </div>

            <p className="brand-subtitle">
              Gerencie seu estoque de forma simples
              <br />
              e acessível.
            </p>
          </header>

          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="field-group">
              <label
                className="sr-only"
                htmlFor="email"
              >
                E-mail
              </label>

              <div className="input-shell">
                <UserIcon />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (emailError) {
                      setEmailError('');
                    }
                  }}
                  placeholder="E-mail"
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={
                    emailError ? 'email-error' : undefined
                  }
                />
              </div>

              {emailError && (
                <p
                  id="email-error"
                  className="field-error"
                  role="alert"
                >
                  {emailError}
                </p>
              )}
            </div>

            <div className="field-group">
              <label
                className="sr-only"
                htmlFor="password"
              >
                Senha
              </label>

              <div className="input-shell">
                <LockIcon />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);

                    if (passwordError) {
                      setPasswordError('');
                    }
                  }}
                  placeholder="Senha"
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={
                    passwordError
                      ? 'password-error'
                      : undefined
                  }
                />

                <button
                  type="button"
                  className="icon-button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? 'Ocultar senha'
                      : 'Mostrar senha'
                  }
                  aria-pressed={showPassword}
                >
                  <EyeIcon />
                </button>
              </div>

              {passwordError && (
                <p
                  id="password-error"
                  className="field-error"
                  role="alert"
                >
                  {passwordError}
                </p>
              )}
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberAccess}
                  onChange={(event) =>
                    setRememberAccess(event.target.checked)
                  }
                />

                <span>Lembrar meu acesso</span>
              </label>

              <button
                type="button"
                className="text-link"
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              className="primary-button"
              type="submit"
            >
              <EnterIcon />
              <span>Entrar</span>
            </button>

            <button
              className="secondary-button"
              type="button"
            >
              Criar uma conta
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
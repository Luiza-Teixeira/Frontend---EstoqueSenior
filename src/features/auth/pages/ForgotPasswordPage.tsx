import {
  useState,
  type SubmitEvent,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { BrandLogo } from '../../../components/ui/BrandLogo';
import { ApiError } from '../../../services/api';
import { forgotPassword } from '../services/auth-service';
import '../styles/login.css';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    setEmailError('');
    setApiError('');
    setSuccessMessage('');

    if (!normalizedEmail) {
      setEmailError('Informe seu e-mail.');
      return;
    }

    if (!normalizedEmail.includes('@')) {
      setEmailError('Informe um e-mail válido.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword({ email: normalizedEmail });
      setSuccessMessage(
        response.mensagem ??
          response.message ??
          'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.',
      );
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError('Não foi possível solicitar a recuperação de senha.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page auth-page">
      <section className="login-wrapper auth-wrapper" aria-labelledby="forgot-title">
        <div className="login-card auth-card">
          <div className="corner-shape corner-top-left" aria-hidden="true" />
          <div className="corner-shape corner-bottom-right" aria-hidden="true" />

          <header className="auth-header auth-header--centered">
            <BrandLogo variant="light" className="auth-small-logo" />
            <div>
              <h1 id="forgot-title">Recuperar senha</h1>
              <p>Informe seu e-mail para receber as instruções de redefinição.</p>
            </div>
          </header>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="forgot-email">E-mail</label>
              <input
                id="forgot-email"
                className="auth-input"
                type="email"
                value={email}
                disabled={isLoading}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                aria-invalid={Boolean(emailError)}
              />
              {emailError && <p className="field-error" role="alert">{emailError}</p>}
            </div>

            {apiError && <p className="login-api-error" role="alert">{apiError}</p>}
            {successMessage && <p className="auth-success" role="status">{successMessage}</p>}

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar instruções'}
            </button>

            <button
              className="secondary-button"
              type="button"
              disabled={isLoading}
              onClick={() => navigate('/login')}
            >
              Voltar ao login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

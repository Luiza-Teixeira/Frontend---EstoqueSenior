import {
  useState,
  type SubmitEvent,
} from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { BrandLogo } from '../../../components/ui/BrandLogo';
import { ApiError } from '../../../services/api';
import { resetPassword } from '../services/auth-service';
import '../styles/login.css';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');

    if (!token) {
      setErrorMessage('O link de redefinição é inválido ou está incompleto.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('A confirmação precisa ser igual à nova senha.');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({
        token,
        novaSenha: password,
        confirmacaoSenha: confirmPassword,
      });

      navigate('/login', {
        replace: true,
        state: {
          successMessage: 'Senha redefinida com sucesso. Entre com sua nova senha.',
        },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Não foi possível redefinir a senha.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page auth-page">
      <section className="login-wrapper auth-wrapper" aria-labelledby="reset-title">
        <div className="login-card auth-card">
          <div className="corner-shape corner-top-left" aria-hidden="true" />
          <div className="corner-shape corner-bottom-right" aria-hidden="true" />

          <header className="auth-header auth-header--centered">
            <BrandLogo variant="light" className="auth-small-logo" />
            <div>
              <h1 id="reset-title">Definir nova senha</h1>
              <p>Escolha uma nova senha para sua conta.</p>
            </div>
          </header>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="new-password">Nova senha</label>
              <input
                id="new-password"
                className="auth-input"
                type="password"
                value={password}
                disabled={isLoading}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className="field-group">
              <label htmlFor="confirm-new-password">Confirmar nova senha</label>
              <input
                id="confirm-new-password"
                className="auth-input"
                type="password"
                value={confirmPassword}
                disabled={isLoading}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
              />
            </div>

            {errorMessage && <p className="login-api-error" role="alert">{errorMessage}</p>}

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Redefinir senha'}
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

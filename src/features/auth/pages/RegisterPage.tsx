import {
  useState,
  type SubmitEvent,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { BrandLogo } from '../../../components/ui/BrandLogo';
import { ApiError } from '../../../services/api';
import { register } from '../services/auth-service';
import '../styles/login.css';

export function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const nextErrors: Record<string, string> = {};

    if (!normalizedName) nextErrors.name = 'Informe seu nome completo.';
    if (!normalizedEmail) {
      nextErrors.email = 'Informe seu e-mail.';
    } else if (!normalizedEmail.includes('@')) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (password.length < 6) {
      nextErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirme sua senha.';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'As senhas precisam ser iguais.';
    }

    setErrors(nextErrors);
    setApiError('');

    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);

    try {
      await register({
        nome: normalizedName,
        email: normalizedEmail,
        senha: password,
      });

      navigate('/login', {
        replace: true,
        state: {
          successMessage: 'Conta criada com sucesso. Agora você já pode entrar.',
        },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError('Não foi possível criar a conta. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page auth-page">
      <section className="login-wrapper auth-wrapper" aria-labelledby="register-title">
        <div className="login-card auth-card">
          <div className="corner-shape corner-top-left" aria-hidden="true" />
          <div className="corner-shape corner-bottom-right" aria-hidden="true" />

          <header className="auth-header">
            <BrandLogo variant="light" className="auth-small-logo" />
            <div>
              <h1 id="register-title">Criar conta</h1>
              <p>Preencha seus dados para acessar o sistema.</p>
            </div>
          </header>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="register-name">Nome completo</label>
              <input
                id="register-name"
                className="auth-input"
                value={name}
                disabled={isLoading}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="register-email">E-mail</label>
              <input
                id="register-email"
                className="auth-input"
                type="email"
                value={email}
                disabled={isLoading}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="register-password">Senha</label>
              <input
                id="register-password"
                className="auth-input"
                type="password"
                value={password}
                disabled={isLoading}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && <p className="field-error" role="alert">{errors.password}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="register-confirm-password">Confirmar senha</label>
              <input
                id="register-confirm-password"
                className="auth-input"
                type="password"
                value={confirmPassword}
                disabled={isLoading}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
              />
              {errors.confirmPassword && (
                <p className="field-error" role="alert">{errors.confirmPassword}</p>
              )}
            </div>

            {apiError && <p className="login-api-error" role="alert">{apiError}</p>}

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            <button
              className="secondary-button"
              type="button"
              disabled={isLoading}
              onClick={() => navigate('/login')}
            >
              Voltar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

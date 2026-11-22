import { apiRequest } from '../../../services/api';
import type {
  AuthenticatedUser,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  MessageResponse,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
} from '../types/auth';

export const AUTH_TOKEN_STORAGE_KEY =
  'estoque-senior-auth-token';

export const AUTH_USER_STORAGE_KEY =
  'estoque-senior-auth-user';

export async function login(
  credentials: LoginRequest,
) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function register(
  data: RegisterRequest,
) {
  return apiRequest<AuthenticatedUser>('/auth/cadastro', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function forgotPassword(
  data: ForgotPasswordRequest,
) {
  return apiRequest<MessageResponse>(
    '/auth/esqueci-senha',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}

export async function resetPassword(
  data: ResetPasswordRequest,
) {
  return apiRequest<MessageResponse>(
    '/auth/redefinir-senha',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}

export async function getCurrentUser() {
  return apiRequest<AuthenticatedUser>('/usuarios/me');
}

export async function updateProfile(
  data: UpdateProfileRequest,
) {
  return apiRequest<AuthenticatedUser>('/usuarios/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function getStoredToken() {
  return (
    localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  );
}

export function getStoredUser(): AuthenticatedUser | null {
  const rawUser =
    localStorage.getItem(AUTH_USER_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_USER_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthenticatedUser;
  } catch {
    return null;
  }
}

export function storeAuthSession(
  response: LoginResponse,
  rememberAccess: boolean,
) {
  clearAuthSession();

  const storage = rememberAccess
    ? localStorage
    : sessionStorage;

  storage.setItem(
    AUTH_TOKEN_STORAGE_KEY,
    response.token,
  );

  storage.setItem(
    AUTH_USER_STORAGE_KEY,
    JSON.stringify(response.usuario),
  );
}

export function updateStoredUser(
  user: AuthenticatedUser,
) {
  if (localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)) {
    localStorage.setItem(
      AUTH_USER_STORAGE_KEY,
      JSON.stringify(user),
    );
    return;
  }

  if (sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY)) {
    sessionStorage.setItem(
      AUTH_USER_STORAGE_KEY,
      JSON.stringify(user),
    );
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_USER_STORAGE_KEY);
}

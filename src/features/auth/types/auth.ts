export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  novaSenha: string;
  confirmacaoSenha: string;
}

export interface UpdateProfileRequest {
  nome: string;
  email: string;
}

export interface AuthenticatedUser {
  id: number;
  nome: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  usuario: AuthenticatedUser;
}

export interface MessageResponse {
  mensagem: string;
  message?: string;
}

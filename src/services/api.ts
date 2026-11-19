const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:8080';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
  }
}

interface ErrorResponse {
  message?: string;
  mensagem?: string;
  error?: string;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token =
    localStorage.getItem('estoque-senior-auth-token') ??
    sessionStorage.getItem('estoque-senior-auth-token');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError(
      'Não foi possível conectar ao servidor. Verifique se o backend está em execução.',
      0,
    );
  }

  if (!response.ok) {
    let message =
      'Não foi possível concluir a solicitação.';

    try {
      const data =
        (await response.json()) as ErrorResponse;

      message =
        data.message ??
        data.mensagem ??
        data.error ??
        message;
    } catch {
      // Mantém a mensagem padrão quando a resposta não possui JSON.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
import { createContext } from 'react';

import type {
  AuthenticatedUser,
  LoginResponse,
} from '../features/auth/types/auth';

export interface AuthContextValue {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  signIn: (
    response: LoginResponse,
    rememberAccess: boolean,
  ) => void;
  signOut: () => void;
  setUser: (user: AuthenticatedUser) => void;
}

export const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);

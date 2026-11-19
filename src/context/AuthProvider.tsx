import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  clearAuthSession,
  getStoredToken,
  getStoredUser,
  storeAuthSession,
  updateStoredUser,
} from '../features/auth/services/auth-service';
import type {
  AuthenticatedUser,
  LoginResponse,
} from '../features/auth/types/auth';
import { AuthContext } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] =
    useState<AuthenticatedUser | null>(getStoredUser);

  const [hasToken, setHasToken] = useState(
    () => Boolean(getStoredToken()),
  );

  const signIn = useCallback((
    response: LoginResponse,
    rememberAccess: boolean,
  ) => {
    storeAuthSession(response, rememberAccess);
    setUserState(response.usuario);
    setHasToken(true);
  }, []);

  const signOut = useCallback(() => {
    clearAuthSession();
    setUserState(null);
    setHasToken(false);
  }, []);

  const setUser = useCallback((userData: AuthenticatedUser) => {
    setUserState(userData);
    updateStoredUser(userData);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: hasToken,
      signIn,
      signOut,
      setUser,
    }),
    [user, hasToken, signIn, signOut, setUser],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

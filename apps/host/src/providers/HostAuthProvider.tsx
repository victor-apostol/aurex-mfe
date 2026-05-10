import { type ReactNode, useState } from 'react';
import { AuthProvider, type User } from '@aurex/auth';

type Props = {
  children: ReactNode;
};

const HostAuthProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loginUser = async (name: string = 'Victor') => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setAuthUser({ id: '1', name });
    setIsAuthenticated(true);
  };

  const logoutUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setAuthUser(null);
    setIsAuthenticated(false);
  };

  return <AuthProvider value={{ user: authUser, isAuthenticated, loginUser, logoutUser }}>{children}</AuthProvider>;
};

export default HostAuthProvider;

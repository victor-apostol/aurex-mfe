import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@aurex/auth';

import Header from '@components/Header';

const AuthenticatedLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AuthenticatedLayout;

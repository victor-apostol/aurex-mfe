import { Navigate } from 'react-router-dom';
import { useAuth } from '@aurex/auth';

const RootPageRedirect = () => {
  const { isAuthenticated } = useAuth();

  return <Navigate to={isAuthenticated ? '/products' : '/login'} replace />;
};

export default RootPageRedirect;

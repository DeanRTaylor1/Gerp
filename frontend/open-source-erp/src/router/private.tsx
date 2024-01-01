import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/useAuth';
import { finalPagesList } from './pages';

type PrivateRouteProps = {
  children: ReactNode;
};

function Private({ children }: PrivateRouteProps) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!authenticated) {
    return <Navigate to={finalPagesList['Sign-in'].path!} />;
  }

  return <div>{children}</div>;
}

export default Private;

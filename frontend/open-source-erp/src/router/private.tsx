import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/useAuth';
import { finalPagesList } from './pages';

type Props = {
  children: ReactNode;
};

function Private(props: Props) {
  const { children } = props;

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

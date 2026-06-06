import { PropsWithChildren, useEffect, useState } from 'react';

import UserStore from '../../store/userStore.ts';
import { Navigate } from 'react-router';
import HULoadingBar from '../../components/HULoadingBar/HULoadingBar.tsx';
import { observer } from 'mobx-react';

const ProtectedRoute = observer(function ({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    UserStore.checkAuth().then(() => setLoading(false));
  }, []);

  const isAuth = UserStore.isAuth;

  if (loading) {
    return <HULoadingBar />;
  }

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;

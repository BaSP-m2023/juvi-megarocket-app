import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tokenListener } from 'helper/firebase';
import { getAuth } from 'redux/auth/thunks';
import PrivateRoute from './privateRoute';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const AdminRoutes = lazy(() => import('./admin'));
const MemberRoutes = lazy(() => import('./member'));
const SuperAdminRoutes = lazy(() => import('./superAdmin'));
const AuthRoutes = lazy(() => import('./auth'));
const TrainerRoutes = lazy(() => import('./trainer'));

function Routes() {
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  useEffect(() => {
    const setUpTokenListener = async () => {
      await new Promise((resolve) => {
        tokenListener(resolve);
      });
      setToken(sessionStorage.getItem('token'));
      setRole(sessionStorage.getItem('role'));
    };
    setUpTokenListener();
  }, []);
  console.log(role);
  useEffect(() => {
    console.log(role);
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
        <PrivateRoute path="/member" role="MEMBER" component={MemberRoutes} />
        <PrivateRoute path="/super-admin" role="SUPERADMIN" component={SuperAdminRoutes} />
        <PrivateRoute path="/trainer" role="TRAINER" component={TrainerRoutes} />
        <Route path="/auth" component={AuthRoutes} />
        {role === null && <Redirect to="/auth" />}
        {role === 'ADMIN' && <Redirect to="/admin" />}
        {role === 'MEMBER' && <Redirect to="/member" />}
        {role === 'SUPERADMIN' && <Redirect to="/super-admin" />}
      </Switch>
    </Suspense>
  );
}
export default Routes;

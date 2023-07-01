import React, { Suspense, lazy, useEffect } from 'react';
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

function Routes() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    tokenListener();
  }, []);
  useEffect(() => {
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
        <Route path="/auth" component={AuthRoutes} />
        <Redirect to="/auth" />
      </Switch>
    </Suspense>
  );
}
export default Routes;

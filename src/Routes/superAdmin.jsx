import Home from 'Components/SuperAdmins';
import Admin from 'Components/Admin/Admins';
import { Route, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from 'Components/Layout';

const routes = [
  {
    name: 'Home',
    path: '/super-admin'
  },
  {
    name: 'Admin',
    path: '/super-admin/admin'
  }
];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/admins`} component={Admin} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminRoutes;

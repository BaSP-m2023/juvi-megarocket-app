import Home from 'Components/Home';
import Admin from 'Components/Admin/Admins';
import AdminsForm from 'Components/Admin/Admins/Form';
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
    path: '/super-admin/admins'
  }
];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/admins`} component={Admin} />
        <Route exact path={`${url}/admins/form`} component={AdminsForm} />
        <Route exact path={`${url}/admins/form/:id`} component={AdminsForm} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminRoutes;

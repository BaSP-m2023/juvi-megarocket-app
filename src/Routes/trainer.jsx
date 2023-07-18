import Home from 'Components/Home';
import Profile from 'Components/Trainer/Profile';
/* import Schedule from 'Components/Trainer/Schedule'; */

import { Route, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from 'Components/Layout';

const routes = [
  {
    name: 'Home',
    path: '/trainer'
  },
  {
    name: 'Profile',
    path: '/trainer/profile'
  },
  {
    name: 'Schedule',
    path: '/trainer/schedule'
  }
];

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/profile`} component={Profile} />
        {/*     <Route exact path={`${url}/schedule`} component={Schedule} /> */}
      </Switch>
    </Layout>
  );
};

export default MemberRoutes;

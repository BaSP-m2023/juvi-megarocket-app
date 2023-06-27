/* import Home from 'Components/Member/Home'; */
import Activity from 'Components/Member/Activity/';
import Membership from 'Components/Member/Membership';
import Profile from 'Components/Member/Profile';
/* import Schedule from 'Components/Member/Schedule'; */
import Signup from 'Components/Member/SignUp';
import { Route, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from 'Components/Layout';

const routes = [
  {
    name: 'Home',
    path: '/members'
  },
  {
    name: 'Activity',
    path: '/members/activity'
  },
  {
    name: 'Profile',
    path: '/members/profile'
  },
  {
    name: 'Membership',
    path: '/members/membership'
  },
  {
    name: 'Schedule',
    path: '/members/schedule'
  },
  {
    name: 'Signup',
    path: '/members/signup'
  }
];

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        {/*   <Route exact path={`${url}/`} component={Home} /> */}
        <Route exact path={`${url}/activities`} component={Activity} />
        <Route exact path={`${url}/profile`} component={Profile} />
        <Route exact path={`${url}/membership`} component={Membership} />
        {/*     <Route exact path={`${url}/schedule`} component={Schedule} /> */}
        <Route exact path={`${url}/signup`} component={Signup} />
      </Switch>
    </Layout>
  );
};

export default MemberRoutes;

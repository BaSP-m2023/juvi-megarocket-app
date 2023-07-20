import Home from 'Components/Home';
import TrainerProfile from 'Components/Trainer/Profile';
import ProfileEdit from 'Components/Trainer/ProfileEdit';
import ProfileEditPassword from 'Components/Trainer/ProfileEditPass';
import Schedule from 'Components/Trainer/Schedule';
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

const TrainerRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/profile`} component={TrainerProfile} />
        <Route exact path={`${url}/profile/edit`} component={ProfileEdit} />
        <Route exact path={`${url}/profile/password`} component={ProfileEditPassword} />
        <Route exact path={`${url}/schedule`} component={Schedule} />
      </Switch>
    </Layout>
  );
};

export default TrainerRoutes;

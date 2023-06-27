import Home from 'Components/Home';
import MemberForm from 'Components/Admin/Members/MemberForm';
import Member from 'Components/Admin/Members';
import TrainerForm from 'Components/Admin/Trainers/Form';
import Trainer from 'Components/Admin/Trainers';
import SubscriptionsForm from 'Components/Admin/Subscriptions/Form';
import Subscriptions from 'Components/Admin/Subscriptions';
import Classes from 'Components/Admin/Classes';
import ClassesForm from 'Components/Admin/Classes/Form';
import { Route, useRouteMatch, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from 'Components/Layout';

const routes = [
  {
    name: 'Home',
    path: '/admins'
  },
  {
    name: 'Members',
    path: '/admins/members'
  },
  {
    name: 'Trainers',
    path: '/admins/trainers'
  },
  {
    name: 'Subscriptions',
    path: '/admins/subscriptions'
  },
  {
    name: 'Classes',
    path: '/admins/classes'
  }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/trainers`} component={Trainer} />
        <Route exact path={`${url}/trainers/form`} component={TrainerForm} />
        <Route exact path={`${url}/trainers/form/:id`} component={TrainerForm} />
        <Route exact path={`${url}/members`} component={Member} />
        <Route exact path={`${url}/members/form`} component={MemberForm} />
        <Route exact path={`${url}/members/form/:id`} component={MemberForm} />
        <Route exact path={`${url}/subscriptions`} component={Subscriptions} />
        <Route exact path={`${url}/subscriptions/form`} component={SubscriptionsForm} />
        <Route exact path={`${url}/subscriptions/form/:id`} component={SubscriptionsForm} />
        <Route exact path={`${url}/classes`} component={Classes} />
        <Route exact path={`${url}/classes/form`} component={ClassesForm} />
        <Route exact path={`${url}/classes/form/:id`} component={ClassesForm} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;

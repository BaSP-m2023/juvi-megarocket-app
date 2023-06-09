import Activities from '../Activities';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import Classes from '../Classes';
import FormClasses from '../Classes/Form';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SubForm from '../Subscriptions/Form';
import SuperAdmins from '../SuperAdmins';
import FormSuperAdmin from '../SuperAdmins/Form/Index';
import Trainers from '../Trainers';
import FormActivities from '../Activities/Form';

//Member
import MemberForm from '../Members/MemberForm';

import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';

import TrainerForm from '../Trainers/Form/addForm';
import TrainerFormEdit from '../Trainers/Form/editForm';
// import Table from '../Trainers/Table/index';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/super-admins" component={SuperAdmins} />
        <Route exact path="/super-admins/form" component={FormSuperAdmin} />
        <Route exact path="/super-admins/form/:id" component={FormSuperAdmin} />
        <Route exact path="/activities" component={Activities} />
        <Route exact path="/activities/ActivitiesForm" component={FormActivities} />

        <Route exact path="/admins" component={Admins} />
        <Route exact path="/admins/Form/" component={AdminsForm} />
        <Route path="/admins/Form/:id" component={AdminsForm} />

        <Route exact path="/classes" component={Classes} />
        <Route exact path="/classes/form/" component={FormClasses} />
        <Route path="/classes/form/:id" component={FormClasses} />

        <Route exact path="/members" component={Members} />
        <Route exact path="/members/form" component={MemberForm} />
        <Route path="/members/form/:id" component={MemberForm} />

        <Route path="/subscriptions" exact component={Subscriptions} />
        <Route exact path="/subscriptions/form" component={SubForm} />
        <Route exact path="/subscriptions/form/:id" component={SubForm} />

        <Route path="/trainers" exact component={Trainers} />
        <Route path="/trainers/add" component={TrainerForm} />
        <Route path="/trainers/edit/:id" component={TrainerFormEdit} />
      </Switch>
      <Footer />
    </div>
  );
}
export default Layout;

import Activities from '../Activities';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import Classes from '../Classes';
import FormClasses from '../Classes/Form';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SubForm from '../Subscriptions/Form';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';

import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';

import Form from '../Trainers/Form/addForm';
import FormEdit from '../Trainers/Form/editForm';
// import Table from '../Trainers/Table/index';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/activities" component={Activities} />
        <Route exact path="/admins" component={Admins} />
        <Route exact path="/admins/AdminForm/" component={AdminsForm} />
        <Route path="/admins/AdminForm/:id" component={AdminsForm} />
        <Route path="/classes" component={Classes} />
        <Route exact path="/classes/form/" component={FormClasses} />
        <Route path="/classes/form/:id" component={FormClasses} />
        <Route path="/members" component={Members} />
        <Route path="/subscriptions" exact component={Subscriptions} />
        <Route exact path="/subscriptions/form" component={SubForm} />
        <Route exact path="/subscriptions/form/:id" component={SubForm} />
        <Route path="/super-admins" component={SuperAdmins} />
        <Route path="/trainers" exact component={Trainers} />
        <Route path="/trainers/add" component={Form} />
        <Route path="/trainers/edit/:id" component={FormEdit} />
      </Switch>
      <Footer />
    </div>
  );
}
export default Layout;

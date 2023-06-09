import Activities from '../Activities';
import Admins from '../Admins/index';
import Classes from '../Classes';
import FormClasses from '../Classes/Form';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';

//Member
import MemberForm from '../Members/MemberForm';

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
        <Route path="/admins" component={Admins} />
        <Route path="/classes" component={Classes} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/members/form" component={MemberForm} />
        <Route path="/members/form/:id" component={MemberForm} />
        <Route exact path="/classes" component={Classes} />
        <Route exact path="/classes/form/" component={FormClasses} />
        <Route path="/classes/form/:id" component={FormClasses} />
        <Route path="/subscriptions" component={Subscriptions} />
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

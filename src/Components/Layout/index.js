import Activities from '../Activities';
import Admins from '../Admins/index';
import Form from '../Admins/Form';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';

import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';

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
        <Route path="/admins/form" component={Form} />
        <Route path="/classes" component={Classes} />
        <Route path="/members" component={Members} />
        <Route path="/subscriptions" component={Subscriptions} />
        <Route path="/super-admins" component={SuperAdmins} />
        <Route path="/trainers" component={Trainers} />
      </Switch>
      <Footer />
    </div>
  );
}

export default Layout;

import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'Components/Home';
import Navbar from 'Components/Navbar';
import Header from 'Components/Header/';
import styles from './layout.module.css';

const activityForm = lazy(() => import('./activity/form'));
const activityList = lazy(() => import('./activity'));
const adminForm = lazy(() => import('./admin/form'));
const adminList = lazy(() => import('./admin'));
const classForm = lazy(() => import('./class/form'));
const classList = lazy(() => import('./class'));
const memberForm = lazy(() => import('./member/form'));
const memberList = lazy(() => import('./member'));
const memberSignUp = lazy(()=> import('./member/singUp'))
const subscriptionForm = lazy(() => import('./subscription/form'));
const subscriptionList = lazy(() => import('./subscription'));
const superAdminForm = lazy(() => import('./super-admin/form'));
const superAdminList = lazy(() => import('./super-admin'));
const trainerForm = lazy(() => import('./trainer/form'));
const trainerList = lazy(() => import('./trainer'));

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.homeContainer}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/admins" component={adminList} />
              <Route exact path="/admins/Form/" component={adminForm} />
              <Route path="/admins/Form/:id" component={adminForm} />
              <Route
                path="/admins"
                render={() => (
                  <>
                    <Route exact path="/admins/classes" component={classList} />
                    <Route exact path="/admins/classes/form" component={classForm} />
                    <Route path="/admins/classes/form/:id" component={classForm} />
                    <Route exact path="/admins/activities" component={activityList} />
                    <Route
                      exact
                      path="/admins/activities/ActivitiesForm"
                      component={activityForm}
                    />
                    <Route path="/admins/activities/ActivitiesForm/:id" component={activityForm} />
                    <Route exact path="/admins/members" component={memberList} />
                    <Route exact path="/admins/members/form" component={memberForm} />
                    <Route path="/admins/members/form/:id" component={memberForm} />
                    <Route exact path="/admins/trainers" component={trainerList} />
                    <Route exact path="/admins/trainers/form" component={trainerForm} />
                    <Route path="/admins/trainers/form/:id" component={trainerForm} />
                    <Route exact path="/admins/subscriptions" component={subscriptionList} />
                    <Route exact path="/admins/subscriptions/form" component={subscriptionForm} />
                    <Route path="/admins/subscriptions/form/:id" component={subscriptionForm} />
                  </>
                )}
              />
              <Route exact path="/super-admins" component={superAdminList} />
              <Route exact path="/super-admins/form" component={superAdminForm} />
              <Route exact path="/super-admins/form/:id" component={superAdminForm} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export default Layout;

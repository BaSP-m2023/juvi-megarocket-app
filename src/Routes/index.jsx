import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'Components/Home';
import Navbar from 'Components/Navbar';
import Header from 'Components/Header/';
import Footer from '../Components/Footer/';
import styles from './layout.module.css';

const activityForm = lazy(() => import('./activity/form'));
const activityList = lazy(() => import('./activity'));
const adminForm = lazy(() => import('./admin/form'));
const adminList = lazy(() => import('./admin'));
const classForm = lazy(() => import('./class/form'));
const classList = lazy(() => import('./class'));
const memberForm = lazy(() => import('./member/form'));
const memberList = lazy(() => import('./member'));
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
                  </>
                )}
              />

              <Route exact path="/activities" component={activityList} />
              <Route exact path="/activities/ActivitiesForm" component={activityForm} />
              <Route path="/activities/ActivitiesForm/:id" component={activityForm} />

              <Route exact path="/classes" component={classList} />
              <Route exact path="/classes/form/" component={classForm} />
              <Route path="/classes/form/:id" component={classForm} />

              <Route exact path="/members" component={memberList} />
              <Route exact path="/members/form" component={memberForm} />
              <Route path="/members/form/:id" component={memberForm} />

              <Route path="/subscriptions" exact component={subscriptionList} />
              <Route exact path="/subscriptions/form" component={subscriptionForm} />
              <Route exact path="/subscriptions/form/:id" component={subscriptionForm} />

              <Route exact path="/super-admins" component={superAdminList} />
              <Route exact path="/super-admins/form" component={superAdminForm} />
              <Route exact path="/super-admins/form/:id" component={superAdminForm} />

              <Route exact path="/trainers" component={trainerList} />
              <Route exact path="/trainers/form" component={trainerForm} />
              <Route exact path="/trainers/form/:id" component={trainerForm} />
            </Switch>
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Layout;

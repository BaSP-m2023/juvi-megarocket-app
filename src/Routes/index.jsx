import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'Components/Home';
import Navbar from 'Components/Navbar';
import Header from 'Components/Header/';
import styles from './layout.module.css';

const activityMember = lazy(() => import('Components/Member/Activity'));
const membershipMember = lazy(() => import('Components/Member/Membership'));
const activityForm = lazy(() => import('Components/Admin/Activities/Form'));
const activityList = lazy(() => import('Components/Admin/Activities'));
const adminForm = lazy(() => import('Components/Admin/Admins/Form'));
const adminList = lazy(() => import('Components/Admin/Admins'));
const classForm = lazy(() => import('Components/Admin/Classes/Form'));
const classList = lazy(() => import('Components/Admin/Classes'));
const memberForm = lazy(() => import('Components/Admin/Members/MemberForm'));
const memberList = lazy(() => import('Components/Admin/Members'));
const subscriptionForm = lazy(() => import('Components/Admin/Subscriptions/Form'));
const subscriptionList = lazy(() => import('Components/Admin/Subscriptions'));
const superAdminForm = lazy(() => import('Components/SuperAdmins/Form/Index'));
const superAdminList = lazy(() => import('Components/SuperAdmins'));
const trainerForm = lazy(() => import('Components/Admin/Trainers/Form'));
const trainerList = lazy(() => import('Components/Admin/Trainers'));

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
              <Route
                path="/members"
                render={() => (
                  <>
                    <Route exact path="/members/activities" component={activityMember} />
                    <Route exact path="/members/membership" component={membershipMember} />
                  </>
                )}
              />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export default Layout;

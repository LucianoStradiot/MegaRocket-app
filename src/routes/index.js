import React, { Suspense, lazy, Redirect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'Components/Home';
import Spinner from 'Components/Shared/Spinner';
import styles from './layout.module.css';

const Admins = lazy(() => import('./admins/admins'));
const AdminForm = lazy(() => import('./admins/formAdmins'));
const AdminsHome = lazy(() => import('./admins/adminsHome'));
const Activities = lazy(() => import('./activities/activities'));
const FormActivities = lazy(() => import('./activities/formActivities'));

const Classes = lazy(() => import('./classes/classes'));
const FormClasses = lazy(() => import('./classes/formClasses'));

const Member = lazy(() => import('./members/members'));
const FormMembers = lazy(() => import('./members/formMembers'));

const MemberUser = lazy(() => import('./membersUsers/members'));
const MemberSchedule = lazy(() => import('./membersUsers/memberSchedule'));
const ActivityInfo = lazy(() => import('./membersUsers/activitiesMembers'));
const SignUpMember = lazy(() => import('./membersUsers/signUpMembers'));
const LoginMember = lazy(() => import('./membersUsers/loginMembers'));
const MembershipMember = lazy(() => import('./membersUsers/membershipsMembers'));

const Subscriptions = lazy(() => import('./subscriptions/subscriptions'));
const FormSubscriptions = lazy(() => import('./subscriptions/formSubscriptions'));

const SuperAdmins = lazy(() => import('./superAdmins/superAdmins'));
const FormSuperAdmin = lazy(() => import('./superAdmins/formSuperAdmins'));

const Trainers = lazy(() => import('./trainers/trainer'));
const FormTrainers = lazy(() => import('./trainers/formTrainer'));

const Layout = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/superAdmin/admin" component={Admins} />
          <Route exact path="/superAdmin/admin/form" component={AdminForm} />
          <Route path="/superAdmin/admin/form/:id" component={AdminForm} />

          <Route exact path="/admins/activities" component={Activities} />
          <Route exact path="/admins/activities/form" component={FormActivities} />
          <Route path="/admins/activities/form/:id" component={FormActivities} />

          <Route exact path="/admins" component={AdminsHome} />

          <Route exact path="/admins/classes" component={Classes} />
          <Route exact path="/admins/classes/form" component={FormClasses} />
          <Route path="/admins/classes/form/:id" component={FormClasses} />

          <Route exact path="/admins/members" component={Member} />
          <Route exact path="/admins/members/form" component={FormMembers} />
          <Route path="/admins/members/form/:id" component={FormMembers} />

          <Route path="/" exact component={MemberUser} />
          <Route path="/activities" exact component={ActivityInfo} />
          <Route path="/login" exact component={LoginMember} />
          <Route path="/membership" exact component={MembershipMember} />
          <Route path="/schedule" exact component={MemberSchedule} />
          <Route path="/schedule/:id" component={MemberSchedule} />
          <Route path="/signUp" exact component={SignUpMember} />

          <Route path="/admins/subscriptions" exact component={Subscriptions} />
          <Route path="/admins/subscriptions/form" exact component={FormSubscriptions} />
          <Route path="/admins/subscriptions/form/:id" component={FormSubscriptions} />

          <Route path="/superAdmins" exact component={SuperAdmins} />
          <Route path="/superAdmins/form" exact component={FormSuperAdmin} />
          <Route path="/superAdmins/form/:id" component={FormSuperAdmin} />

          <Route exact path="/admins/trainers" component={Trainers} />
          <Route exact path="/admins/trainers/formTrainers" component={FormTrainers} />
          <Route path="/admins/trainers/formTrainers/:id" component={FormTrainers} />
          <Route path extact="/" component={Home} />
          <Route exact path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};
export default Layout;

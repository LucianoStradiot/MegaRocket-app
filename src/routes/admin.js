import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const AdminsHome = lazy(() => import('./SuperAdmin/adminsHome'));
const Activities = lazy(() => import('./Admin/activities'));
const FormActivities = lazy(() => import('./Admin/formActivities'));

const Classes = lazy(() => import('./Admin/classes'));
const FormClasses = lazy(() => import('./Admin/formClasses'));

const Member = lazy(() => import('./Admin/members'));
const FormMembers = lazy(() => import('./Admin/formMembers'));

const Subscriptions = lazy(() => import('./Admin/subscriptions'));
const FormSubscriptions = lazy(() => import('./Admin/formSubscriptions'));

const Trainers = lazy(() => import('./Admin/trainer'));
const FormTrainers = lazy(() => import('./trainers/formTrainer'));
const AdminsRoutes = () => {
  return (
    <Switch>
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

      <Route path="/admins/subscriptions" exact component={Subscriptions} />
      <Route path="/admins/subscriptions/form" exact component={FormSubscriptions} />
      <Route path="/admins/subscriptions/form/:id" component={FormSubscriptions} />

      <Route exact path="/admins/trainers" component={Trainers} />
      <Route exact path="/admins/trainers/formTrainers" component={FormTrainers} />
      <Route path="/admins/trainers/formTrainers/:id" component={FormTrainers} />
    </Switch>
  );
};
export default AdminsRoutes;

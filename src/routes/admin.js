import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const AdminsHome = lazy(() => import('Views/Admin/index'));
const Activities = lazy(() => import('Views/Admin/Activities'));
const FormActivities = lazy(() => import('Views/Admin/Activities/FormActivity'));

const Classes = lazy(() => import('Views/Admin/Classes'));
const FormClasses = lazy(() => import('Views/Admin/Classes/FormClasses'));

const Member = lazy(() => import('Views/Admin/Members'));
const FormMembers = lazy(() => import('Views/Admin/Members/FormMembers'));

const Subscriptions = lazy(() => import('Views/Admin/Subscriptions'));

const Trainers = lazy(() => import('Views/Admin/Trainers'));
const FormTrainers = lazy(() => import('Views/Admin/Trainers/FormTrainers'));
const AdminsRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admins" component={AdminsHome} />
      <Route exact path="/admins/activities" component={Activities} />
      <Route exact path="/admins/activities/form" component={FormActivities} />
      <Route path="/admins/activities/form/:id" component={FormActivities} />

      <Route exact path="/admins/classes" component={Classes} />
      <Route exact path="/admins/classes/form" component={FormClasses} />
      <Route path="/admins/classes/form/:id" component={FormClasses} />

      <Route exact path="/admins/members" component={Member} />
      <Route exact path="/admins/members/form" component={FormMembers} />
      <Route path="/admins/members/form/:id" component={FormMembers} />

      <Route path="/admins/subscriptions" exact component={Subscriptions} />

      <Route exact path="/admins/trainers" component={Trainers} />
      <Route exact path="/admins/trainers/formTrainers" component={FormTrainers} />
      <Route path="/admins/trainers/formTrainers/:id" component={FormTrainers} />
    </Switch>
  );
};

export default AdminsRoutes;

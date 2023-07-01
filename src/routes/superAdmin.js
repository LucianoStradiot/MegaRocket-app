import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const SuperAdmins = lazy(() => import('./superAdmins/superAdmins'));
const FormSuperAdmin = lazy(() => import('./superAdmins/formSuperAdmins'));
const Admins = lazy(() => import('Views/SuperAdmin/AdminManagement'));
const AdminForm = lazy(() => import('Views/SuperAdmin/AdminManagement/Form'));

const SuperAdminsRoutes = () => {
  return (
    <Switch>
      <Route exact path="/superAdmin/admin" component={Admins} />
      <Route exact path="/superAdmin/admin/form" component={AdminForm} />
      <Route path="/superAdmin/admin/form/:id" component={AdminForm} />
      <Route path="/superAdmins" exact component={SuperAdmins} />
      <Route path="/superAdmins/form" exact component={FormSuperAdmin} />
      <Route path="/superAdmins/form/:id" component={FormSuperAdmin} />
    </Switch>
  );
};
export default SuperAdminsRoutes;

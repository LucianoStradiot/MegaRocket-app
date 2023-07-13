import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Spinner from 'Components/Shared/Spinner';
import styles from './layout.module.css';
import { useDispatch } from 'react-redux';
import { tokenListener } from 'helper/firebase';
import { getAuth } from 'Redux/Auth/thunks';
const TrainerRoute = lazy(() => import('./trainers'));
const PrivateRoute = lazy(() => import('./privateRoutes'));
const AdminsRoutes = lazy(() => import('./admin'));
const MemberRoute = lazy(() => import('./member'));
const SuperAdminsRoutes = lazy(() => import('./superAdmin'));
const MemberUser = lazy(() => import('Views/Member'));
const SignUpMember = lazy(() => import('Views/Member/signUp'));
const Login = lazy(() => import('Views/login'));
const Memberships = lazy(() => import('Views/Member/memberships'));
const MemberSchedule = lazy(() => import('Views/Member/schedule'));
const ActivityInfo = lazy(() => import('Views/Member/activities'));
const RecoverPassword = lazy(() => import('../Views/login/recoverPassword'));
const Profile = lazy(() => import('Views/Profile'));
const FormMember = lazy(() => import('Views/Profile/FormMembers'));
const FormTrainer = lazy(() => import('Views/Profile/FormTrainers'));
const Layout = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={MemberUser} />
          <Route path="/recoverPassword" component={RecoverPassword} />
          <Route path="/auth/login" exact component={Login} />
          <Route path="/signUp" exact component={SignUpMember} />
          <Route path="/membership" exact component={Memberships} />
          <Route path="/schedule" exact component={MemberSchedule} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/activities" exact component={ActivityInfo} />
          <Route path="/profile/form/edit-member" component={FormMember} />
          <Route path="/profile/form/edit-trainer" component={FormTrainer} />
          <PrivateRoute path="/admins" role="ADMIN" component={AdminsRoutes} />
          <PrivateRoute path="/members" role="MEMBER" component={MemberRoute} />
          <PrivateRoute path="/superAdmins" role="SUPER_ADMIN" component={SuperAdminsRoutes} />
          <PrivateRoute path="/trainers" role="TRAINER" component={TrainerRoute} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Layout;

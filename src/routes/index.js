import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Spinner from 'Components/Shared/Spinner';
import styles from './layout.module.css';
import { useDispatch } from 'react-redux';
import { tokenListener } from 'helper/firebase';
import { getAuth } from 'Redux/Auth/thunks';
const PrivateRoute = lazy(() => import('./privateRoutes'));
const AdminsRoutes = lazy(() => import('./admin'));
const MemberRoute = lazy(() => import('./member'));
const SuperAdminsRoutes = lazy(() => import('./superAdmin'));
const MemberUser = lazy(() => import('Views/Member'));
const SignUpMember = lazy(() => import('Views/Member/signUp'));
const Login = lazy(() => import('Views/Member/login'));
const Memberships = lazy(() => import('Views/Member/memberships'));
const MemberSchedule = lazy(() => import('Views/Member/schedule'));
const ActivityInfo = lazy(() => import('Views/Member/activities'));

const Layout = () => {
  const dispatch = useDispatch();

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={MemberUser} />
          <Route path="/auth/login" exact component={Login} />
          <Route path="/signUp" exact component={SignUpMember} />
          <Route path="/membership" exact component={Memberships} />
          <Route path="/schedule" exact component={MemberSchedule} />
          <Route path="/activities" exact component={ActivityInfo} />
          <PrivateRoute path="/admin" role="ADMIN" component={AdminsRoutes} />
          <PrivateRoute path="/member" role="MEMBER" component={MemberRoute} />
          <PrivateRoute path="/superAdmins" role="SUPER_ADMIN" component={SuperAdminsRoutes} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Layout;

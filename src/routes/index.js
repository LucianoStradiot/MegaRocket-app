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
const Login = lazy(() => import('Views/Login'));

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
          <PrivateRoute path="/admin" role="ADMIN" component={AdminsRoutes} />
          <PrivateRoute path="/member" role="MEMBER" component={MemberRoute} />
          <PrivateRoute path="/super-admin" role="SUPER_ADMIN" component={SuperAdminsRoutes} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Layout;

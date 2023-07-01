import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'Components/Home';
import Spinner from 'Components/Shared/Spinner';
import styles from './layout.module.css';
const PrivateRoute = lazy(() => import('./privateRoutes'));
const AdminsRoutes = lazy(() => import('./admin'));
const MemberRoute = lazy(() => import('./member'));
const SuperAdminsRoutes = lazy(() => import('./SuperAdmin'));

const Layout = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/admin" role="ADMIN" component={AdminsRoutes} />
          <PrivateRoute path="/member" role="MEMBER" component={MemberRoute} />
          <PrivateRoute path="/super-admin" role="SUPER_ADMIN" component={SuperAdminsRoutes} />
        </Switch>
      </Suspense>
    </div>
  );
};
export default Layout;

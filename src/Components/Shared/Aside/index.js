import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './aside.module.css';
import { useState } from 'react';

const Aside = ({ page }) => {
  const location = useLocation();
  const [isLogin, setIslogin] = useState(false);

  const isActiveRoute = (path) => {
    return location.pathname === path ? styles.activeRoute : '';
  };
  const isActiveRouteMember = (path) => {
    return location.pathname === path ? styles.activeRouteMember : '';
  };
  if (page === 'home') {
    return (
      <aside className={styles.asideMember} data-testid="container-aside-members">
        <div className={styles.asideSubContainer}>
          <h2 className={styles.title}>Menu</h2>
          <nav className={styles.navbarMember}>
            <ul className={styles.rutesMember}>
              <Link to="/" className={`${styles.btn} ${isActiveRouteMember('/')}`}>
                <li>
                  <a>Home</a>
                </li>
              </Link>
              <li
                onClick={() => setIslogin(!isLogin)}
                className={`${styles.btn} ${isActiveRouteMember('/auth/login')}`}
              >
                <a>Login</a>
              </li>
              {isLogin && (
                <Link
                  to={{
                    pathname: '/auth/login',
                    state: { myState: false },
                    routes: { route: '/member' }
                  }}
                  className={`${styles.btn} ${isActiveRouteMember('/auth/login')} ${
                    styles.acording
                  }`}
                >
                  <li>
                    <a>Member</a>
                  </li>
                </Link>
              )}
              {isLogin && (
                <Link
                  to={{
                    pathname: '/auth/login',
                    state: { myState: true },
                    routes: { route: '/superAdmins' }
                  }}
                  className={`${styles.btn} ${isActiveRouteMember('/auth/login')} ${
                    styles.acording
                  }`}
                >
                  <li>
                    <a>Super Admin</a>
                  </li>
                </Link>
              )}
              {isLogin && (
                <Link
                  to={{
                    pathname: '/auth/login',
                    state: { myState: true },
                    routes: { route: '/admin' }
                  }}
                  className={`${styles.btn} ${isActiveRouteMember('/auth/login')} ${
                    styles.acording
                  }`}
                >
                  <li>
                    <a>Admin</a>
                  </li>
                </Link>
              )}

              <Link to="/signUp" className={`${styles.btn} ${isActiveRouteMember('/signUp')}`}>
                <li>
                  <a>SignUp</a>
                </li>
              </Link>
              <Link
                to="/activities"
                className={`${styles.btn} ${isActiveRouteMember('/activities')}`}
              >
                <li>
                  <a>Activities</a>
                </li>
              </Link>
              <Link to="/schedule" className={`${styles.btn} ${isActiveRouteMember('/schedule')}`}>
                <li>
                  <a>Schedule</a>
                </li>
              </Link>
              <Link
                to="/membership"
                className={`${styles.btn} ${isActiveRouteMember('/membership')}`}
              >
                <li>
                  <a>Memberships</a>
                </li>
              </Link>
            </ul>
          </nav>
          <div className={styles.contact}>
            <h3 className={styles.titleContact}>Contact us</h3>
            <ul>
              <li>
                <p>info@megarocket.com</p>
              </li>
              <li>
                <p>(000)0000000</p>
              </li>
              <li>
                <p>1234 somewhere road</p>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    );
  } else if (page === 'admins') {
    return (
      <aside className={styles.aside} data-testid="container-aside-general">
        <nav className={styles.navbar}>
          <ul className={styles.rutes}>
            <li>
              <Link to="/admins/activities" className={isActiveRoute('/admins/activities')}>
                Activities
              </Link>
            </li>
            <li>
              <Link to="/admins/classes" className={isActiveRoute('/admins/classes')}>
                Classes
              </Link>
            </li>
            <li>
              <Link to="/admins/members" className={isActiveRoute('/admins/members')}>
                Members
              </Link>
            </li>
            <li>
              <Link to="/admins/subscriptions" className={isActiveRoute('/admins/subscriptions')}>
                Subscriptions
              </Link>
            </li>
            <li>
              <Link to="/admins/trainers" className={isActiveRoute('/admins/trainers')}>
                Trainers
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  } else if (page === 'superAdmins') {
    return (
      <aside className={styles.aside}>
        <nav className={styles.navbar}>
          <ul className={styles.rutes}>
            <li>
              <Link to="/superAdmins/admins" className={isActiveRoute('/superAdmins/admins')}>
                Admins
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
};
export default Aside;

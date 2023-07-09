import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'Redux/Auth/thunks';
import styles from './aside.module.css';

const Aside = ({ page }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isActiveRoute = (path) => {
    return location.pathname === path ? styles.activeRoute : '';
  };

  const isActiveRouteMember = (path) => {
    return location.pathname === path ? styles.activeRouteMember : '';
  };

  const onSubmit = () => {
    sessionStorage.clear();
    dispatch(logout());
  };

  if (page === 'home') {
    return (
      <aside className={styles.asideMember} data-testid="container-aside-members">
        <div className={styles.asideSubContainer}>
          <nav className={styles.navbarMember}>
            <ul className={styles.rutesMember}>
              <div className={styles.loginContainer}>
                {sessionStorage.getItem('role') === 'MEMBER' ||
                sessionStorage.getItem('role') === 'TRAINER' ? (
                  <>
                    <Link
                      to="/profile"
                      className={`${styles.btn} ${isActiveRouteMember('/profile')}`}
                    >
                      <li>
                        <a>Profile</a>
                      </li>
                    </Link>
                    <Link
                      to="/"
                      className={`${styles.btn} ${styles.btn2}`}
                      onClick={() => onSubmit()}
                    >
                      <li>
                        <a>Log Out</a>
                      </li>
                    </Link>
                  </>
                ) : sessionStorage.getItem('role') === 'SUPER_ADMIN' ? (
                  <>
                    <Link
                      to="/superAdmins/admins"
                      className={`${styles.btn} ${isActiveRouteMember('/superAdmins/admins')}`}
                    >
                      <li>
                        <a>Management</a>
                      </li>
                    </Link>
                    <Link
                      to="/"
                      className={`${styles.btn} ${styles.btn2}`}
                      onClick={() => onSubmit()}
                    >
                      <li>
                        <a>Log Out</a>
                      </li>
                    </Link>
                  </>
                ) : sessionStorage.getItem('role') === 'ADMIN' ? (
                  <>
                    <Link
                      to="/admins/activities"
                      className={`${styles.btn} ${isActiveRouteMember('/admins/activities')}`}
                    >
                      <li>
                        <a>Management</a>
                      </li>
                    </Link>
                    <Link
                      to="/"
                      className={`${styles.btn} ${styles.btn2}`}
                      onClick={() => onSubmit()}
                    >
                      <li>
                        <a>Log Out</a>
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className={`${styles.btn} ${isActiveRouteMember('/auth/login')}`}
                    >
                      <li>
                        <a>Login</a>
                      </li>
                    </Link>
                    <Link
                      to="/signUp"
                      className={`${styles.btn} ${isActiveRouteMember('/signUp')}`}
                    >
                      <li>
                        <a>SignUp</a>
                      </li>
                    </Link>
                  </>
                )}
              </div>
              <Link to="/" className={`${styles.btn} ${isActiveRouteMember('/')}`}>
                <li>
                  <a>Home</a>
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
            <div className={styles.minorDiv}>
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
        </div>
      </aside>
    );
  } else if (page === 'admins') {
    return (
      <aside className={styles.aside} data-testid="container-aside-general">
        <nav className={styles.navbar}>
          <ul className={styles.logout}>
            <div className={styles.containerBtns}>
              <Link to="/" className={` ${isActiveRouteMember('/')}`}>
                <div className={`${styles.btn} ${styles.btnHome}`}>
                  <li>
                    <a>Home</a>
                  </li>
                </div>
              </Link>
              <Link to="/" className={styles.linkBtn} onClick={() => onSubmit()}>
                <div className={`${styles.btn} ${styles.btn2}`}>
                  <li>
                    <a>Log Out</a>
                  </li>
                </div>
              </Link>
            </div>
            <div className={styles.containerBtns}>
              <li>
                <Link
                  to="/admins/activities"
                  className={`${styles.linkBtn} ${isActiveRoute('/admins/activities')}`}
                >
                  <div className={`${styles.btn} ${styles.btnHome}`}>
                    <a>Activities</a>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/admins/classes"
                  className={`${styles.linkBtn} ${isActiveRoute('/admins/classes')}`}
                >
                  <div className={`${styles.btn} ${styles.btnHome}`}>
                    <a>Classes</a>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/admins/members"
                  className={`${styles.linkBtn} ${isActiveRoute('/admins/members')}`}
                >
                  <div className={`${styles.btn} ${styles.btnHome}`}>
                    <a>Members</a>
                  </div>
                </Link>
              </li>
              <Link
                to="/admins/subscriptions"
                className={`${styles.linkBtn} ${isActiveRoute('/admins/subscriptions')}`}
              >
                <div className={`${styles.btn} ${styles.btnHome}`}>
                  <li>
                    <a>Subscriptions</a>
                  </li>
                </div>
              </Link>
              <Link
                to="/admins/trainers"
                className={`${styles.linkBtn} ${isActiveRoute('/admins/trainers')}`}
              >
                <div className={`${styles.btn} ${styles.btnHome}`}>
                  <li>
                    <a>Trainers</a>
                  </li>
                </div>
              </Link>
            </div>
          </ul>
        </nav>
      </aside>
    );
  } else if (page === 'superAdmins') {
    return (
      <aside className={styles.aside}>
        <nav className={styles.navbar}>
          <ul className={styles.logout}>
            <div className={styles.containerBtns}>
              <Link to="/" className={` ${isActiveRouteMember('/')}`}>
                <div className={`${styles.btn} ${styles.btnHome}`}>
                  <li>
                    <a>Home</a>
                  </li>
                </div>
              </Link>
            </div>
            <div className={styles.containerBtns}>
              <Link to="/" className={styles.linkBtn} onClick={() => onSubmit()}>
                <div className={`${styles.btn} ${styles.btn2}`}>
                  <li>
                    <a>Log Out</a>
                  </li>
                </div>
              </Link>
            </div>
          </ul>
        </nav>
      </aside>
    );
  }
};

export default Aside;

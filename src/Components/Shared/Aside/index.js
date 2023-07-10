import { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'Redux/Auth/thunks';
import styles from './aside.module.css';
import Modal from 'Components/Shared/Modal';

const Aside = ({ page }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [confirmModal, setConfirmModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });

  const isActiveRoute = (path) => {
    return location.pathname === path ? styles.activeRoute : '';
  };

  const isActiveRouteMember = (path) => {
    return location.pathname === path ? styles.activeRouteMember : '';
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logout());
      console.log(response);
      if (response.error) {
        throw new Error(response.message);
      } else {
        sessionStorage.clear();
        setModalInfo({
          title: 'Success!',
          desc: 'Successfully logged out'
        });
        setConfirmModal(false);
        history.push('/');
      }
    } catch (error) {
      setModalInfo({
        title: 'Error!',
        desc: error.message
      });
      setConfirmModal(false);
    }
  };

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const confirmLogout = () => {
    setConfirmModal(true);
    setModalInfo({
      title: 'Confirm',
      desc: 'Are you sure you want to logout?'
    });
    switchIsOpen();
  };

  if (page === 'home') {
    return (
      <>
        <Modal
          title={modalInfo.title}
          desc={modalInfo.desc}
          isOpen={isOpen}
          handleClose={switchIsOpen}
          confirmModal={confirmModal}
          deleteFunction={() => handleLogout()}
        />
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
                      <a onClick={confirmLogout} className={`${styles.btn} ${styles.btn2}`}>
                        <li>
                          <a>Logout</a>
                        </li>
                      </a>
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
                      <a onClick={confirmLogout} className={`${styles.btn} ${styles.btn2}`}>
                        <li>
                          <a>Logout</a>
                        </li>
                      </a>
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
                      <a onClick={confirmLogout} className={`${styles.btn} ${styles.btn2}`}>
                        <li>
                          <a>Logout</a>
                        </li>
                      </a>
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
                <Link
                  to="/schedule"
                  className={`${styles.btn} ${isActiveRouteMember('/schedule')}`}
                >
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
      </>
    );
  } else if (page === 'admins') {
    return (
      <>
        <Modal
          title={modalInfo.title}
          desc={modalInfo.desc}
          isOpen={isOpen}
          handleClose={switchIsOpen}
          confirmModal={confirmModal}
          deleteFunction={() => handleLogout()}
        />
        <aside className={styles.aside} data-testid="container-aside-general">
          <nav className={styles.navbar}>
            <ul className={styles.logoutAdmins}>
              <div className={styles.containerBtns}>
                <Link to="/" className={` ${isActiveRouteMember('/')}`}>
                  <div className={`${styles.btn} ${styles.btnHome}`}>
                    <li>
                      <a>Home</a>
                    </li>
                  </div>
                </Link>
                <a onClick={confirmLogout} className={`${styles.btn} ${styles.btn2}`}>
                  <li>
                    <a>Logout</a>
                  </li>
                </a>
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
      </>
    );
  } else if (page === 'superAdmins') {
    return (
      <>
        <Modal
          title={modalInfo.title}
          desc={modalInfo.desc}
          isOpen={isOpen}
          handleClose={switchIsOpen}
          confirmModal={confirmModal}
          deleteFunction={() => handleLogout()}
        />
        <aside className={styles.aside}>
          <nav className={styles.navbar}>
            <ul className={styles.logoutSuperAdmins}>
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
                <a onClick={confirmLogout} className={`${styles.btn} ${styles.btn2}`}>
                  <li>
                    <a>Logout</a>
                  </li>
                </a>
              </div>
            </ul>
          </nav>
        </aside>
      </>
    );
  }
};

export default Aside;

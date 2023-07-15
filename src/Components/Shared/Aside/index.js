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

  const isActiveRouteMember = (path) => {
    return location.pathname === path ? styles.activeRouteMember : '';
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logout());
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
                <div className={styles.containerBtns}>
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
                </div>
              </ul>
            </nav>
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
                  <div className={`${styles.btn} ${styles.btnHome} `}>
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
                  <Link to="/admins/activities" className={`${styles.linkBtn} `}>
                    <div
                      className={`${styles.btn} ${styles.btnHome} ${isActiveRouteMember(
                        '/admins/activities'
                      )}`}
                    >
                      <a>Activities</a>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/admins/classes" className={`${styles.linkBtn}`}>
                    <div
                      className={`${styles.btn} ${styles.btnHome} ${isActiveRouteMember(
                        '/admins/classes'
                      )}`}
                    >
                      <a>Classes</a>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/admins/members" className={`${styles.linkBtn} `}>
                    <div
                      className={`${styles.btn} ${styles.btnHome} ${isActiveRouteMember(
                        '/admins/members'
                      )}`}
                    >
                      <a>Members</a>
                    </div>
                  </Link>
                </li>
                <Link to="/admins/subscriptions" className={`${styles.linkBtn} `}>
                  <div
                    className={`${styles.btn} ${styles.btnHome} ${isActiveRouteMember(
                      '/admins/subscriptions'
                    )}`}
                  >
                    <li>
                      <a>Subscriptions</a>
                    </li>
                  </div>
                </Link>
                <Link to="/admins/trainers" className={`${styles.linkBtn}`}>
                  <div
                    className={`${styles.btn} ${styles.btnHome} ${isActiveRouteMember(
                      '/admins/trainers'
                    )}`}
                  >
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
                <Link to="/">
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

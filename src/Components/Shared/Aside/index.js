import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './aside.module.css';

const Aside = ({ page }) => {
  if (page === 'home') {
    return (
      <aside className={styles.asideMember} data-testid="container-aside-members">
        <div className={styles.asideSubContainer}>
          <h2 className={styles.title}>Menu</h2>
          <nav className={styles.navbarMember}>
            <ul className={styles.rutesMember}>
              <li>
                <Link to="/" className={styles.btn}>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link to="/login" className={styles.btn}>
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link to="/signUp" className={styles.btn}>
                  <a>SignUp</a>
                </Link>
              </li>
              <li>
                <Link to="/activities" className={styles.btn}>
                  <a>Activities</a>
                </Link>
              </li>
              <li>
                <Link to="/schedule" className={styles.btn}>
                  <a>Schedule</a>
                </Link>
              </li>
              <li>
                <Link to="/membership" className={styles.btn}>
                  <a>Memberships</a>
                </Link>
              </li>
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
              <Link to="/admins/activities">Activities</Link>
            </li>
            <li>
              <Link to="/admins/classes">Classes</Link>
            </li>
            <li>
              <Link to="/admins/members">Members</Link>
            </li>
            <li>
              <Link to="/admins/subscriptions">Subscriptions</Link>
            </li>
            <li>
              <Link to="/admins/trainers">Trainers</Link>
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
              <Link to="/admins">Admins</Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
};
export default Aside;

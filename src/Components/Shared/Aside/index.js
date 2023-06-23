import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './aside.module.css';

const Aside = ({ page }) => {
  if (page === 'member') {
    return (
      <aside className={styles.asideMember}>
        <div className={styles.asideSubContainer}>
          <h2 className={styles.title}>Menu</h2>
          <nav className={styles.navbarMember}>
            <ul className={styles.rutesMember}>
              <Link to="/member/login">
                <a className={styles.btn}>Login</a>
              </Link>
              <Link to="/member/signUp">
                <a className={styles.btn}>SignUp</a>
              </Link>
              <Link to="/member/activities">
                <a className={styles.btn}>Activities</a>
              </Link>
              <Link to="/member/schedule">
                <a className={styles.btn}>Schedule</a>
              </Link>
              <Link to="/member/membership">
                <a className={styles.btn}>Memberships</a>
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
  } else if (page === 'home') {
    return (
      <aside className={styles.aside}>
        <nav className={styles.navbar}>
          <ul className={styles.rutes}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/superAdmins/admins">Admin</Link>
            </li>
            <li>
              <Link to="/member">Members</Link>
            </li>
            <li>
              <Link to="/superAdmins">Super Admins</Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  } else {
    return (
      <aside className={styles.aside}>
        <nav className={styles.navbar}>
          <ul className={styles.rutes}>
            <li>
              <Link to="/admins/activities">Activities</Link>
            </li>
            <li>
              <Link to="/superAdmins/admins">Admins</Link>
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
              <Link to="/superAdmins">Super Admins</Link>
            </li>
            <li>
              <Link to="/admins/trainers">Trainers</Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
};
export default Aside;

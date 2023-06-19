import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './sidebarMember.module.css';
const SidebarMember = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Menu</h2>
      <div>
        <Link to="/member/login">
          <button className={styles.btn}>Login</button>
        </Link>
        <Link to="/member/signUp">
          <button className={styles.btn}>SignUp</button>
        </Link>
        <Link to="/member/activities">
          <button className={styles.btn}>Activities</button>
        </Link>
        <Link to="/member/schedule">
          <button className={styles.btn}>Schedule</button>
        </Link>
        <Link to="/member/membership">
          <button className={styles.btn}>Memberships</button>
        </Link>
      </div>
      <div className={styles.contact}>
        <h3 className={styles.titleContact}>Contact us</h3>
        <li>
          <p>info@megarocket.com</p>
        </li>
        <li>
          <p>(000)0000000</p>
        </li>
        <li>
          <p>1234 somewhere road</p>
        </li>
      </div>
    </div>
  );
};
export default SidebarMember;

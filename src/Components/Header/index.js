import styles from './header.module.css';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  let name = '';

  switch (location.pathname) {
    case '/':
      name = 'Home';
      break;
    case '/activities':
      name = 'Activities';
      break;
    case '/admins':
      name = 'Admins';
      break;
    case '/classes':
      name = 'Classes';
      break;
    case '/members':
      name = 'Members';
      break;
    case '/subscriptions':
      name = 'Subscriptions';
      break;
    case '/superAdmins':
      name = 'Super Admins';
      break;
    case '/trainers':
      name = 'Trainers';
      break;
    default:
      name = 'Form';
      break;
  }
  return (
    <header>
      <div className={styles.container}>
        <h2 className={styles.brand}>{name}</h2>
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo-header.png`} />
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/activities">Activities</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>
            <Link to="/classes">Classes</Link>
          </li>
          <li>
            <Link to="/members">Members</Link>
          </li>
          <li>
            <Link to="/subscriptions">Subscriptions</Link>
          </li>
          <li>
            <Link to="/superAdmins">Super Admins</Link>
          </li>
          <li>
            <Link to="/trainers">Trainers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

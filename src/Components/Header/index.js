import styles from './header.module.css';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  let name = '';

  switch (location.pathname) {
    case '/':
      name = 'Home';
      break;
    case '/admins/activities':
      name = 'Activities';
      break;
    case '/superAdmins/admins':
      name = 'Admins';
      break;
    case '/admins/classes':
      name = 'Classes';
      break;
    case '/admins/members':
      name = 'Members';
      break;
    case '/admins/subscriptions':
      name = 'Subscriptions';
      break;
    case '/superAdmins':
      name = 'Super Admins';
      break;
    case '/admins/trainers':
      name = 'Trainers';
      break;
    default:
      name = 'Form';
      break;
  }
  return (
    <header>
      <div className={styles.container}>
        <h1 className={styles.brand}>{name}</h1>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo-header.png`}
            alt="Mega Rocket Header Logo"
          />
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          <li>
            <Link to="/">Home</Link>
          </li>
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
    </header>
  );
}

export default Header;

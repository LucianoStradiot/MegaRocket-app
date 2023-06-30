import styles from './header.module.css';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  let name = '';

  switch (location.pathname) {
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
      name = '';
      break;
  }
  return (
    <header>
      <div className={styles.container} data-testid="container-header">
        <h1 className={styles.brand}>{name}</h1>
        <div>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo-header.png`}
              alt="Mega Rocket Header Logo"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

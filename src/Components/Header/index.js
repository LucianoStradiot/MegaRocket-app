import styles from './header.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [name, setName] = useState('');
  const value = sessionStorage.getItem('role');

  const updateName = (role) => {
    switch (role) {
      case 'MEMBER':
        setName('Hello Member!');
        break;
      case 'ADMIN':
        setName('Hello Admin!');
        break;
      case 'SUPER_ADMIN':
        setName('Hello Super Admin!');
        break;
      case 'TRAINER':
        setName('Hello Trainer!');
        break;
      default:
        setName('');
        break;
    }
  };
  useEffect(() => {
    updateName(value);
  }, [location]);

  return (
    <header>
      <div className={styles.container} data-testid="container-header">
        <h1 className={styles.brand}>{name}</h1>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo-header.png`}
            alt="Mega Rocket Header Logo"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;

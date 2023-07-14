import styles from './header.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const [name, setName] = useState('');
  const role = sessionStorage.getItem('role');
  const id = sessionStorage.getItem('firebaseUid');
  const user = useSelector((state) => state.user.user);

  const updateName = () => {
    if (user) {
      if (role === 'SUPER_ADMIN') {
        setName('Super Admin');
      } else {
        setName(`${user?.firstName} ${user?.lastName}`);
      }
    } else {
      setName('');
    }
  };

  useEffect(() => {
    updateName();
  }, [user]);

  return (
    <header>
      <div className={styles.container} data-testid="container-header">
        <div className={styles.profileContainer}>
          {id && (
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/ellie.png`}
              className={styles.profile}
            ></img>
          )}
          <p className={styles.brand}>{name}</p>
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo-header2.png`}
            alt="Mega Rocket Header Logo"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAuth } from 'Redux/Auth/thunks';
import styles from './index.module.css';
import Spinner from '../../Components/Shared/Spinner';
import Button from '../../Components/Shared/Button';
import Aside from '../../Components/Shared/Aside';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Profile = () => {
  const dispatch = useDispatch();
  const idLogged = sessionStorage.getItem('firebaseUid');
  const loading = useSelector((state) => state.user.isLoading);
  const dataLog = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getAuth(idLogged));
  }, []);
  console.log(dataLog);

  if (sessionStorage.getItem('role') === 'MEMBER') {
    return (
      <>
        <Aside page={'home'} />
        <section className={styles.container}>
          {loading && <Spinner />}
          <div className={styles.content}>
            <div className={styles.subContainer}>
              <div data-testid="member-first-name">
                <label>First name</label>
                <p>{dataLog?.firstName}</p>
              </div>
              <div data-testid="member-last-name">
                <label>Last name</label>
                <p>{dataLog?.lastName}</p>
              </div>
              <div data-testid="member-email">
                <label>Email</label>
                <p>{dataLog?.email}</p>
              </div>
              <div data-testid="member-dni">
                <label>DNI</label>
                <p>{dataLog?.dni}</p>
              </div>
              <div data-testid="member-phone">
                <label>Phone</label>
                <p>{dataLog?.phone}</p>
              </div>
              <div data-testid="member-city">
                <label>City</label>
                <p>{dataLog?.city}</p>
              </div>
              <div data-testid="member-postal-code">
                <label>Postal Code</label>
                <p>{dataLog?.postalCode}</p>
              </div>
              <div>
                <label>Birthday</label>
                <p>{dataLog?.birthday.substring(0, 10)}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-membership">
                <label>Membership</label>
                <p>{dataLog?.membership}</p>
              </div>
            </div>
            <div className={styles.contButton}>
              <Link to="/profile/form">
                <Button text="Edit" type="create" />
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
  if (sessionStorage.getItem('role') === 'TRAINER') {
    return <h1>Hello</h1>;
  }
  return alert('Profile not found');
};

export default Profile;

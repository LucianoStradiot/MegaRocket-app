import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAuth } from 'Redux/Auth/thunks';
import styles from './index.module.css';
import Spinner from '../../Components/Shared/Spinner';
import Button from '../../Components/Shared/Button';
import Aside from '../../Components/Shared/Aside';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Profile = () => {
  const dispatch = useDispatch();
  const idLogged = sessionStorage.getItem('firebaseUid');
  const loading = useSelector((state) => state.user.isLoading);
  const dataLog = useSelector((state) => state.user.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAuth(idLogged));
  }, []);

  if (sessionStorage.getItem('role') === 'MEMBER') {
    return (
      <>
        <Aside page={'home'} />
        <section className={styles.container}>
          {loading && <Spinner />}
          <div className={styles.content}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/ellie.png`}
              className={styles.profilePhoto}
            />
            <div className={styles.subContainer}>
              <div className={styles.inputContainer} data-testid="member-first-name">
                <label className={styles.label}>First name</label>
                <p className={styles.p}>{dataLog?.firstName}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-last-name">
                <label className={styles.label}>Last name</label>
                <p className={styles.p}>{dataLog?.lastName}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-email">
                <label className={styles.label}>Email</label>
                <p className={styles.p}>{dataLog?.email}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-dni">
                <label className={styles.label}>DNI</label>
                <p className={styles.p}>{dataLog?.dni}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-phone">
                <label className={styles.label}>Phone</label>
                <p className={styles.p}>{dataLog?.phone}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-city">
                <label className={styles.label}>City</label>
                <p className={styles.p}>{dataLog?.city}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-postal-code">
                <label className={styles.label}>Postal Code</label>
                <p className={styles.p}>{dataLog?.postalCode}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Birthday</label>
                <p className={styles.p}>{dataLog?.birthday?.substring(0, 10)}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-membership">
                <label className={styles.label}>Membership</label>
                <p className={styles.p}>{dataLog?.membership}</p>
              </div>
            </div>
            <div className={styles.contButton}>
              <Link to="/profile/form/edit-member">
                <Button text="Edit" type="create" />
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
  if (sessionStorage.getItem('role') === 'TRAINER') {
    return (
      <>
        <Aside page={'home'} />
        <section className={styles.container}>
          {loading && <Spinner />}
          <div className={styles.content}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/ellie.png`}
              className={styles.profilePhoto}
            />
            <div className={styles.subContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>First name</label>
                <p>{dataLog?.firstName}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Last name</label>
                <p>{dataLog?.lastName}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>DNI</label>
                <p>{dataLog?.dni}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Phone</label>
                <p>{dataLog?.phone}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <p>{dataLog?.email}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>City</label>
                <p>{dataLog?.city}</p>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Salary</label>
              <p>{dataLog?.salary}</p>
            </div>
            <div className={styles.btnContainer}>
              <div className={styles.contButton}>
                <Link to="/profile/form/edit-trainer">
                  <Button text="Edit" type="create" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return history.push('/');
};

export default Profile;

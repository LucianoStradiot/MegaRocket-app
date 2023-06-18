import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';
import styles from './activities.module.css';
import { getActiveActivities } from 'Redux/Activities/thunks';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const ActivityInfo = () => {
  const activities = useSelector((state) => state.activities.data);
  const loading = useSelector((state) => state.activities.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveActivities());
  }, []);

  return activities.length > 0 ? (
    <section>
      {loading && <Spinner />}
      <section className={styles.containerTotal}>
        <div className={styles.containerSidebar}>
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
            <h3 className={styles.title}>Contact us</h3>
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
        <main>
          <h1 className={styles.title}>Activities</h1>
          <div className={styles.containerActivity}>
            {activities.map((dataItem, index) => (
              <div key={index} className={styles.boxActivity}>
                <h2 className={styles.titleActivity}>{dataItem.name}</h2>
                <p>{dataItem.description}</p>
              </div>
            ))}
          </div>
        </main>
      </section>
    </section>
  ) : (
    <section className={styles.containerSidebar}>
      {loading && <Spinner />}
      <div className={styles.containerSidebar}>
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
          <h3 className={styles.title}>Contact us</h3>
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
      <p className={styles.info}>There is no Activity yet.</p>
    </section>
  );
};
export default ActivityInfo;

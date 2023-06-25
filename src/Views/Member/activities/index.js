import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';
import styles from './activities.module.css';
import { getActiveActivities } from 'Redux/Activities/thunks';
import Aside from 'Components/Shared/Aside';
const ActivityInfo = () => {
  const activities = useSelector((state) => state.activities.data);
  const loading = useSelector((state) => state.activities.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveActivities());
  }, []);

  return activities.length > 0 ? (
    <>
      <Aside page={'home'} />
      <div className={styles.mainContainer}>
        {loading && <Spinner />}

        <section className={styles.containerTotal}>
          <main className={styles.main}>
            <h2 className={styles.title}>Activities</h2>
            <div className={styles.containerActivity}>
              {activities.map((dataItem, index) => (
                <div key={index} className={styles.boxActivity}>
                  <h2 className={styles.titleActivity}>{dataItem.name}</h2>
                  <p className={styles.p}>{dataItem.description}</p>
                </div>
              ))}
            </div>
          </main>
        </section>
      </div>
    </>
  ) : (
    <>
      <Aside page={'home'} />
      <section className={styles.containerSidebar}>
        {loading && <Spinner />}
        <p className={styles.info}>There is no Activity yet.</p>
      </section>
    </>
  );
};
export default ActivityInfo;

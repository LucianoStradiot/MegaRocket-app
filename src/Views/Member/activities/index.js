import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';
import styles from './activities.module.css';
import { getActiveActivities } from 'Redux/Activities/thunks';
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
      <h1 className={styles.title}>Activities</h1>
      <div className={styles.containerActivity}>
        {activities.map((dataItem, index) => (
          <div key={index} className={styles.boxActivity}>
            <h2 className={styles.titleActivity}>{dataItem.name}</h2>
            <p>{dataItem.description}</p>
          </div>
        ))}
      </div>
    </section>
  ) : (
    <section className={styles.container}>
      {loading && <Spinner />}
      <p className={styles.info}>There is no Activity yet.</p>
    </section>
  );
};
export default ActivityInfo;

import { useEffect, useState } from 'react';
import styles from './activities.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { Link } from 'react-router-dom';
import { getActivities } from '../../Redux/Activities/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Shared/Spinner';

function Activities() {
  /* const [activities, setActivities] = useState([]); */
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteID, setDeleteID] = useState('');
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.data);
  const loading = useSelector((state) => state.activities.isLoading);

  /* const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const { data: activities } = await response.json();
      setActivities(activities);
    } catch (error) {
      setModalInfo({
        title: 'Error!',
        desc: error.message
      });
    }
  }; */

  const deleteActiviy = async (id) => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });

      getActivities();
      const response = await resp.json();
      if (!resp.ok) {
        throw new Error(response.message);
      } else {
        setModalInfo({
          title: 'Success!',
          desc: response.message
        });
        setConfirmModal(false);
      }
    } catch (error) {
      setModalInfo({
        title: 'Error!',
        desc: error.message
      });
      setConfirmModal(false);
    }
  };

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const modalConfirmTrue = () => {
    setConfirmModal(true);
    switchIsOpen();
  };

  const confirmDelete = (id) => {
    setDeleteID(id);
    modalConfirmTrue();
    setModalInfo({
      title: 'Confirm',
      desc: 'Are you sure you want to delete it?'
    });
  };

  const showActive = (activ) => {
    if (activ) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  return activities ? (
    <div className={styles.container}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={switchIsOpen}
        confirmModal={confirmModal}
        deleteFunction={() => deleteActiviy(deleteID)}
      />
      {loading && <Spinner />}
      {!loading && (
        <section>
          <Link to="/activities/form">
            <Button text="Create" />
          </Link>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <th className={`${styles.head} ${styles.th}`}>Activity Name</th>
              <th className={styles.th}>description</th>
              <th className={styles.th}>Status</th>
              <th className={`${styles.headEnd} ${styles.th}`}></th>
            </thead>
            <tbody>
              {activities.map((activity) => {
                return (
                  <tr key={activity._id} className={styles.row}>
                    <td className={styles.row}>{activity.name}</td>
                    <td className={styles.row}>{activity.description}</td>
                    <td className={styles.row}>{showActive(activity.isActive)}</td>
                    <td className={styles.row}>
                      <div className={styles.containerButtons}>
                        <Link to={`/activities/form/${activity._id}`}>
                          <Button text="Edit" type="edit" />
                        </Link>
                        <Button
                          clickAction={() => confirmDelete(activity._id)}
                          type="deleteCancel"
                          text="X"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  ) : (
    <section className={styles.container}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={switchIsOpen}
        confirmModal={confirmModal}
        deleteFunction={() => deleteActiviy(deleteID)}
      />
      <section>
        <Link to="/activities/form">
          <Button text="Create" type="create" />
        </Link>
        <p className={styles.info}>There is no Activity yet.</p>
      </section>
    </section>
  );
}

export default Activities;

import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';
import { Link } from 'react-router-dom';
import { deleteClass, getClasses } from '../../Redux/Classes/thunks';
import { useDispatch, useSelector } from 'react-redux';

function Classes() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.data);
  const loading = useSelector((state) => state.classes.isLoading);

  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const handleDeleteClass = async () => {
    try {
      const response = await dispatch(deleteClass(idDelete));
      if (response.error) {
        throw new Error(response.message);
      } else {
        setResponseModal({
          title: 'Success!',
          description: response.message,
          isConfirm: false
        });
        dispatch(getClasses());
      }
    } catch (error) {
      setResponseModal({
        title: 'Error!',
        description: error.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getClasses());
  }, []);

  const openModalConfirm = (id) => {
    setIdDelete(id);
    setResponseModal({
      title: 'Confirm',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  return classes.length > 0 ? (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => handleDeleteClass()}
      />
      {loading && <Spinner />}
      {!loading && (
        <section>
          <Link to="/classes/form">
            <Button text="Create" type="create" />
          </Link>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={`${styles.firstTH} ${styles.th}`}>Day</th>
                <th className={styles.th}>Hour</th>
                <th className={styles.th}>Trainer</th>
                <th className={styles.th}>Activity</th>
                <th className={styles.th}>Slots</th>
                <th className={`${styles.lastTH} ${styles.th}`}></th>
              </tr>
            </thead>
            <tbody>
              {classes.map((oneClass) => {
                const trainerName = oneClass.trainer
                  ? `${oneClass.trainer.firstName} ${oneClass.trainer.lastName}`
                  : 'empty';
                const activityName = oneClass.activity ? `${oneClass.activity.name}` : 'empty';
                return (
                  <tr key={oneClass._id}>
                    <td className={styles.td}>{oneClass.day}</td>
                    <td className={styles.td}>{oneClass.hour}</td>
                    <td className={styles.td}>{trainerName}</td>
                    <td className={styles.td}>{activityName}</td>
                    <td className={styles.td}>{oneClass.slots}</td>
                    <td className={styles.td}>
                      <Link to={`/classes/form/${oneClass._id}`}>
                        <Button text="Edit" type="edit" />
                      </Link>
                      <Button
                        text="X"
                        type="deleteCancel"
                        clickAction={() => {
                          openModalConfirm(oneClass._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </section>
  ) : (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => handleDeleteClass()}
      />
      <section>
        <Link to="/classes/form">
          <Button text="Create" type="create" />
        </Link>
        <p className={styles.info}>There is no Class yet.</p>
      </section>
    </section>
  );
}

export default Classes;

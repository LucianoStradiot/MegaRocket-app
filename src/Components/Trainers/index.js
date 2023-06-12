import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Shared/Spinner';
import { getTrainers, deleteTrainer } from '../../Redux/Trainers/thunks';

function Trainers() {
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const loading = useSelector((state) => state.trainers.isLoading);

  useEffect(() => {
    dispatch(getTrainers());
  }, [dispatch]);

  const handleDeleteTrainer = async () => {
    const response = await dispatch(deleteTrainer(idDelete));
    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message,
        isConfirm: false
      });
      dispatch(getTrainers());
    } else {
      setResponseModal({
        title: 'Error!',
        description: response.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };

  const showActive = (active) => {
    if (active) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  const openModalConfirm = (id) => {
    setIdDelete(id);
    setResponseModal({
      title: 'Confirm',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  return trainers.length > 0 ? (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => handleDeleteTrainer(idDelete)}
      />
      {loading && <Spinner />}
      {!loading && (
        <section>
          <Link to="/trainers/formTrainers">
            <Button text="Create" type="create" />
          </Link>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={`${styles.head} ${styles.th}`}>Name</th>
                <th className={styles.th}>Dni</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Phone</th>
                <th className={styles.th}>City</th>
                <th className={styles.th}>Salary</th>
                <th className={styles.th}>Status</th>
                <th className={`${styles.headEnd} ${styles.th}`}></th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => {
                return (
                  <tr key={trainer._id}>
                    <td className={styles.row}>
                      {trainer.firstName} {trainer.lastName}
                    </td>
                    <td className={styles.row}>{trainer.dni}</td>
                    <td className={styles.row}>{trainer.email}</td>
                    <td className={styles.row}>{trainer.phone}</td>
                    <td className={styles.row}>{trainer.city}</td>
                    <td className={styles.row}>{trainer.salary}</td>
                    <td className={styles.row}>{showActive(trainer.isActive)}</td>
                    <td className={styles.row}>
                      <div className={styles.containerButtons}>
                        <Link to={`/trainers/formTrainers/${trainer._id}`}>
                          <Button text="Edit" type="edit" />
                        </Link>
                        <Button
                          text="X"
                          type="deleteCancel"
                          clickAction={() => openModalConfirm(trainer._id)}
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
      <section className={styles.sectionForm}></section>
    </section>
  ) : (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => deleteTrainer(idDelete)}
      />
      <section>
        <Link to="/trainers/formTrainers">
          <Button text="Create" type="create" />
        </Link>
        <p className={styles.info}>There is no Trainers yet.</p>
      </section>
    </section>
  );
}

export default Trainers;

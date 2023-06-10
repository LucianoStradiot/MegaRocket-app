import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      const { data: trainers } = await response.json();

      setTrainers(trainers);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };

  const deleteTrainer = async () => {
    try {
      const responseTrainer = await fetch(
        `${process.env.REACT_APP_API_URL}/api/trainers/${idDelete}`,
        {
          method: 'DELETE'
        }
      );

      setTrainers((currentTrainers) => {
        return currentTrainers.filter((trainer) => trainer._id !== idDelete);
      });
      const response = await responseTrainer.json();
      setResponseModal({
        title: 'Succes!',
        description: response.message,
        isConfirm: false
      });
      setIsOpen(true);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
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
      title: '',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
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
      <section className={styles.sectionForm}></section>
    </section>
  );
}

export default Trainers;

import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Shared/Spinner';
import Table from '../Shared/Table';
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
  const loading = useSelector((state) => state.trainers.isPending);

  useEffect(() => {
    dispatch(getTrainers());
  }, []);

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
          <Table
            list={trainers}
            column={['Name', 'Last Name', 'DNI', 'Email', 'Phone', 'City', 'Salary', 'Status', '']}
            fields={[
              'firstName',
              'lastName',
              'dni',
              'email',
              'phone',
              'city',
              'salary',
              'isActive'
            ]}
            link={'/trainers/formTrainers/'}
            action={openModalConfirm}
          />
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

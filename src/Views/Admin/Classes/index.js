import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import { Link } from 'react-router-dom';
import { deleteClass, getClasses } from 'Redux/Classes/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'Components/Shared/Table';
import Aside from 'Components/Shared/Aside';

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
    <>
      <Aside page={'admins'} />
      <div className={styles.container}>
        <section className={styles.subContainer}>
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
              <Link to="/admins/classes/form">
                <Button text="Create" type="create" />
              </Link>
              <Table
                list={classes}
                column={['Day', 'Hour', 'Trainer', 'Activity', 'Slots', '']}
                fields={['day', 'hour', 'trainer.lastName', 'activity.name', 'slots']}
                link={'/admins/classes/form/'}
                action={openModalConfirm}
              />
            </section>
          )}
        </section>
      </div>
    </>
  ) : (
    <>
      <Aside page={'admins'} />
      <div className={styles.container}>
        <section>
          <Modal
            title={responseModal.title}
            desc={responseModal.description}
            isOpen={isOpen}
            confirmModal={responseModal.isConfirm}
            handleClose={() => setIsOpen(!isOpen)}
            deleteFunction={() => handleDeleteClass()}
          />
          <section>
            <Link to="/admins/classes/form">
              <Button text="Create" type="create" />
            </Link>
            <p className={styles.info}>There is no Class yet.</p>
          </section>
        </section>
      </div>
    </>
  );
}

export default Classes;

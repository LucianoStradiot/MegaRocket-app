import { useEffect, useState } from 'react';
import styles from 'Views/SuperAdmin/SAManagement/super-admins.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmin } from 'Redux/SuperAdmins/thunks';
import Spinner from 'Components/Shared/Spinner';
import Table from 'Components/Shared/Table';
import Aside from 'Components/Shared/Aside';

function SuperAdmins() {
  const superAdmins = useSelector((state) => state.superAdmins.data);
  const isLoading = useSelector((state) => state.superAdmins.loading);

  const dispatch = useDispatch();
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const openModalConfirm = (id) => {
    setIdDelete(id);
    setResponseModal({
      title: 'Confirm',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    const response = await dispatch(deleteSuperAdmin(id));
    if (response.error) {
      setResponseModal({
        title: 'Error!',
        description: response.message,
        isConfirm: false
      });
    } else {
      setResponseModal({
        title: 'Success!',
        description: response.message,
        isConfirm: false
      });
    }
  };

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  return (
    <>
      <Aside page={'superAdmins'} />
      {isLoading && <Spinner />}
      {superAdmins.length > 0 ? (
        <div className={styles.mainContainer}>
          <section className={styles.container}>
            <Modal
              title={responseModal.title}
              desc={responseModal.description}
              isOpen={isOpen}
              confirmModal={responseModal.isConfirm}
              handleClose={() => setIsOpen(!isOpen)}
              deleteFunction={() => handleDelete(idDelete)}
            />
            <section>
              <Link to="/superAdmins/form">
                <Button text="Create" type="create" />
              </Link>
              <Table
                list={superAdmins}
                column={['Email', '']}
                fields={['email']}
                link={'/superAdmins/form/'}
                action={openModalConfirm}
              />
            </section>
          </section>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <section className={styles.container}>
            <Modal
              title={responseModal.title}
              desc={responseModal.description}
              isOpen={isOpen}
              confirmModal={responseModal.isConfirm}
              handleClose={() => setIsOpen(!isOpen)}
              deleteFunction={() => handleDelete(idDelete)}
            />
            <section>
              <Link to="/superAdmins/form">
                <Button text="Create" type="create" />
              </Link>
              <p className={styles.info}>There is no SuperAdmins yet.</p>
            </section>
          </section>
        </div>
      )}
      ;
    </>
  );
}

export default SuperAdmins;

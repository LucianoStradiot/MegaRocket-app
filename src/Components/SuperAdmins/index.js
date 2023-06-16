import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmin } from '../../Redux/SuperAdmins/thunks';
import Spinner from '../Shared/Spinner';

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
      {isLoading && <Spinner />}
      {superAdmins.length > 0 ? (
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
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {superAdmins.map((superAdmin) => {
                  return (
                    <tr key={superAdmin._id}>
                      <td className={styles.row}>{superAdmin.email}</td>
                      <td className={styles.row}>
                        <div className={styles.containerButtons}>
                          <Link to={`/superAdmins/form/${superAdmin._id}`}>
                            <Button text="Edit" type="edit" />
                          </Link>
                          <Button
                            text="X"
                            type="deleteCancel"
                            clickAction={() => openModalConfirm(superAdmin._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </section>
      ) : (
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
      )}
      ;
    </>
  );
}

export default SuperAdmins;

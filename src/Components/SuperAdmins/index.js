import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';

function SuperAdmins() {
  const [superAdmins, setSuperAdmin] = useState([]);
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin`);
      const { data: superAdmins } = await response.json();
      setSuperAdmin(superAdmins);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };
  const deleteSuperAdmin = async () => {
    try {
      const responseSuperAdmin = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admin/${idDelete}`,
        {
          method: 'DELETE'
        }
      );
      setSuperAdmin((currentAdmins) => {
        return currentAdmins.filter((superAdmins) => superAdmins._id !== idDelete);
      });
      const response = await responseSuperAdmin.json();
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
    getSuperAdmins();
  }, []);

  return superAdmins ? (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => deleteSuperAdmin(idDelete)}
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
      <section>
        <Link to="/superAdmins/form">
          <Button text="Create" type="create" />
        </Link>
        <p className={styles.info}>There is no SuperAdmins yet.</p>
      </section>
    </section>
  );
}

export default SuperAdmins;

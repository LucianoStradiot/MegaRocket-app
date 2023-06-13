import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
import { deleteAdmin, getAdmins } from '../../Redux/Admins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Shared/Spinner';
function Admins() {
  // const [admins, setAdmins] = useState([]);
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.data);
  const loading = useSelector((state) => state.admins.isLoading);

  const handleDeleteAdmin = async () => {
    try {
      const response = await dispatch(deleteAdmin(idDelete));
      if (!response.error) {
        setResponseModal({
          title: 'Success!',
          description: response.message,
          isConfirm: false
        });
        dispatch(getAdmins());
      } else {
        throw new Error(response.message);
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
    dispatch(getAdmins());
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

  return admins.length > 0 ? (
    <div className={styles.container}>
      <section>
        <Modal
          title={responseModal.title}
          desc={responseModal.description}
          isOpen={isOpen}
          confirmModal={responseModal.isConfirm}
          handleClose={() => setIsOpen(!isOpen)}
          deleteFunction={() => handleDeleteAdmin()}
        />
        {loading && <Spinner />}
        {!loading && (
          <div>
            <Link to="/admins/form">
              <Button text="Create" type="create" />
            </Link>
            <table className={styles.mainTable}>
              <thead>
                <tr className={styles.rowsHead}>
                  <th className={styles.columns1}>Name</th>
                  <th>Last Name</th>
                  <th>DNI</th>
                  <th>Phone</th>
                  <th>E-mail</th>
                  <th>City</th>
                  <th className={styles.columns2}></th>
                </tr>
              </thead>
              <tbody>
                {admins?.map((admin) => {
                  return (
                    <tr className={styles.rows} key={admin?._id}>
                      <td className={styles.columns}>{admin?.firstName}</td>
                      <td className={styles.columns}>{admin?.lastName}</td>
                      <td className={styles.columns}>{admin?.dni}</td>
                      <td className={styles.columns}>{admin?.phone}</td>
                      <td className={styles.columns}>{admin?.email}</td>
                      <td className={styles.columns}>{admin?.city}</td>
                      <td className={styles.columns}>
                        <Link to={`/admins/form/${admin._id}`}>
                          <Button text="Edit" type="edit" />
                        </Link>
                        <Button
                          text="X"
                          type="deleteCancel"
                          clickAction={() => openModalConfirm(admin._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  ) : (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        // deleteFunction={() => deleteAdmin(idDelete)}
      />
      <section>
        <Link to="/admins/form">
          <Button text="Create" type="create" />
        </Link>
        <p className={styles.info}>There is no Admin yet.</p>
      </section>
    </section>
  );
}

export default Admins;

import { useEffect, useState } from 'react';
import styles from 'Views/Admin/Activities/activities.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { Link } from 'react-router-dom';
import { getActivities, delActivities } from 'Redux/Activities/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';
import Table from 'Components/Shared/Table';
import Aside from 'Components/Shared/Aside';

function Activities() {
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

  const handleDelActivity = async () => {
    try {
      const response = await dispatch(delActivities(deleteID));

      if (response.error) {
        throw new Error(response.message);
      } else {
        setModalInfo({
          title: 'Success!',
          desc: response.message
        });
        setConfirmModal(false);
      }
      dispatch(getActivities());
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
  }, []);

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

  return activities.length > 0 ? (
    <>
      <Aside page={'admins'} />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <Modal
            title={modalInfo.title}
            desc={modalInfo.desc}
            isOpen={isOpen}
            handleClose={switchIsOpen}
            confirmModal={confirmModal}
            deleteFunction={() => handleDelActivity()}
          />
          {loading && <Spinner />}
          {!loading && (
            <section>
              <Link to="/admins/activities/form">
                <Button text="Create" />
              </Link>
              <Table
                list={activities}
                column={['Activity name', 'Description', 'Status', '']}
                fields={['name', 'description', 'isActive']}
                link={'/admins/activities/form/'}
                action={confirmDelete}
              />
            </section>
          )}
        </div>
      </div>
    </>
  ) : (
    <div>
      <Aside page={'admins'} />
      <section className={styles.container}>
        <Modal
          title={modalInfo.title}
          desc={modalInfo.desc}
          isOpen={isOpen}
          handleClose={switchIsOpen}
          confirmModal={confirmModal}
          deleteFunction={() => handleDelActivity()}
        />
        <section>
          <Link to="/admins/activities/form">
            <Button text="Create" type="create" />
          </Link>
          <p className={styles.info}>There is no Activity yet.</p>
        </section>
      </section>
    </div>
  );
}

export default Activities;

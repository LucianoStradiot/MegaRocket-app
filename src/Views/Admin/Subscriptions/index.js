import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions, deleteSubscription } from 'Redux/Subscriptions/thunks';
import styles from './subscriptions.module.css';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import Aside from 'Components/Shared/Aside';
import { FiXSquare } from 'react-icons/fi';

function Subscriptions() {
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const pending = useSelector((state) => state.subscriptions.isPending);

  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  const handleDeleteSub = async () => {
    const response = await dispatch(deleteSubscription(idDelete));
    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message,
        isConfirm: false
      });
      dispatch(getSubscriptions());
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

  const fields = ['date', 'member.lastName', 'classes.hour', 'classes.activity.name'];
  const column = ['Date', 'Member Name', 'Class Hour', 'Activity Name', ''];

  return subscriptions.length > 0 ? (
    <>
      <Aside page={'admins'} />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <section className={styles.subContainer}>
            <Modal
              title={responseModal.title}
              desc={responseModal.description}
              isOpen={isOpen}
              confirmModal={responseModal.isConfirm}
              handleClose={() => setIsOpen(!isOpen)}
              deleteFunction={() => handleDeleteSub(idDelete)}
            />
            {pending && <Spinner />}
            {!pending && (
              <div className={styles.tableContainer}>
                <table className={styles.contTable}>
                  <thead className={styles.theadTable}>
                    <tr>
                      {column.map((aux, index) => {
                        if (index === column.length - 1) {
                          return (
                            <th
                              key={index}
                              className={`${styles.thTable} ${styles.headers} ${styles.borderRight}`}
                            >
                              {aux}
                            </th>
                          );
                        } else if (index === 0) {
                          return (
                            <th
                              key={index}
                              className={`${styles.thTable} ${styles.headers} ${styles.borderLeft}`}
                            >
                              {aux}
                            </th>
                          );
                        } else {
                          return (
                            <th key={index} className={`${styles.thTable} ${styles.headers}`}>
                              {aux}
                            </th>
                          );
                        }
                      })}
                    </tr>
                  </thead>
                  <tbody className={styles.tbody}>
                    {subscriptions.map((subscription) => {
                      return (
                        <>
                          <tr key={subscription._id} className={styles.rows}>
                            {fields.map((field, index) => {
                              const nestedFields = field.split('.');
                              const fieldData = nestedFields.reduce(
                                (obj, field) => obj && obj[field],
                                subscription
                              );
                              let transformedFieldData =
                                field === 'date' ? fieldData.substring(0, 10) : fieldData;
                              if (fieldData === (undefined || null)) {
                                if (!fieldData) transformedFieldData = 'empty';
                              }
                              return (
                                <td key={index} className={styles.thTable}>
                                  {transformedFieldData}
                                </td>
                              );
                            })}
                            <td className={styles.thTable} data-testid="buttons-table">
                              <FiXSquare
                                className={`${styles.editIcon} ${styles.trash}`}
                                onClick={() => openModalConfirm(subscription._id)}
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  ) : (
    <>
      <Aside page={'admins'} />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <section>
            <Modal
              title={responseModal.title}
              desc={responseModal.description}
              isOpen={isOpen}
              confirmModal={responseModal.isConfirm}
              handleClose={() => setIsOpen(!isOpen)}
              deleteFunction={() => handleDeleteSub(idDelete)}
            />
            {pending && <Spinner />}
            {!pending && (
              <section>
                <p className={styles.info}>There is no Subscription yet.</p>
              </section>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default Subscriptions;

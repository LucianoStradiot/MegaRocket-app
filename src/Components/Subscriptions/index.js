import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions, deleteSubscription } from '../../Redux/Subscriptions/thunks';
import style from './subscriptions.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Spinner from '../Shared/Spinner';
import { Link } from 'react-router-dom';

function Subscriptions() {
  //const [subscriptions, setSubscriptions] = useState([]);
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

  const showDate = (date) => {
    if (date == undefined) {
      return 'Empty';
    } else {
      return date.substring(0, 10);
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

  return subscriptions.length > 0 ? (
    <section className={style.container}>
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
        <div>
          <Link to="/subscriptions/form">
            <Button type="add" text="Create" className={style.btnCreate} />
          </Link>
          <table className={style.contTable}>
            <thead className={style.theadTable}>
              <tr>
                <th className={style.thTable}>Subscription Date</th>
                <th className={style.thTable}>Name</th>
                <th className={style.thTable}>Class Hour</th>
                <th className={style.thTable}>Activity </th>
                <th className={style.thTable}></th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subs) => {
                return (
                  <tr key={subs._id}>
                    <td className={style.thTable}>{showDate(subs.date)}</td>
                    <td className={style.thTable}>
                      {subs.member && subs.member.firstName && subs.member.lastName
                        ? `${subs.member.firstName} ${subs.member.lastName}`
                        : 'Empty'}
                    </td>
                    <td className={style.thTable}>
                      {subs.classes && subs.classes.hour ? subs.classes.hour : 'Empty'}
                    </td>
                    <td className={style.thTable}>
                      {subs.classes && subs.classes.activity ? subs.classes.activity.name : 'Empty'}
                    </td>
                    <td className={style.thTable}>
                      <Link to={`/subscriptions/form/${subs._id}`}>
                        <Button type="edit" text="Edit" />
                      </Link>
                      <Button
                        text="X"
                        type="deleteCancel"
                        clickAction={() => openModalConfirm(subs._id)}
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
  ) : (
    <section className={style.container}>
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
          <Link to="/subscriptions/form">
            <Button text="Create" type="create" />
          </Link>
          <p className={style.info}>There is no Subscription yet.</p>
        </section>
      )}
    </section>
  );
}

export default Subscriptions;

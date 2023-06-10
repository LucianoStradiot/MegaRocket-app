import React, { useEffect, useState } from 'react';
import style from './subscriptions.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { Link } from 'react-router-dom';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const getSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
        method: 'GET'
      });
      const { data: subscriptions } = await response.json();
      setSubscriptions(subscriptions);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getSubscriptions();
  }, []);

  const deleteSubscriptions = async (id) => {
    try {
      const responseSubscription = await fetch(
        `${process.env.REACT_APP_API_URL}/api/subscriptions/${idDelete}`,
        {
          method: 'DELETE'
        }
      );
      setSubscriptions((currentSubscriptions) => {
        return currentSubscriptions.filter((subs) => subs._id !== id);
      });
      const response = await responseSubscription.json();
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

  const showDate = (date) => {
    if (date == undefined) {
      return 'empty';
    } else {
      return date.substring(0, 10);
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

  return (
    <section className={style.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => deleteSubscriptions(idDelete)}
      />
      <h2 className={style.h2}>Subscriptions</h2>
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
            <th className={style.thTable}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subs) => {
            return (
              <tr key={subs._id}>
                <td className={style.thTable}>{showDate(subs.date)}</td>
                <td className={style.thTable}>
                  {subs.member && subs.member.firstName} {subs.member && subs.member.lastName}
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
    </section>
  );
}

export default Subscriptions;

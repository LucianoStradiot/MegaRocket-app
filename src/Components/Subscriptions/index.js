import React, { useEffect, useState } from 'react';
import style from './subscriptions.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import DatePicker from '../Shared/DatePicker';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [create, setCreate] = useState({
    classes: '',
    member: '',
    date: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [button, setButton] = useState('');
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const getMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'GET'
      });
      const { data: members } = await response.json();
      setMembers(members);
    } catch (error) {
      alert(error);
    }
  };

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`, {
        method: 'GET'
      });
      const { data: classes } = await response.json();
      setClasses(classes);
    } catch (error) {
      alert(error);
    }
  };

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
    getClasses();
    getMembers();
  }, [showForm]);

  const getSubscriptionsById = (id) => {
    const subscription = subscriptions.find((subs) => subs._id === id);
    if (subscription) {
      setCreate({
        _id: subscription._id ? subscription._id : '',
        classes: subscription.classes ? subscription.classes._id : '',
        member: subscription.member ? subscription.member._id : '',
        date: subscription.date || ''
      });
      setShowForm(true);
    }
  };

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

  const onchangeInput = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value || ''
    });
  };

  const createSubscription = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(create)
      });
      const createdSubscription = await response.json();
      if (response.ok) {
        setSubscriptions((currentSubscriptions) => {
          return [...currentSubscriptions, createdSubscription.data];
        });
        setCreate({
          classes: '',
          member: '',
          date: ''
        });
        setShowForm(false);
        setResponseModal({
          title: 'Succes!',
          description: createdSubscription.message,
          isConfirm: false
        });
        setIsOpen(true);
      } else {
        throw new Error(createdSubscription.message);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };

  const updateSubscription = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          classes: create.classes,
          member: create.member,
          date: create.date
        })
      });
      const updatedSubscription = await response.json();
      if (response.ok) {
        const dataIndex = subscriptions.findIndex((sub) => {
          sub._id === id;
        });
        setSubscriptions((currentSub) => {
          const updateSub = [...currentSub];
          updateSub[dataIndex] = updateSub.data;
          return updateSub;
        });
        setShowForm(false);
        setResponseModal({
          title: 'Succes!',
          description: updatedSubscription.message,
          isConfirm: false
        });
        setIsOpen(true);
      } else {
        throw new Error(updatedSubscription.message);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };
  const searchActivity = (id) => {
    let dat;
    classes.map((oneClass) => {
      if (id === oneClass.activity._id) {
        dat = oneClass.activity.name;
      }
    });
    return dat;
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
      <Button
        text="Create"
        clickAction={() => {
          setShowForm(true);
          setButton('Create');
          getMembers();
          setCreate({
            classes: '',
            member: '',
            date: ''
          });
        }}
        type="create"
      />
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
                  {subs.member && subs.classes && subs.classes.hour}
                </td>
                <td className={style.thTable}>
                  {searchActivity(subs.classes && subs.classes.activity)}
                </td>
                <td className={style.thTable}>
                  <Button
                    text="Edit"
                    type="edit"
                    clickAction={() => {
                      getSubscriptionsById(subs._id);
                      setButton('Modify');
                    }}
                  />
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
      {showForm && (
        <form className={style.formSubscription}>
          <label htmlFor="">Classes</label>
          <select
            className={style.inputForm}
            name="classes"
            id="classes"
            onChange={onchangeInput}
            value={create.classes}
          >
            <option value="" disabled>
              Choose a classes
            </option>
            {classes.map((oneClass) => {
              return (
                <option
                  value={oneClass._id}
                  key={oneClass._id}
                  selected={oneClass._id === create.classes}
                >
                  {oneClass.hour} {oneClass.activity.name}, Trainer:{' '}
                  {oneClass.trainer && oneClass.trainer.firstName}
                </option>
              );
            })}
          </select>
          <label htmlFor="">Member Email</label>
          <select
            className={style.inputForm}
            name="member"
            id="member"
            onChange={onchangeInput}
            value={create.member}
          >
            <option value="" disabled>
              Choose a Member
            </option>
            {members.map((subs) => {
              return (
                <option value={subs._id} key={subs._id} selected={subs._id === create.member}>
                  {subs.email}
                </option>
              );
            })}
          </select>
          <label htmlFor="">Date</label>
          <DatePicker
            className={style.inputForm}
            type="date"
            name="date"
            val={create.date}
            changeAction={onchangeInput}
          />
          <Button
            text={button === 'Create' ? 'add' : 'Save'}
            type={button === 'Create' ? 'add' : 'save'}
            clickAction={
              button === 'Create' ? createSubscription : () => updateSubscription(create._id)
            }
          />
          <Button text="Cancel" type="cancel" clickAction={() => setShowForm(false)} />
        </form>
      )}
    </section>
  );
}

export default Subscriptions;

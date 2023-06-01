import React, { useEffect, useState } from 'react';
import style from './subscriptions.module.css';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);
  const [create, setCreate] = useState({
    classes: '',
    member: '',
    date: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [button, setButton] = useState('');
  const getMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'GET'
      });
      const { data: members } = await response.json();
      setMembers(members);
    } catch (error) {
      alert(error.message);
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
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      setSubscriptions((currentSubscriptions) => {
        return currentSubscriptions.filter((subs) => subs._id !== id);
      });
      alert('Subscription successfully deleted.');
    } catch (error) {
      alert(error.message);
    }
  };

  const onchangeInput = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value
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
      console.log(createdSubscription);
      if (response.ok) {
        setSubscriptions((currentSubscriptions) => {
          return [...currentSubscriptions, createdSubscription];
        });
        setCreate({
          classes: '',
          member: '',
          date: ''
        });
        setShowForm(false);
        alert(createdSubscription.message);
      } else {
        throw new Error(createdSubscription.message);
      }
    } catch (error) {
      alert(error);
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
        setSubscriptions((currentSubscriptions) => {
          return currentSubscriptions.map((subs) => {
            if (subs._id === updatedSubscription._id) {
              return updatedSubscription;
            }
            return subs;
          });
        });
        setShowForm(false);
        alert(updatedSubscription.message);
      } else {
        throw new Error(updatedSubscription.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={style.container}>
      <button
        className={style.createButton}
        onClick={() => {
          setShowForm(true);
          setButton('Create');
          getMembers();
          setCreate({
            classes: '',
            member: '',
            date: ''
          });
        }}
      >
        Add
      </button>
      <table className={style.contTable}>
        <thead className={style.theadTable}>
          <tr>
            <th className={style.thTable}>Time slot</th>
            <th className={style.thTable}>Name</th>
            <th className={style.thTable}>Last Name</th>
            <th className={style.thTable}>Email</th>
            <th className={style.thTable}>Date</th>
            <th className={style.thTable}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subs) => {
            return (
              <tr key={subs._id}>
                <td className={style.thTable}>{subs.classes && subs.classes.hour}</td>
                <td className={style.thTable}>{subs.member && subs.member.firstName}</td>
                <td className={style.thTable}>{subs.member && subs.member.lastName}</td>
                <td className={style.thTable}>{subs.member && subs.member.email}</td>
                <td className={style.thTable}>{subs.date.substring(0, 10)}</td>
                <td className={style.thTable}>
                  <button
                    className={style.updateButton}
                    onClick={() => {
                      getSubscriptionsById(subs._id);
                      setButton('Modify');
                    }}
                  >
                    Modify
                  </button>
                  <button
                    className={style.deleteButton}
                    onClick={() => deleteSubscriptions(subs._id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showForm && (
        <form className={style.formSubscription}>
          <label htmlFor="">Classes</label>
          <input
            className={style.inputForm}
            defaultValue={create.classes._id}
            type="text"
            name="classes"
            value={create.classes}
            onChange={onchangeInput}
          />
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
          <input
            className={style.inputForm}
            defaultValue={create.date.substring(0, 10)}
            type="date"
            name="date"
            value={create.date.substring(0, 10)}
            onChange={onchangeInput}
          />
          <button
            className={button === 'Create' ? style.buttonAdd : style.buttonModify}
            type="button"
            onClick={
              button === 'Create' ? createSubscription : () => updateSubscription(create._id)
            }
          >
            {button}
          </button>
          <button className={style.cancelButton} type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </section>
  );
}

export default Subscriptions;

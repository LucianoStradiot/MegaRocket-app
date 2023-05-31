import React, { useEffect, useState } from 'react';
import style from './subscriptions.module.css';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [create, setCreate] = useState({
    classes: '',
    member: '',
    date: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [button, setButton] = useState('');

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
      if (response.ok) {
        const createdSubscription = await response.json();
        setSubscriptions((currentSubscriptions) => {
          return [...currentSubscriptions, createdSubscription];
        });
        alert('Subscription successfully created.');
        setShowForm(false);
      } else {
        alert('Error creating the subscription.');
      }
    } catch (error) {
      alert(error.message);
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
      if (response.ok) {
        const updatedSubscription = await response.json();
        setSubscriptions((currentSubscriptions) => {
          return currentSubscriptions.map((subs) => {
            if (subs._id === updatedSubscription._id) {
              return updatedSubscription;
            }
            return subs;
          });
        });
        setShowForm(false);
        alert('Subscription updated correctly.');
      } else {
        alert('Error updating the subscription.');
      }
    } catch (error) {
      alert('Error updating the subscription.');
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <section className="container">
      <table className="contTable">
        <thead>
          <tr>
            <th>Id Subscription</th>
            <th>Time slot</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subs) => {
            console.log(subs);
            return (
              <tr key={subs._id}>
                <td>{subs._id}</td>
                <td>{subs.classes && subs.classes.hour}</td>
                <td>{subs.member && subs.member.firstName}</td>
                <td>{subs.member && subs.member.lastName}</td>
                <td>{subs.date}</td>
                <td>
                  <button
                    className={style.createButton}
                    onClick={() => {
                      setShowForm(true);
                      setButton('Create');
                    }}
                  >
                    Add
                  </button>
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
        <form className="contForm">
          <label htmlFor="">Classes</label>
          <input
            defaultValue={create.classes._id}
            type="text"
            name="classes"
            value={create.classes}
            onChange={onchangeInput}
          />
          <label htmlFor="">Member</label>
          <input
            defaultValue={create.member._id}
            type="text"
            name="member"
            value={create.member}
            onChange={onchangeInput}
          />
          <label htmlFor="">Date</label>
          <input
            defaultValue={create.date}
            type="date"
            name="date"
            value={create.date}
            onChange={onchangeInput}
          />
          <button
            type="button"
            onClick={
              button === 'Create' ? createSubscription : () => updateSubscription(create._id)
            }
          >
            {button}
          </button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </section>
  );
}

export default Subscriptions;

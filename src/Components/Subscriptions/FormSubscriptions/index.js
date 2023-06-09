import React, { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import DatePicker from '../../Shared/DatePicker';
import Select from '../../Shared/Select';
import style from '../../Subscriptions/subscriptions.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../../Shared/Modal';

const FormSubscriptions = () => {
  const history = useHistory();
  const { id } = useParams();
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [create, setCreate] = useState({
    classes: '',
    member: '',
    date: ''
  });
  const [button, setButton] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const [isSubscriptionCreated, setSubscriptionCreated] = useState(false);
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
    console.log(create.classes);
  }, []);

  useEffect(() => {
    if (subscriptions.length > 0) {
      formEdit(id);
    }
  }, [subscriptions]);

  const formEdit = (id) => {
    if (id) {
      const data = subscriptions.find((aux) => aux._id === id);
      if (data) {
        setCreate({
          classes: data.classes,
          member: data.member,
          date: data.date
        });
        setButton('edit');
      } else {
        console.log('No hay nada pa');
      }
    } else {
      setCreate({
        classes: '',
        member: '',
        date: ''
      });
      setButton('Create');
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
        setResponseModal({
          title: 'Succes!',
          description: createdSubscription.message,
          isConfirm: false
        });
        setSubscriptionCreated(true);
      } else {
        setSubscriptionCreated(false);
        throw new Error(createdSubscription.message);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };

  const updateSubscription = async () => {
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
        setResponseModal({
          title: 'Succes!',
          description: updatedSubscription.message,
          isConfirm: false
        });
        setSubscriptionCreated(true);
      } else {
        setSubscriptionCreated(false);
        throw new Error(updatedSubscription.message);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };
  const closeForm = () => {
    if (isSubscriptionCreated) {
      setIsOpen(false);
      history.goBack();
    }
    setIsOpen(!isOpen);
  };

  return (
    <form className={style.formSubscription}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={closeForm}
      />
      <label htmlFor="">Classes</label>
      <Select
        name="classes"
        selectID="classes"
        changeAction={onchangeInput}
        selectValue={create.classes}
      >
        <option value="" disabled>
          Choose a class
        </option>
        {classes.map((oneClass) => {
          return (
            <option
              value={oneClass._id}
              key={oneClass._id}
              selected={create.classes === oneClass._id}
            >
              {oneClass.hour} {oneClass?.activity?.name}, Trainer:{' '}
              {oneClass.trainer && oneClass.trainer.firstName}
            </option>
          );
        })}
      </Select>
      <label htmlFor="">Member Email</label>
      <Select
        name="member"
        selectID="member"
        changeAction={onchangeInput}
        selectValue={create.member}
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
      </Select>
      <DatePicker
        title="Date"
        className={style.inputForm}
        type="date"
        name="date"
        val={create.date}
        changeAction={onchangeInput}
      />
      <Button
        text={button === 'Create' ? 'add' : 'Save'}
        type={button === 'Create' ? 'add' : 'save'}
        clickAction={button === 'Create' ? createSubscription : updateSubscription}
      />
      <Button text="Cancel" type="cancel" clickAction={() => history.goBack()} />
    </form>
  );
};

export default FormSubscriptions;

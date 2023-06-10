import React, { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import DatePicker from '../../Shared/DatePicker';
import Select from '../../Shared/Select';
import style from './formSubscriptions.module.css';
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
    description: ''
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
  }, []);

  useEffect(() => {
    formEdit(id);
  }, [subscriptions]);

  const formEdit = (id) => {
    if (id) {
      const data = subscriptions.find((aux) => aux._id === id);
      if (data) {
        setCreate({
          classes: data.classes._id,
          member: data.member._id,
          date: data.date
        });
        setButton('edit');
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
        setCreate({
          classes: '',
          member: '',
          date: ''
        });
        setResponseModal({
          title: 'Succes!',
          description: createdSubscription.message
        });
        setSubscriptionCreated(true);
      } else {
        setSubscriptionCreated(false);
        throw new Error(createdSubscription.message);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message
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
        body: JSON.stringify(create)
      });
      const updatedSubscription = await response.json();
      if (response.ok) {
        setResponseModal({
          title: 'Succes!',
          description: updatedSubscription.message
        });
        setSubscriptionCreated(true);
      } else {
        setSubscriptionCreated(false);
        throw new Error(updatedSubscription.message);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message
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
    <form className={style.form}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
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
            <option value={oneClass._id} key={oneClass._id}>
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
      <div className={style.btnContainer}>
        <Button text="Cancel" type="cancel" clickAction={() => history.goBack()} />
        <Button
          text={button === 'Create' ? 'add' : 'Save'}
          type={button === 'Create' ? 'add' : 'save'}
          clickAction={button === 'Create' ? createSubscription : updateSubscription}
        />
      </div>
    </form>
  );
};

export default FormSubscriptions;

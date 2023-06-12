import React, { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import DatePicker from '../../Shared/DatePicker';
import Select from '../../Shared/Select';
import style from './formSubscriptions.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import {
  createSubscription,
  updateSubscription,
  getSubscriptions
} from '../../../Redux/Subscriptions/thunks';
import { useDispatch, useSelector } from 'react-redux';

const FormSubscriptions = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const history = useHistory();
  const { id } = useParams();
  // const [subscriptions, setSubscriptions] = useState([]);
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
      setResponseModal({
        title: 'Error!',
        description: error.message
      });
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
      setResponseModal({
        title: 'Error!',
        description: error.message
      });
    }
  };

  // const getSubscriptions = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
  //       method: 'GET'
  //     });
  //     const { data: subscriptions } = await response.json();
  //     setSubscriptions(subscriptions);
  //   } catch (error) {
  //     setResponseModal({
  //       title: 'Error!',
  //       description: error.message
  //     });
  //   }
  // };
  useEffect(() => {
    dispatch(getSubscriptions());
    getClasses();
    getMembers();
  }, []);

  useEffect(() => {
    formEdit(id);
  }, [dispatch]);

  const formEdit = (id) => {
    if (id) {
      const data = subscriptions.find((aux) => aux._id === id);
      if (data) {
        setCreate({
          classes: data.classes && data.classes._id ? data.classes._id : '',
          member: data.member && data.member._id ? data.member._id : '',
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

  const handleCreationSub = async () => {
    const response = await dispatch(createSubscription(create));
    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setSubscriptionCreated(true);
    } else {
      setSubscriptionCreated(false);
      setResponseModal({
        title: 'Error!',
        description: response.message
      });
    }
    setIsOpen(true);
  };

  const handleUpdateSub = async () => {
    const payload = {
      id: id,
      body: create
    };
    const response = await dispatch(updateSubscription(payload));

    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setSubscriptionCreated(true);
    } else {
      setSubscriptionCreated(false);
      setResponseModal({
        title: 'Error!',
        description: response.message
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
          clickAction={button === 'Create' ? handleCreationSub : handleUpdateSub}
        />
      </div>
    </form>
  );
};

export default FormSubscriptions;

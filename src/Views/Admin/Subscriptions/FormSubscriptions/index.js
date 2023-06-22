import React, { useEffect, useState } from 'react';
import Button from 'Components/Shared/Button';
import DatePicker from 'Components/Shared/DatePicker';
import Select from 'Components/Shared/Select';
import style from './formSubscriptions.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import {
  createSubscription,
  updateSubscription,
  getSubscriptions
} from 'Redux/Subscriptions/thunks';
import { getClasses } from 'Redux/Classes/thunks';
import { getMembers } from 'Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FormSubscriptions = () => {
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.subscriptions.isPending);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const classes = useSelector((state) => state.classes.data);
  const members = useSelector((state) => state.members.data);
  const history = useHistory();
  const { id } = useParams();
  const [button, setButton] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: ''
  });
  const [isSubscriptionCreated, setSubscriptionCreated] = useState(false);

  const schema = Joi.object({
    classes: Joi.string().required().messages({
      'string.empty': 'Please choose an available class',
      'any.only': 'Invalid class'
    }),
    member: Joi.string().required().messages({
      'string.empty': 'Please choose a member',
      'any.only': 'Invalid member'
    }),
    date: Joi.date().required().messages({
      'date.base': 'Please choose a date'
    })
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getClasses());
    dispatch(getMembers());
  }, []);

  useEffect(() => {
    formEdit(id);
  }, []);

  const formEdit = (id) => {
    if (id) {
      const data = subscriptions.find((aux) => aux._id === id);
      if (data) {
        setValue('classes', data.classes && data.classes._id ? data.classes._id : '');
        setValue('member', data.member && data.member._id ? data.member._id : '');
        setValue('date', data.date.substring(0, 10));
        setButton('edit');
      }
    } else {
      setButton('Create');
    }
  };

  const handleCreationSub = async (create) => {
    const response = await dispatch(createSubscription(create));
    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setSubscriptionCreated(true);
    } else {
      setResponseModal({
        title: 'Error!',
        description: response.message
      });
      setSubscriptionCreated(false);
    }
    setIsOpen(true);
  };

  const handleUpdateSub = async (create) => {
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
      setResponseModal({
        title: 'Error!',
        description: response.message
      });
      setSubscriptionCreated(false);
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

  const onSubmit = (data) => {
    id ? handleUpdateSub(data) : handleCreationSub(data);
  };

  return (
    <div className={style.mainContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Modal
          title={responseModal.title}
          desc={responseModal.description}
          isOpen={isOpen}
          handleClose={closeForm}
        />
        {pending && <Spinner />}
        <div>
          <label htmlFor="">Classes</label>
          <Select
            name="classes"
            selectID="classes"
            register={register}
            error={errors.classes?.message}
          >
            <option value="">Choose a class</option>
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
            register={register}
            error={errors.member?.message}
          >
            <option value="">Choose a Member</option>
            {members.map((subs) => {
              return (
                <option value={subs._id} key={subs._id}>
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
            register={register}
            error={errors.date?.message}
          />
          <div className={style.btnContainer}>
            <div>
              <Button text="Cancel" type="submit" clickAction={() => history.goBack()} />
              <Button text="Reset" type="submit" clickAction={() => reset()} />
            </div>
            <Button text={button === 'Create' ? 'Add' : 'Save'} type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormSubscriptions;

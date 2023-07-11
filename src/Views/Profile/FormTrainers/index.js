import React, { useState, useEffect } from 'react';
import Button from 'Components/Shared/Button';
import TextInput from 'Components/Shared/TextInput';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import styles from './form-trainers.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useHistory } from 'react-router-dom';
import { getTrainers, createTrainer, updateTrainer } from 'Redux/Trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';
import { getAuth } from 'Redux/Auth/thunks';

const FormTrainers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [isTrainerCreated, setIsTrainerCreated] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [activeVisible, setActiveVisible] = useState(false);
  const RGXPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const idLogged = sessionStorage.getItem('firebaseUid');
  const dataLog = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getAuth(idLogged));
  }, []);

  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(11)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': 'First name can´t be shorter than 3 characters',
        'string.max': 'First name can´t be longer than 25 characters',
        'string.empty': 'First name can´t be empty'
      }),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        'string.pattern.base': 'Last name must contain letters only',
        'string.min': 'Last name can´t be shorter than 3 characters',
        'string.max': 'Last name can´t be longer than 25 characters',
        'string.empty': 'Last name can´t be empty'
      }),
    dni: Joi.string()
      .regex(/^[0-9]*$/)
      .min(7)
      .max(9)
      .required()
      .messages({
        'string.min': 'DNI must have 7-9 digits',
        'string.max': 'DNI must have 7-9 digits',
        'string.empty': 'DNI can´t be empty',
        'string.pattern.base': 'DNI must be only numbers'
      }),
    phone: Joi.string()
      .regex(/^[0-9]*$/)
      .length(10)
      .required()
      .messages({
        'string.length': 'Phone number must have 10 digits',
        'string.empty': 'Phone number can´t be empty',
        'string.pattern.base': 'Phone number must be only numbers'
      }),
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': 'Email can´t be empty',
      'string.pattern.base': 'Email must be in a valid format'
    }),
    city: Joi.string()
      .min(3)
      .regex(/^[a-zA-Z\s.,]+$/)
      .required()
      .messages({
        'string.pattern.base': 'City must contain letters and spaces only',
        'string.empty': 'City can´t be empty',
        'string.min': 'City must have at least 4 characters'
      }),
    password: Joi.string().regex(RGXPass).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      'string.empty': 'Password can´t be empty'
    }),
    salary: Joi.string()
      .regex(/^[0-9]*$/)
      .min(1)
      .required()
      .messages({
        'string.pattern.base': 'Salary must contain numbers',
        'string.empty': 'Salary can´t be empty',
        'string.min': 'Salary must have at least 1 characters'
      }),
    isActive: Joi.string().valid('true', 'false').allow(true, false)
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({ mode: 'onSubmit', resolver: joiResolver(schema) });

  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const loading = useSelector((state) => state.trainers.isPending);
  useEffect(() => {
    dispatch(getTrainers());
  }, [dispatch]);

  const handleCreationTrainer = async (formValue) => {
    const response = await dispatch(createTrainer(formValue));
    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setIsTrainerCreated(true);
    } else {
      setIsTrainerCreated(false);
      setResponseModal({
        title: 'Error!',
        description: response.message
      });
    }
    setIsOpen(true);
  };

  const handleUpdateTrainer = async (formValue) => {
    const payload = {
      id: dataLog.id,
      body: formValue
    };
    const response = await dispatch(updateTrainer(payload));

    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setIsTrainerCreated(true);
    } else {
      setIsTrainerCreated(false);
      setResponseModal({
        title: 'Error!',
        description: response.message
      });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    formEdit(dataLog._id);
  }, []);

  const formEdit = (id) => {
    if (id) {
      if (dataLog) {
        setValue('firstName', dataLog?.firstName);
        setValue('lastName', dataLog?.lastName);
        setValue('dni', dataLog?.dni.toString());
        setValue('phone', dataLog?.phone.toString());
        setValue('email', dataLog?.email);
        setValue('city', dataLog?.city);
        setValue('password', dataLog?.password);
        setValue('isActive', dataLog?.isActive);
        setAddVisible(false);
        setActiveVisible(true);
        setSaveVisible(true);
      }
    } else {
      setAddVisible(true);
      setActiveVisible(false);
      setSaveVisible(false);
    }
  };

  const onSubmit = (data) => {
    dataLog._id ? handleUpdateTrainer(data) : handleCreationTrainer(data);
  };

  const closeForm = () => {
    if (isTrainerCreated) {
      setIsOpen(false);
      history.goBack();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <section className={styles.mainContainer}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={closeForm}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id="form-trainers">
        <div className={styles.subContainer}>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="First name"
              inputType="text"
              name="firstName"
              register={register}
              selectID="firstName"
              error={errors.firstName?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Last name"
              inputType="text"
              name="lastName"
              register={register}
              selectID="lastName"
              error={errors.lastName?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="DNI"
              inputType="text"
              name="dni"
              register={register}
              selectID="dni"
              error={errors.dni?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Phone"
              inputType="text"
              name="phone"
              register={register}
              selectID="phone"
              error={errors.phone?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Email"
              inputType="text"
              name="email"
              register={register}
              selectID="email"
              error={errors.email?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="City"
              inputType="text"
              name="city"
              register={register}
              selectID="city"
              error={errors.city?.message}
            />
          </div>
          {activeVisible && (
            <div className={styles.inputContainer}>
              <label className={styles.label}>Status</label>
              <Select name="isActive" register={register} error={errors.isActive?.message}>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Select>
            </div>
          )}
        </div>
        <div className={styles.btnContainer}>
          <div>
            <Button text="Cancel" type="submit" clickAction={() => history.goBack()} />
            <Button text="Reset" type="submit" clickAction={() => reset()} />
          </div>
          {buttonAddIsVisible && <Button text="Add" type="submit" testId="trainer-add-button" />}
          {buttonSaveIsVisible && <Button text="Save" type="submit" testId="trainer-save-button" />}
        </div>
      </form>
    </section>
  );
};

export default FormTrainers;

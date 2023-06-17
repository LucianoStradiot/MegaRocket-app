import React, { useState, useEffect } from 'react';
import Button from 'Components/Shared/Button';
import TextInput from 'Components/Shared/TextInput';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import styles from './form-trainers.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useParams, useHistory } from 'react-router-dom';
import { getTrainers, createTrainer, updateTrainer } from 'Redux/Trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';

const FormTrainers = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const history = useHistory();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [isTrainerCreated, setIsTrainerCreated] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [activeVisible, setActiveVisible] = useState(false);
  const RGXPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

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
    dni: Joi.string().min(7).max(9).required().messages({
      'string.min': 'DNI must have 7-9 digits',
      'string.max': 'DNI must have 7-9 digits',
      'string.empty': 'DNI can´t be empty'
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
        'string.pattern.base': 'Salary must contain letters and spaces only',
        'string.empty': 'Salary can´t be empty',
        'string.min': 'salary must have at least 1 characters'
      }),
    isActive: Joi.boolean()
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
      id: id,
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
    formEdit(id);
  }, []);

  const formEdit = (id) => {
    if (id) {
      const data = trainers.find((trainer) => trainer._id === id);
      if (data) {
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('dni', data.dni.toString());
        setValue('phone', data.phone.toString());
        setValue('email', data.email);
        setValue('city', data.city);
        setValue('password', data.password);
        setValue('salary', data.salary.toString());
        setValue('isActive', data.isActive);
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
    id ? handleUpdateTrainer(data) : handleCreationTrainer(data);
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
    <section>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={closeForm}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id="form">
        <div className={styles.subContainer}>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="First name"
              inputType="text"
              name="firstName"
              register={register}
              id="firstName"
              error={errors.firstName?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Last name"
              inputType="text"
              name="lastName"
              register={register}
              id="lastName"
              error={errors.lastName?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="DNI"
              inputType="text"
              name="dni"
              register={register}
              id="dni"
              error={errors.dni?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Phone"
              inputType="text"
              name="phone"
              register={register}
              id="phone"
              error={errors.phone?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Email"
              inputType="text"
              name="email"
              register={register}
              id="email"
              error={errors.email?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="City"
              inputType="text"
              name="city"
              register={register}
              id="city"
              error={errors.city?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Password"
              inputType="password"
              name="password"
              register={register}
              id="password"
              error={errors.password?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Salary"
              inputType="text"
              name="salary"
              register={register}
              id="salary"
              error={errors.salary?.message}
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
            <Button text="Cancel" type="cancel" clickAction={() => history.goBack()} />
            <Button text="Reset" type="reset" clickAction={() => reset()} />
          </div>
          {buttonAddIsVisible && <Button text="Add" type="submit" />}
          {buttonSaveIsVisible && <Button text="Save" type="submit" />}
        </div>
      </form>
    </section>
  );
};

export default FormTrainers;
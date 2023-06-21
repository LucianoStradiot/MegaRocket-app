import React, { useState, useEffect } from 'react';
import Button from 'Components/Shared/Button';
import TextInput from 'Components/Shared/TextInput';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import styles from 'Views/Admin/Classes/FormClasses/form-classes.module.css';
import Spinner from 'Components/Shared/Spinner';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, createClass, updateClass } from 'Redux/Classes/thunks';
import { getActivities } from 'Redux/Activities/thunks';
import { getTrainers } from 'Redux/Trainers/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FormClasses = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.classes.isLoading);
  const classes = useSelector((state) => state.classes.data);
  const trainers = useSelector((state) => state.trainers.data);
  const activities = useSelector((state) => state.activities.data);

  const history = useHistory();
  const { id } = useParams();

  const [btnAddIsVisible, setAddVisible] = useState(false);
  const [btnSaveIsVisible, setSaveVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClassCreated, setIsClassCreated] = useState(false);

  const [responseModal, setResponseModal] = useState({
    title: '',
    description: ''
  });

  const schema = Joi.object({
    day: Joi.string()
      .valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
      .required()
      .messages({
        'any.required': 'Day is required',
        'any.only': 'Please choose an available day'
      }),
    hour: Joi.string()
      .regex(/^((0[9]|1[0-9]|2[01]):00)$/)
      .required()
      .messages({
        'string.pattern.base': 'Please choose an hour from 9:00 am to 21:00 pm'
      }),
    trainer: Joi.string()
      .pattern(/^[a-zA-Z0-9]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Please choose an available trainer',
        'any.required': 'Trainer is required'
      }),
    activity: Joi.string()
      .pattern(/^[a-zA-Z0-9]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Please choose an activity',
        'any.required': 'Activity is required'
      }),
    slots: Joi.number().positive().integer().min(3).max(15).optional().messages({
      'any.empty': 'Activity slots is required',
      'number.base': 'Activity slots must be a number',
      'number.min': 'Activity slots must be at least 3',
      'number.max': 'Activity slots can´t exceed 15'
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

  const handleCreateClass = async (formData) => {
    try {
      const response = await dispatch(createClass(formData));
      if (response.error) {
        throw new Error(response.message);
      } else {
        setResponseModal({
          title: 'Success!',
          description: response.message
        });
        setIsClassCreated(true);
      }
    } catch (error) {
      setResponseModal({
        title: 'Error!',
        description: error.message
      });
      setIsClassCreated(false);
    }
    setIsOpen(true);
  };

  const handleEditClass = async (formData) => {
    try {
      const payload = {
        id: id,
        body: formData
      };
      const response = await dispatch(updateClass(payload));
      if (response.error) {
        throw new Error(response.message);
      } else {
        setResponseModal({
          title: 'Success!',
          description: response.message
        });
        setIsClassCreated(true);
      }
    } catch (error) {
      setResponseModal({
        title: 'Error!',
        description: error.message
      });
      setIsClassCreated(false);
    }
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getActivities());
    dispatch(getTrainers());
  }, []);

  useEffect(() => {
    formEdit(id);
  }, []);

  const formEdit = (id) => {
    if (id) {
      const data = classes.find((oneClass) => oneClass._id === id);
      if (data) {
        setValue('day', data.day);
        setValue('hour', data.hour);
        setValue('trainer', data.trainer ? data.trainer._id : '');
        setValue('activity', data.activity ? data.activity._id : '');
        setValue('slots', data.slots);
        setAddVisible(false);
        setSaveVisible(true);
      } else {
        return false;
      }
    } else {
      setAddVisible(true);
      setSaveVisible(false);
    }
  };

  const onSubmit = (data) => {
    id ? handleEditClass(data) : handleCreateClass(data);
  };

  const closeForm = () => {
    if (isClassCreated) {
      setIsOpen(false);
      history.goBack();
    }
    setIsOpen(!isOpen);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = [
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00'
  ];

  return (
    <div>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        handleClose={closeForm}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="day">
            Day
          </label>
          <Select name="day" selectID="day" register={register} error={errors.day?.message}>
            <option value="undefined" defaultValue>
              Choose a Day
            </option>
            {days.map((day, index) => {
              return (
                <option key={index} value={day}>
                  {day}
                </option>
              );
            })}
          </Select>
          <label className={styles.label} htmlFor="hour">
            Hour
          </label>
          <Select name="hour" selectID="hour" register={register} error={errors.hour?.message}>
            <option value="undefined" defaultValue>
              Choose an hour
            </option>
            {hours.map((hour, index) => {
              return (
                <option key={index} value={hour}>
                  {hour}
                </option>
              );
            })}
          </Select>
          <label className={styles.label} htmlFor="trainer">
            Trainer
          </label>
          <Select
            name="trainer"
            selectID="trainer"
            register={register}
            error={errors.trainer?.message}
          >
            <option value="undefined" defaultValue>
              Choose a Trainer
            </option>
            {trainers.map((trainer) => {
              return (
                <option value={trainer._id} key={trainer._id}>
                  {trainer.firstName} {trainer.lastName}
                </option>
              );
            })}
          </Select>
          <label className={styles.label} htmlFor="activity">
            Activity
          </label>
          <Select
            name="activity"
            selectID="activity"
            register={register}
            error={errors.activity?.message}
          >
            <option value="undefined" defaultValue>
              Choose an Activity
            </option>
            {activities.map((activity) => {
              return (
                <option value={activity._id} key={activity._id}>
                  {activity.name}
                </option>
              );
            })}
          </Select>
          <TextInput
            name="slots"
            inputType="text"
            labelName="Slots"
            register={register}
            error={errors.slots?.message}
          />
        </div>
        <div className={styles.sendContainer}>
          <div>
            <Button text="Cancel" type="submit" clickAction={() => history.goBack()} />
            <Button text="Reset" type="submit" clickAction={() => reset()} />
          </div>
          {btnAddIsVisible && <Button text="Add" type="submit" />}
          {btnSaveIsVisible && <Button text="Save" type="submit" />}
        </div>
      </form>
    </div>
  );
};

export default FormClasses;

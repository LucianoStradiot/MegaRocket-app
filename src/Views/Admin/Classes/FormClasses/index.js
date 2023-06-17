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
        'any.only': 'Invalid day'
      }),
    hour: Joi.string()
      .min(5)
      .max(5)
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .required()
      .messages({
        'string.pattern.base': 'Hour must be in the format hh:mm',
        'string.min': 'Hour must be at least 5 characters long',
        'string.max': 'Hour must not exceed 5 characters'
      }),
    trainer: Joi.string()
      .pattern(/^[a-zA-Z0-9]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Trainer should refer to a valid ID',
        'any.required': 'Trainer is required'
      }),
    activity: Joi.string()
      .pattern(/^[a-zA-Z0-9]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Activity should refer to a valid ID',
        'any.required': 'Activity is required'
      }),
    slots: Joi.number().positive().min(2).max(15).optional()
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
  }, [dispatch]);

  useEffect(() => {
    formEdit(id);
  }, [classes]);

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
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </Select>
          <TextInput
            name="hour"
            inputType="text"
            labelName="Hour"
            register={register}
            error={errors.hour?.message}
          />
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
            <Button text="Cancel" type="cancel" clickAction={() => history.goBack()} />
            <Button text="Reset" type="reset" clickAction={() => reset()} />
          </div>
          {btnAddIsVisible && <Button text="Add" type="submit" />}
          {btnSaveIsVisible && <Button text="Save" type="submit" />}
        </div>
      </form>
    </div>
  );
};

export default FormClasses;

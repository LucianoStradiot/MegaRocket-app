import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'Components/Shared/Button';
import TextInput from 'Components/Shared/TextInput';
import TextArea from 'Components/Shared/TextArea';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import styles from './FormActivities.module.css';
import Spinner from 'Components/Shared/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import { getActivities, createActivities, updateActivities } from 'Redux/Activities/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FormActivities = () => {
  const history = useHistory();
  const { id } = useParams();
  const activities = useSelector((state) => state.activities.data);
  const dispatch = useDispatch();
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [isActivityCreated, setIsActivityCreated] = useState(false);
  const [activeVisible, setActiveVisible] = useState(false);
  const loading = useSelector((state) => state.activities.isLoading);

  const activitySchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        'string.pattern.base': 'Activity name must contain letters only',
        'string.min': 'Activity name can´t be shorter than 3 characters',
        'string.max': 'Activity  name can´t be longer than 15 characters',
        'string.empty': 'Activity name can´t be empty'
      }),
    description: Joi.string()
      .min(40)
      .max(250)
      .regex(/^[a-zA-Z\s.,]+$/)
      .required()
      .messages({
        'string.pattern.base': 'The description must contain letters only',
        'string.min': 'The description can´t be shorter than 40 characters',
        'string.max': 'The description can´t be longer than 250 characters',
        'string.empty': 'The description can´t be empty'
      }),
    isActive: Joi.string().valid('true', 'false').allow(true, false)
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(activitySchema)
  });

  const onSubmit = (data) => {
    id ? handleUpdateActivity(data) : handleCreateActivity(data);
  };

  const handleCreateActivity = async (activityFormValue) => {
    try {
      const response = await dispatch(createActivities(activityFormValue));
      if (response.error) {
        throw new Error(response.message);
      } else {
        setIsActivityCreated(true);
        setModalInfo({
          title: 'Success!',
          desc: response.message
        });
      }
    } catch (error) {
      setIsActivityCreated(false);
      setModalInfo({
        title: 'Error!',
        desc: error.message
      });
    }
    switchIsOpen();
  };

  const handleUpdateActivity = async (activityFormValue) => {
    try {
      const payload = {
        id: id,
        body: activityFormValue
      };
      const response = await dispatch(updateActivities(payload));
      if (response.error) {
        throw new Error(response.message);
      } else {
        setModalInfo({
          title: 'Success!',
          desc: response.message
        });
        setIsActivityCreated(true);
      }
    } catch (error) {
      setModalInfo({
        title: 'Error!',
        desc: error.message
      });
      setIsActivityCreated(false);
    }
    switchIsOpen();
  };

  const formEdit = () => {
    if (id) {
      const data = activities.find((activity) => activity._id === id);
      if (data) {
        setValue('name', data.name);
        setValue('description', data.description);
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

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    if (isActivityCreated) {
      setIsOpen(false);
      history.goBack();
    } else {
      switchIsOpen();
    }
  };

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    formEdit();
  }, [activities]);

  return (
    <div className={styles.mainContainer}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={closeForm}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id="form">
        <div className={styles.subContainer}>
          <div className={styles.inputContainer}>
            <label>Name</label>
            <TextInput
              name="name"
              inputType="text"
              register={register}
              error={errors.name?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Description</label>
            <TextArea name="description" register={register} error={errors.description?.message} />
          </div>
          {activeVisible && (
            <div>
              <label>Status</label>
              <Select name="isActive" register={register} error={errors.isActive?.message}>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Select>
            </div>
          )}
          <div className={styles.btnContainer}>
            <div>
              <Button text="Cancel" type="submit" clickAction={() => history.goBack()} />
              <Button text="Reset" type="submit" clickAction={() => reset()} />
            </div>
            {buttonAddIsVisible && <Button text="Add" type="submit" />}
            {buttonSaveIsVisible && (
              <div>
                <Button type="submit" text="Save" />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormActivities;

import React, { useState, useEffect } from 'react';
import Button from '../../Shared/Button';
import TextInput from '../../Shared/TextInput';
import Select from '../../Shared/Select';
import Modal from '../../Shared/Modal';
import styles from './form-classes.module.css';
import Spinner from '../../Shared/Spinner';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, createClass, updateClass } from '../../../Redux/Classes/thunks';
import { getActivities } from '../../../Redux/Activities/thunks';
import { getTrainers } from '../../../Redux/Trainers/thunks';

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

  const [formData, setFormData] = useState({
    day: '',
    hour: '',
    trainer: '',
    activity: '',
    slots: ''
  });

  const [responseModal, setResponseModal] = useState({
    title: '',
    description: ''
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateClass = async () => {
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

  const handleEditClass = async () => {
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
        setFormData({
          day: data.day,
          hour: data.hour,
          trainer: data.trainer ? data.trainer._id : '',
          activity: data.activity ? data.activity._id : '',
          slots: data.slots
        });
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

  const create = () => {
    handleCreateClass();
  };

  const save = () => {
    handleEditClass();
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
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="day">
            Day
          </label>
          <Select name="day" selectID="day" changeAction={onChange}>
            <option value="undefined" defaultValue>
              Choose a Day
            </option>
            <option value="Monday" selected={formData.day === 'Monday'}>
              Monday
            </option>
            <option value="Tuesday" selected={formData.day === 'Tuesday'}>
              Tuesday
            </option>
            <option value="Wednesday" selected={formData.day === 'Wednesday'}>
              Wednesday
            </option>
            <option value="Thursday" selected={formData.day === 'Thursday'}>
              Thursday
            </option>
            <option value="Friday" selected={formData.day === 'Friday'}>
              Friday
            </option>
            <option value="Saturday" selected={formData.day === 'Saturday'}>
              Saturday
            </option>
          </Select>
          <TextInput
            inputName="hour"
            inputType="text"
            text={formData.hour}
            labelName="Hour"
            changeAction={onChange}
          />
          <label className={styles.label} htmlFor="trainer">
            Trainer
          </label>
          <Select name="trainer" selectID="trainer" changeAction={onChange}>
            <option value="undefined" defaultValue>
              Choose a Trainer
            </option>
            {trainers.map((trainer) => {
              return (
                <option
                  value={trainer._id}
                  key={trainer._id}
                  selected={formData.trainer === trainer._id}
                >
                  {trainer.firstName} {trainer.lastName}
                </option>
              );
            })}
          </Select>
          <label className={styles.label} htmlFor="activity">
            Activity
          </label>
          <Select name="activity" selectID="activity" changeAction={onChange}>
            <option value="undefined" defaultValue>
              Choose an Activity
            </option>
            {activities.map((activity) => {
              return (
                <option
                  value={activity._id}
                  key={activity._id}
                  selected={formData.activity === activity._id}
                >
                  {activity.name}
                </option>
              );
            })}
          </Select>
          <TextInput
            inputName="slots"
            inputType="text"
            labelName="Slots"
            text={formData.slots}
            changeAction={onChange}
          />
        </div>
        <div className={styles.sendContainer}>
          <Button text="Cancel" type="cancel" clickAction={() => history.goBack()} />
          {btnAddIsVisible && <Button text="Add" clickAction={create} type="add" />}
          {btnSaveIsVisible && <Button text="Save" clickAction={save} type="save" />}
        </div>
      </form>
    </div>
  );
};

export default FormClasses;

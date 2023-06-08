import React, { useState, useEffect } from 'react';
import Button from '../../Shared/Button';
import TextInput from '../../Shared/TextInput';
import Select from '../../Shared/Select';
import Modal from '../../Shared/Modal';
import styles from './form-classes.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const FormClasses = () => {
  // const [sendVisible, setSendVisible] = useState(false);
  // const [updateVisible, setUpdateVisible] = useState(false);
  // const sendButtonNotVisible = () => setSendVisible(false);
  // const updateButtonVisible = () => setUpdateVisible(true);
  // const updateButtonNotVisible = () => setUpdateVisible(false);
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const { id } = useParams;
  // const [idStatus, setIDStatus] = useState('');
  const [formData, setFormData] = useState({
    day: '',
    hour: '',
    trainer: '',
    activity: '',
    slots: ''
  });
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const { data: classes } = await response.json();
      setClasses(classes);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };
  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const { data: activities } = await response.json();
      setActivities(activities);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };
  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      const { data: trainers } = await response.json();
      setTrainers(trainers);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const createClass = async () => {
    try {
      const createdClass = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const createdClassData = await createdClass.json();
      if (!createdClass.ok) {
        throw new Error(createdClassData.message);
      } else {
        setClasses((currentClasses) => [...currentClasses, createdClassData.data]);
        setFormData({
          day: '',
          hour: '',
          trainer: '',
          activity: '',
          slots: ''
        });
        setResponseModal({
          title: 'Success!',
          description: createdClassData.message,
          isConfirm: false
        });
        setIsOpen(true);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };
  const editClass = async () => {
    try {
      const updatedClass = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const updatedClassData = await updatedClass.json();
      if (!updatedClass.ok) {
        throw new Error(updatedClassData.message);
      } else {
        const updatedClassIndex = classes.findIndex((oneClass) => oneClass._id === id);
        setClasses((currentClasses) => {
          const updatedClasses = [...currentClasses];
          updatedClasses[updatedClassIndex] = updatedClassData.data;
          return updatedClasses;
        });
        setFormData({
          day: '',
          hour: '',
          trainer: '',
          activity: '',
          slots: ''
        });
        setResponseModal({
          title: 'Success!',
          description: updatedClassData.message,
          isConfirm: false
        });
        setIsOpen(true);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };
  useEffect(() => {
    getActivities();
    getTrainers();
    getClasses();
  }, []);
  // const formEdit = (id) => {
  //   // visible();
  //   // updateButtonVisible();
  //   // sendButtonNotVisible();
  //   // setIDStatus(id);
  //   console.log('primero', formData);
  //   if (id !== 'a') {
  //     const data = classes.find((oneClass) => oneClass._id === id);
  //     console.log('data', data);
  //     console.log('clases', classes);
  //     setFormData({
  //       day: data.day,
  //       hour: data.hour,
  //       trainer: data.trainer ? data.trainer._id : '',
  //       activity: data.activity ? data.activity._id : '',
  //       slots: data.slots
  //     });
  //   } else {
  //     setFormData({
  //       day: '',
  //       hour: '',
  //       trainer: '',
  //       activity: '',
  //       slots: ''
  //     });
  //   }
  //   console.log('segundo', formData);
  // };
  const create = () => {
    createClass();
    // notVisible();
    // sendButtonNotVisible();
  };
  const save = () => {
    editClass();
    // notVisible();
    // updateButtonNotVisible();
  };
  // const [formVisible, setFormVisible] = useState(false);
  // const visible = () => setFormVisible(true);
  // const notVisible = () => setFormVisible(false);
  // const sendButtonVisible = () => setSendVisible(true);
  return (
    <div>
      <Button text="llenar" clickAction={console.log(id)} />
      {/* {() => formEdit(id)} */}
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
      />
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
          <Button
            text="Cancel"
            type="cancel"
            clickAction={() => {
              // notVisible();
              // sendButtonNotVisible();
              // updateButtonNotVisible();
            }}
          />
          <Button
            text="Submit"
            type="create"
            clickAction={() => {
              create();
            }}
          />
          <Button
            text="Update"
            type="create"
            clickAction={() => {
              save();
            }}
          />
        </div>
      </form>
    </div>
  );
};
export default FormClasses;

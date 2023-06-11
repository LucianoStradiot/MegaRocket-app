import React from 'react';
import { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import TextInput from '../../Shared/TextInput';
import TextArea from '../../Shared/TextArea';
import Select from '../../Shared/Select';
import Modal from '../../Shared/Modal';
import styles from './FormActivities.module.css';
import { useHistory, useParams } from 'react-router-dom';

const FormActivities = () => {
  const history = useHistory();
  const { id } = useParams();

  const [activityFormValue, setActivityFormValue] = useState({
    name: '',
    description: '',
    isActive: true
  });
  const [activities, setActivities] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const { data: activities } = await response.json();
      setActivities(activities);
    } catch (error) {
      setModalInfo({
        title: 'Error!',
        desc: error.message
      });
    }
  };
  const [isActivityCreated, setIsActivityCreated] = useState(false);
  const [activeVisible, setActiveVisible] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const createActivity = async () => {
    try {
      const createdActivity = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityFormValue)
      });
      const response = await createdActivity.json();
      if (!createdActivity.ok) {
        throw new Error(response.message);
      } else {
        setIsActivityCreated(true);
        setActivityFormValue({
          name: '',
          descriptionription: ''
        });
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

  const updateActivity = async () => {
    try {
      const updatedActivityResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/activities/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(activityFormValue)
        }
      );
      const response = await updatedActivityResponse.json();
      if (!updatedActivityResponse.ok) {
        throw new Error(response.message);
      } else {
        setActivityFormValue({
          name: '',
          description: '',
          isActive: true
        });
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

  const onChangeInput = (e) => {
    setActivityFormValue({
      ...activityFormValue,
      [e.target.name]: e.target.value
    });
  };

  const formEdit = () => {
    if (id) {
      const data = activities.find((activity) => activity._id === id);
      if (data) {
        setActivityFormValue({
          name: data.name,
          description: data.description,
          isActive: data.isActive
        });
        setAddVisible(false);
        setActiveVisible(true);
        setSaveVisible(true);
      } else {
        return false;
      }
    } else {
      setActivityFormValue({
        name: '',
        description: '',
        isActive: true
      });
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
    getActivities();
  }, []);

  useEffect(() => {
    formEdit();
  }, [activities]);

  return (
    <>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={closeForm}
      />
      <form className={styles.form} onSubmit={onSubmit} id="form">
        <div className={styles.subContainer}>
          <div className={styles.inputContainer}>
            <label>name</label>
            <TextInput
              inputName="name"
              inputType="text"
              changeAction={onChangeInput}
              text={activityFormValue.name}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>description</label>
            <TextArea
              name="description"
              changeAction={onChangeInput}
              val={activityFormValue.description}
            />
          </div>
          {activeVisible && (
            <Select name="isActive" changeAction={onChangeInput}>
              <option value={true} selected={!activityFormValue.isActive}>
                Active
              </option>
              <option value={false} selected={!activityFormValue.isActive}>
                Inactive
              </option>
            </Select>
          )}
          <div className={styles.btnContainer}>
            <Button text="Cancel" clickAction={() => history.goBack()} />
            {buttonAddIsVisible && <Button text="Add" clickAction={createActivity} />}
            {buttonSaveIsVisible && (
              <div>
                <Button clickAction={updateActivity} text="Save" />
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default FormActivities;

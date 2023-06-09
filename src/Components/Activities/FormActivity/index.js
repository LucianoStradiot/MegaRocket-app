import React from 'react';
import { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import TextInput from '../../Shared/TextInput';
import TextArea from '../../Shared/TextArea';
import Select from '../../Shared/Select';
import Modal from '../../Shared/Modal';
import styles from './formActivities.module.css';
import { useHistory /* useParams */ } from 'react-router-dom';

const FormActivities = () => {
  const history = useHistory();
  /* const {id} = useParams(); */

  const [activityFormValue, setActivityFormValue] = useState({
    name: '',
    description: '',
    isActive: ''
  });
  const [activities, setActivities] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  /* const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false); */
  const [idStatus, setIdStatus] = useState('');
  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const { data: activities } = await response.json();
      setActivities(activities);
    } catch (error) {
      setModalInfo({
        title: 'error',
        desc: error.message
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const add = () => {
    createActivity();
    /* formInvisible(); */
  };

  const save = () => {
    updateActivity();
    /* formInvisible(); */
  };

  /* const addVisible = () => {
    setAddVisible(true);
    setSaveVisible(false);
  }; */

  /* const saveVisible = () => {
    setAddVisible(false);
    setSaveVisible(true);
  }; */

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
        setActivities((currentActivities) => [...currentActivities, response.data]);
        setActivityFormValue({
          name: '',
          descriptionription: ''
        });
        setModalInfo({
          title: 'success',
          desc: response.message
        });
        modalConfirmFalse();
      }
    } catch (error) {
      setModalInfo({
        title: 'Error',
        desc: error.message
      });
      modalConfirmFalse();
    }
  };

  const updateActivity = async () => {
    try {
      const updatedActivityResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/activities/${idStatus}`,
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
        const activityDataIndex = activities.findIndex((activity) => activity._id === idStatus);

        setActivities((currentActivities) => {
          const updatedActivities = [...currentActivities];
          updatedActivities[activityDataIndex] = response.data;
          return updatedActivities;
        });
        setActivityFormValue({
          name: '',
          description: '',
          isActive: ''
        });
        setIdStatus('');
        setModalInfo({
          title: 'Success',
          desc: response.message
        });
        modalConfirmFalse();
      }
    } catch (error) {
      setModalInfo({
        title: 'Error',
        desc: error.message
      });
      modalConfirmFalse();
    }
  };

  const onChangeInput = (e) => {
    setActivityFormValue({
      ...activityFormValue,
      [e.target.name]: e.target.value
    });
  };

  /* const modify = (id) => {
    saveVisible();
    setIdStatus(id);
    const data = activities.find((activity) => activity._id === id);

    setActivityFormValue({
      name: data.name,
      description: data.description,
      isActive: data.isActive
    });
  }; */

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const modalConfirmFalse = () => {
    setConfirmModal(false);
    switchIsOpen();
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={() => history.goBack()}
        confirmModal={confirmModal}
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
          {
            <div>
              <Select name="isActive" changeAction={onChangeInput}>
                <option value={true} selected={!activityFormValue.isActive}>
                  Active
                </option>
                <option value={false} selected={!activityFormValue.isActive}>
                  Inactive
                </option>
              </Select>
            </div>
          }
          <div className={styles.btnContainer}>
            <Button text="Cancel" /* clickAction={cancel} */ />
            {/* buttonAddIsVisible &&  */ <Button text="Add" clickAction={add} />}
            {
              /* buttonSaveIsVisible && */ <div>
                <Button clickAction={save} text="Save" />
              </div>
            }
          </div>
        </div>
      </form>
    </>
  );
};

export default FormActivities;

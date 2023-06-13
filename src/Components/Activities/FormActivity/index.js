import React from 'react';
import { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import TextInput from '../../Shared/TextInput';
import TextArea from '../../Shared/TextArea';
import Select from '../../Shared/Select';
import Modal from '../../Shared/Modal';
import styles from './FormActivities.module.css';
import Spinner from '../../Shared/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import {
  getActivities,
  createActivities,
  updateActivities
} from '../../../Redux/Activities/thunks';
import { useDispatch, useSelector } from 'react-redux';

const FormActivities = () => {
  const history = useHistory();
  const { id } = useParams();
  const activities = useSelector((state) => state.activities.data);
  const dispatch = useDispatch();
  const [activityFormValue, setActivityFormValue] = useState({
    name: '',
    description: '',
    isActive: true
  });
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

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleCreateActivity = async () => {
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

  const handleUpdateActivity = async () => {
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
    dispatch(getActivities());
  }, [dispatch]);

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
      {loading && <Spinner />}
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
            {buttonAddIsVisible && <Button text="Add" clickAction={handleCreateActivity} />}
            {buttonSaveIsVisible && (
              <div>
                <Button clickAction={handleUpdateActivity} text="Save" />
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default FormActivities;

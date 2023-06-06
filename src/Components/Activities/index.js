import { useEffect, useState } from 'react';
import styles from './activities.module.css';
import Modal from '../Shared/Modal';
import TextArea from '../Shared/TextArea';
import Select from '../Shared/Select';
import TextInput from '../Shared/TextInput';
import Button from '../Shared/Button';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [idStatus, setIdStatus] = useState('');
  const [activeIsVisible, setActiveVisible] = useState(false);
  const [activityFormValue, setActivityFormValue] = useState({
    name: '',
    description: '',
    isActive: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [confirmModal, setConfirmModal] = useState(false);
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

  /* const deleteActiviy = async (id) => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      setActivities((currentActivities) => {
        return currentActivities.filter((activities) => activities._id !== id);
      });
      getActivities();
      const response = await resp.json();
      if (!resp.ok) {
        throw new Error(response.message);
      } else {
        setModalInfo({
          title: 'Success',
          desc: response.message
        });
      }
    } catch (error) {
      setModalInfo({
        title: 'Error',
        desc: error.message
      });
    }
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

  const onSubmit = (e) => {
    e.preventDefault();
    createActivity();
    formInvisible();
  };

  const save = () => {
    updateActivity();
    formInvisible();
  };

  const cancel = () => {
    formInvisible();
  };

  const create = () => {
    formVisible();
    addVisible();
    activeInvisible();
    setActivityFormValue({
      name: '',
      description: ''
    });
  };

  const modify = (id) => {
    formVisible();
    saveVisible();
    activeVisible();
    setIdStatus(id);
    const data = activities.find((activity) => activity._id === id);

    setActivityFormValue({
      name: data.name,
      description: data.description,
      isActive: data.isActive
    });
  };

  const formVisible = () => {
    setIsVisible(true);
  };

  const formInvisible = () => {
    setIsVisible(false);
  };

  const addVisible = () => {
    setAddVisible(true);
    setSaveVisible(false);
  };

  const saveVisible = () => {
    setAddVisible(false);
    setSaveVisible(true);
  };

  const activeVisible = () => {
    setActiveVisible(true);
  };

  const activeInvisible = () => {
    setActiveVisible(false);
  };

  const showActive = (active) => {
    if (active) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const modalConfirmTrue = () => {
    setConfirmModal(true);
    switchIsOpen();
  };

  const modalConfirmFalse = () => {
    setConfirmModal(false);
    switchIsOpen();
  };

  return (
    <div className={styles.container}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={switchIsOpen}
        confirmModal={confirmModal}
      />
      <section>
        <h2 className={styles.h2}>Activities</h2>
        <button onClick={create} className={styles.createButton}>
          Create
        </button>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <th className={`${styles.head} ${styles.th}`}>Activity Name</th>
            <th className={styles.th}>description</th>
            <th className={styles.th}>Status</th>
            <th className={`${styles.headEnd} ${styles.th}`}></th>
          </thead>
          <tbody>
            {activities.map((activity) => {
              return (
                <tr key={activity._id} className={styles.row}>
                  <td className={styles.row}>{activity.name}</td>
                  <td className={styles.row}>{activity.description}</td>
                  <td className={styles.row}>{showActive(activity.isActive)}</td>
                  <td className={styles.row}>
                    <div className={styles.containerButtons}>
                      <Button clickAction={() => modify(activity._id)} text="Modify" type="edit" />
                      <Button
                        clickAction={/* () => deleteActiviy(activity._id) */ modalConfirmTrue}
                        type="deleteCancel"
                        text="X"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      {isVisible && (
        <section className={styles.sectionForm}>
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
              {activeIsVisible && (
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
              )}
              <div className={styles.btnContainer}>
                <Button text="Cancel" clickAction={cancel} />
                {buttonAddIsVisible && <Button text="Add" clickAction={modalConfirmFalse} />}
                {buttonSaveIsVisible && (
                  <div>
                    <Button clickAction={save} text="Save" />
                  </div>
                )}
              </div>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export default Activities;

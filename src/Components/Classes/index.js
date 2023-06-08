import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Button from '../Shared/Button';
import TextInput from '../Shared/TextInput';
import Select from '../Shared/Select';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
function Classes() {
  const [formData, setFormData] = useState({
    day: '',
    hour: '',
    trainer: '',
    activity: '',
    slots: ''
  });
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const [idStatus, setIDStatus] = useState('');
  const [classes, setClasses] = useState([]);
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

  const [activities, setActivities] = useState([]);
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

  const [trainers, setTrainers] = useState([]);
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

  const deleteClass = async () => {
    try {
      const deleteActivity = await fetch(
        `${process.env.REACT_APP_API_URL}/api/classes/${idDelete}`,
        {
          method: 'DELETE'
        }
      );

      const deletedActivity = await deleteActivity.json();
      if (!deleteActivity.ok) {
        throw new Error(deletedActivity.message);
      }
      setClasses((currentClasses) => {
        return currentClasses.filter((oneClass) => oneClass._id !== idDelete);
      });
      getClasses();
      setResponseModal({
        title: 'Success!',
        description: deletedActivity.message,
        isConfirm: false
      });
      setIsOpen(true);
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
      const updatedClass = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${idStatus}`, {
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
        const updatedClassIndex = classes.findIndex((oneClass) => oneClass._id === idStatus);
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

  const [formVisible, setFormVisible] = useState(false);

  const visible = () => setFormVisible(true);

  const notVisible = () => setFormVisible(false);

  const [sendVisible, setSendVisible] = useState(false);

  const sendButtonVisible = () => setSendVisible(true);

  const sendButtonNotVisible = () => setSendVisible(false);

  const [updateVisible, setUpdateVisible] = useState(false);

  const updateButtonVisible = () => setUpdateVisible(true);

  const updateButtonNotVisible = () => setUpdateVisible(false);

  const formEdit = (id) => {
    visible();
    updateButtonVisible();
    sendButtonNotVisible();
    setIDStatus(id);

    const data = classes.find((oneClass) => oneClass._id === id);

    setFormData({
      day: data.day,
      hour: data.hour,
      trainer: data.trainer ? data.trainer._id : '',
      activity: data.activity ? data.activity._id : '',
      slots: data.slots
    });
  };

  const create = () => {
    createClass();
    notVisible();
    sendButtonNotVisible();
  };

  const save = () => {
    editClass();
    notVisible();
    updateButtonNotVisible();
  };

  const openModalConfirm = (id) => {
    setIdDelete(id);
    setResponseModal({
      title: '',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };
  return (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => deleteClass(idDelete)}
      />
      <h2>Classes</h2>
      <Link to="/classes/form">
        <Button text="Add" type="create" />
      </Link>
      <Button
        text="Create"
        type="create"
        clickAction={() => {
          visible();
          sendButtonVisible();
          updateButtonNotVisible();
          setFormData({
            day: '',
            hour: '',
            trainer: '',
            activity: '',
            slots: ''
          });
        }}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.firstTH} ${styles.th}`}>Day</th>
            <th className={styles.th}>Hour</th>
            <th className={styles.th}>Trainer</th>
            <th className={styles.th}>Activity</th>
            <th className={styles.th}>Slots</th>
            <th className={styles.th}></th>
            <th className={`${styles.lastTH} ${styles.th}`}></th>
          </tr>
        </thead>
        <tbody>
          {classes.map((oneClass) => {
            const trainerName = oneClass.trainer
              ? `${oneClass.trainer.firstName} ${oneClass.trainer.lastName}`
              : 'empty';
            const activityName = oneClass.activity ? `${oneClass.activity.name}` : 'empty';
            return (
              <tr key={oneClass._id}>
                <td className={styles.td}>{oneClass.day}</td>
                <td className={styles.td}>{oneClass.hour}</td>
                <td className={styles.td}>{trainerName}</td>
                <td className={styles.td}>{activityName}</td>
                <td className={styles.td}>{oneClass.slots}</td>
                <td className={styles.td}>
                  <Link to={`/classes/form/${oneClass._id}`}>
                    <Button text="edit" type="edit" />
                  </Link>
                  <Button text="Edit" type="edit" clickAction={() => formEdit(oneClass._id)} />
                </td>
                <td className={styles.td}>
                  <Button
                    text="X"
                    type="deleteCancel"
                    clickAction={() => {
                      openModalConfirm(oneClass._id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {formVisible && (
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
                notVisible();
                sendButtonNotVisible();
                updateButtonNotVisible();
              }}
            />
            {sendVisible && (
              <Button
                text="Submit"
                type="create"
                clickAction={() => {
                  create();
                }}
              />
            )}
            {updateVisible && (
              <Button
                text="Update"
                type="create"
                clickAction={() => {
                  save();
                }}
              />
            )}
          </div>
        </form>
      )}
    </section>
  );
}

export default Classes;

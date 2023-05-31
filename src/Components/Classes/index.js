import { useEffect, useState } from 'react';
import styles from './classes.module.css';

function Classes() {
  const [formData, setFormData] = useState({
    day: '',
    hour: '',
    trainer: '',
    activity: '',
    slots: ''
  });

  const [idStatus, setIDStatus] = useState('');
  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const { data: classes } = await response.json();
      setClasses(classes);
    } catch (error) {
      alert(error);
    }
  };

  const [activities, setActivities] = useState([]);
  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const { data: activities } = await response.json();
      setActivities(activities);
    } catch (error) {
      alert(error);
    }
  };

  const [trainers, setTrainers] = useState([]);
  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      const { data: trainers } = await response.json();
      setTrainers(trainers);
    } catch (error) {
      alert(error);
    }
  };

  const deleteClass = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, { method: 'DELETE' });
      setClasses((currentClasses) => {
        return currentClasses.filter((oneClass) => oneClass._id !== id);
      });
      getClasses();
    } catch (error) {
      alert(error);
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
        alert(createdClassData.message);
      }
    } catch (error) {
      alert(error);
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

        alert(updatedClassData.message);
      }
    } catch (error) {
      alert(error);
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
      trainer: data.trainer._id,
      activity: data.activity._id,
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

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <button
        onClick={() => {
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
        className={styles.createClassButton}
      >
        Create Class
      </button>
      <table>
        <thead>
          <tr>
            <th className={styles.firstTH}>Day</th>
            <th>Hour</th>
            <th>Trainer</th>
            <th>Activity</th>
            <th>Slots</th>
            <th></th>
            <th className={styles.lastTH}></th>
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
                <td>{oneClass.day}</td>
                <td>{oneClass.hour}</td>
                <td>{trainerName}</td>
                <td>{activityName}</td>
                <td>{oneClass.slots}</td>
                <td>
                  <button
                    key={oneClass._id}
                    onClick={() => {
                      formEdit(oneClass._id);
                    }}
                    className={styles.editButton}
                  >
                    edit
                  </button>
                </td>
                <td>
                  <button
                    key={oneClass._id}
                    onClick={() => deleteClass(oneClass._id)}
                    className={styles.delete}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {formVisible && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formContainer}>
            <label htmlFor="day">day</label>
            <select name="day" id="day" onChange={onChange}>
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
            </select>
            <label htmlFor="hour">Hour</label>
            <input id="hour" type="text" name="hour" value={formData.hour} onChange={onChange} />
            <label htmlFor="trainer">Trainer</label>
            <select name="trainer" id="trainer" onChange={onChange}>
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
            </select>
            <label htmlFor="activity">Activity</label>
            <select name="activity" id="activity" onChange={onChange}>
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
            </select>
            <label htmlFor="slots">Slots</label>
            <input id="slots" type="text" name="slots" value={formData.slots} onChange={onChange} />
          </div>
          <div className={styles.sendContainer}>
            <button
              onClick={() => {
                notVisible();
                sendButtonNotVisible();
                updateButtonNotVisible();
              }}
            >
              Cancel
            </button>
            {sendVisible && <input type="submit" value="Send" onClick={create} />}
            {updateVisible && <input type="submit" value="Update" onClick={save} />}
          </div>
        </form>
      )}
    </section>
  );
}

export default Classes;

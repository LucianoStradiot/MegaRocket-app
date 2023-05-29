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

  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/classes`);
      const { data: classes } = await response.json();
      setClasses(classes);
    } catch (error) {
      console.error(error);
    }
  };

  const [activities, setActivities] = useState([]);
  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/activities`);
      const { data: activities } = await response.json();
      setActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };

  const [trainers, setTrainers] = useState([]);
  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers`);
      const { data: trainers } = await response.json();
      setTrainers(trainers);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClass = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/classes/${id}`, { method: 'DELETE' });
      setClasses((currentClasses) => {
        return currentClasses.filter((oneClass) => oneClass._id !== id);
      });
      getClasses();
    } catch (error) {
      console.error(error);
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
      const createdClass = await fetch(`${process.env.REACT_APP_API_URL}/classes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!createdClass.ok) {
        const errorData = await createdClass.json();
        throw new Error(JSON.stringify(errorData));
      } else {
        const createdClassData = await createdClass.json();
        setClasses((currentClasses) => [...currentClasses, createdClass.data]);
        console.log(createdClassData);
        setFormData({
          day: '',
          hour: '',
          trainer: '',
          activity: '',
          slots: ''
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  /* const editClass = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error(error);
    }
  }; */

  useEffect(() => {
    getClasses();
    getActivities();
    getTrainers();
  }, []);

  const [isVisible, setVisible] = useState(false);

  const visible = () => setVisible(true);

  const notVisible = () => setVisible(false);

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <button onClick={visible}>Create Class</button>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hour</th>
            <th>Trainer</th>
            <th>Activity</th>
            <th>Slots</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((oneClass) => {
            return (
              <tr key={oneClass._id}>
                <td>{oneClass.day}</td>
                <td>{oneClass.hour}</td>
                <td>
                  {oneClass.trainer.firstName} {oneClass.trainer.lastName}
                </td>
                <td>{oneClass.activity.name}</td>
                <td>{oneClass.slots}</td>
                <td>
                  <button key={oneClass._id} onClick={() => deleteClass(oneClass._id)}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isVisible && (
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="day"></label>
          <select name="day" id="day" onChange={onChange}>
            <option value="undefined">Choose a Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
          <label htmlFor="hour">Hour</label>
          <input id="hour" type="text" name="hour" onChange={onChange} />
          <label htmlFor="trainer">Trainer</label>
          <select name="trainer" id="trainer" onChange={onChange}>
            <option value="undefined">Choose a Trainer</option>
            {trainers.map((trainer) => {
              return (
                <option value={trainer._id} key={trainer._id}>
                  {trainer.firstName} {trainer.lastName}
                </option>
              );
            })}
          </select>
          <label htmlFor="activity">Activity</label>
          <select name="activity" id="activity" onChange={onChange}>
            <option value="undefined">Choose an Activity</option>
            {activities.map((activity) => {
              return (
                <option value={activity._id} key={activity._id}>
                  {activity.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="slots">Slots</label>
          <input id="slots" type="text" name="slots" onChange={onChange} />
          <button onClick={notVisible}>Cancel</button>
          <input type="submit" value="Send" onClick={() => createClass()} />
        </form>
      )}
    </section>
  );
}

export default Classes;

import { useEffect, useState } from 'react';
import styles from './activities.module.css';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [activityFormValue, setActivityFormValue] = useState({
    name: '',
    description: ''
  });
  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/activities`);
      const { data: activities } = await response.json();
      setActivities(activities);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteActiviy = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/activities/${id}`, { method: 'DELETE' });
      setActivities((currentActivities) => {
        return currentActivities.filter((activities) => activities._id !== id);
      });
      getActivities();
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setActivityFormValue({
      ...activityFormValue,
      [e.target.name]: e.target.value
    });
  };

  const createActivity = async () => {
    try {
      const createdActivity = await fetch(`${process.env.REACT_APP_API_URL}/activities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityFormValue)
      });
      if (createdActivity.ok) {
        const createdActdata = await createdActivity.json();
        setActivities((currentActivities) => [...currentActivities, createdActdata]);
        setActivityFormValue({
          name: '',
          description: ''
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActivities();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    createActivity();
  };
  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div>
      <section className={styles.container}>
        <h2>Activities</h2>
        {activities.map((activity) => {
          return (
            <div key={activity._id} className={styles.list}>
              <li>{activity.name}</li>
              <button onClick={() => deleteActiviy(activity._id)}>Delete</button>
            </div>
          );
        })}
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <label>name</label>
          <input name="name" type="text" onChange={onChange} />
          <label>description</label>
          <input name="description" type="text" onChange={onChange}></input>
          <button type="submit">Create</button>
        </form>
      </section>
    </div>
  );
}

export default Activities;

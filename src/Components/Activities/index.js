import { useEffect, useState } from 'react';
import styles from './activities.module.css';

function Activities() {
  const [activities, setActivities] = useState([]);

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

  const createActivity = async () => {
    try {
      const createdActivity = await fetch(`${process.env.REACT_APP_API_URL}/activities/`, {
        method: 'POST',
        body: {
          name: '',
          description: '',
          isActive: ''
        }
      });
      setActivities((currentActivities) => {
        return [...currentActivities, createdActivity];
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActivities();
  }, []);

  const [actNameValue, setActNameValue] = useState('');
  const onChangeNameInput = (event) => {
    setActNameValue(event.target.value);
    console.log(event.target.value);
  };
  const [actDescription, setActDescription] = useState('');
  const onChangeDescription = (event) => {
    setActDescription(event.target.value);
    console.log(event.target.value);
  };

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
        <form onSubmit={createActivity}>
          <label>name</label>
          <input name="name" type="text" value={actNameValue} onChange={onChangeNameInput} />
          <label>description</label>
          <input
            name="description"
            type="text"
            value={actDescription}
            onChange={onChangeDescription}
          ></input>
          <label>status</label>
          <select>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button type="submit" onSubmit={(e) => e.preventDefault()}>
            Create
          </button>
        </form>
      </section>
    </div>
  );
}

export default Activities;

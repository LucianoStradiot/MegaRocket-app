import { useEffect, useState } from 'react';
import styles from './activities.module.css';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [idStatus, setIdStatus] = useState('');
  const [activityFormValue, setActivityFormValue] = useState({
    name: '',
    description: '',
    isActive: true
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

  const createActivity = async () => {
    try {
      const createdActivity = await fetch(`${process.env.REACT_APP_API_URL}/activities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityFormValue)
      });
      if (!createdActivity.ok) {
        const errorResponse = await createdActivity.json();
        throw new Error(errorResponse.message);
      } else {
        const createdActdata = await createdActivity.json();
        setActivities((currentActivities) => [...currentActivities, createdActdata.data]);
        setActivityFormValue({
          name: '',
          description: ''
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateActivity = async () => {
    try {
      const updatedActivityResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/activities/${idStatus}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(activityFormValue)
        }
      );

      if (!updatedActivityResponse.ok) {
        const errorResponse = await updatedActivityResponse.json();
        throw new Error(errorResponse.message);
      } else {
        const updatedActivity = await updatedActivityResponse.json();
        const activityDataIndex = activities.findIndex((activity) => activity._id === idStatus);

        setActivities((currentActivities) => {
          const updatedActivities = [...currentActivities];
          updatedActivities[activityDataIndex] = updatedActivity.data;
          return updatedActivities;
        });
        setActivityFormValue({
          name: '',
          description: '',
          isActive: true
        });
        setIdStatus('');
      }
    } catch (error) {
      alert(error);
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

  const create = () => {
    formVisible();
    addVisible();
  };

  const modify = (id) => {
    formVisible();
    saveVisible();
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

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div>
      <section className={styles.container}>
        <h2>Activities</h2>
        <button onClick={create}>Create</button>
        <table>
          <tbody>
            {activities.map((activity) => {
              return (
                <tr key={activity._id} className={styles.row}>
                  <td>{activity.name}</td>
                  <td>{activity.description}</td>
                  <td>
                    <button className={styles.updateButton} onClick={() => modify(activity._id)}>
                      Modify
                    </button>
                    <button onClick={() => deleteActiviy(activity._id)}>X</button>
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
            <label>name</label>
            <input
              name="name"
              type="text"
              onChange={onChangeInput}
              value={activityFormValue.name}
            />
            <label>description</label>
            <input
              name="description"
              type="text"
              onChange={onChangeInput}
              value={activityFormValue.description}
            ></input>

            {buttonAddIsVisible && <button type="submit">add</button>}
            {buttonSaveIsVisible && (
              <div>
                <button className={styles.button} onClick={save}>
                  Save
                </button>
              </div>
            )}
          </form>
        </section>
      )}
    </div>
  );
}

export default Activities;

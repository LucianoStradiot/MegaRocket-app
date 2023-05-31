import { useEffect, useState } from 'react';
import styles from './activities.module.css';

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
  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const { data: activities } = await response.json();
      setActivities(activities);
    } catch (error) {
      alert(error);
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
      alert(error);
    }
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
        `${process.env.REACT_APP_API_URL}/api/activities/${idStatus}`,
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
          isActive: ''
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

  return (
    <div className={styles.container}>
      <section>
        <h2>Activities</h2>
        <button onClick={create} className={styles.createButton}>
          Create
        </button>
        <table>
          <thead>
            <th className={styles.head}>Activity Name</th>
            <th>Description</th>
            <th>Status</th>
            <th className={styles.headEnd}></th>
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
                      <button className={styles.updateButton} onClick={() => modify(activity._id)}>
                        Modify
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteActiviy(activity._id)}
                      >
                        X
                      </button>
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
                <input
                  name="name"
                  type="text"
                  onChange={onChangeInput}
                  value={activityFormValue.name}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>description</label>
                <textarea
                  className={styles.inputDescription}
                  name="description"
                  type="text"
                  onChange={onChangeInput}
                  value={activityFormValue.description}
                />
              </div>
              {activeIsVisible && (
                <div>
                  <select name="isActive" onChange={onChangeInput}>
                    <option value={true} selected={!activityFormValue.isActive}>
                      Active
                    </option>
                    <option value={false} selected={!activityFormValue.isActive}>
                      Inactive
                    </option>
                  </select>
                </div>
              )}
              <div className={styles.btnContainer}>
                <button className={`${styles.button} ${styles.btnCancel}`} onClick={cancel}>
                  Cancel
                </button>
                {buttonAddIsVisible && (
                  <button className={styles.button} type="submit">
                    add
                  </button>
                )}
                {buttonSaveIsVisible && (
                  <div>
                    <button className={styles.button} onClick={save}>
                      Save
                    </button>
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

import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [activeIsVisible, setActiveVisible] = useState(false);
  const [idStatus, setIdStatus] = useState('');
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    salary: '',
    isActive: ''
  });

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers`);
      const { data: trainers } = await response.json();

      setTrainers(trainers);
    } catch (error) {
      alert(error);
    }
  };

  const deleteTrainer = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/trainers/${id}`, {
        method: 'DELETE'
      });

      setTrainers((currentTrainers) => {
        return currentTrainers.filter((trainer) => trainer._id !== id);
      });

      alert('Trainer deleted succesfully!');
      getTrainers();
    } catch (error) {
      alert(error);
    }
  };

  const createTrainer = async () => {
    try {
      const createdTrainerResponse = await fetch(`${process.env.REACT_APP_API_URL}/trainers/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
      });
      const createdTrainer = await createdTrainerResponse.json();
      if (createdTrainerResponse.ok) {
        setTrainers((currentTrainers) => {
          return [...currentTrainers, createdTrainer.data];
        });

        setFormValue({
          firstName: '',
          lastName: '',
          dni: '',
          phone: '',
          email: '',
          city: '',
          password: '',
          salary: '',
          isActive: true
        });
        alert(createdTrainer.message);
      } else {
        throw new Error(createdTrainer.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateTrainer = async () => {
    try {
      const updatedTrainerResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/trainers/${idStatus}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValue)
        }
      );
      const updatedTrainer = await updatedTrainerResponse.json();
      if (updatedTrainerResponse.ok) {
        const dataIndex = trainers.findIndex((trainer) => trainer._id === idStatus);

        setTrainers((currentTrainers) => {
          const updatedTrainers = [...currentTrainers];
          updatedTrainers[dataIndex] = updatedTrainer.data;
          return updatedTrainers;
        });

        setFormValue({
          firstName: '',
          lastName: '',
          dni: '',
          phone: '',
          email: '',
          city: '',
          password: '',
          salary: '',
          isActive: ''
        });

        setIdStatus('');
        alert(updatedTrainer.message);
      } else {
        throw new Error(updatedTrainer.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onChangeInput = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    createTrainer();
    formInvisible();
  };

  const save = () => {
    updateTrainer();
    formInvisible();
  };

  const cancel = () => {
    formInvisible();
  };

  const create = () => {
    formVisible();
    addVisible();
    activeInvisible();

    setFormValue({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      password: '',
      salary: '',
      isActive: true
    });
  };

  const modify = (id) => {
    formVisible();
    saveVisible();
    activeVisible();
    setIdStatus(id);

    const data = trainers.find((trainer) => trainer._id === id);

    setFormValue({
      firstName: data.firstName,
      lastName: data.lastName,
      dni: data.dni,
      phone: data.phone,
      email: data.email,
      city: data.city,
      password: data.password,
      salary: data.salary,
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
    getTrainers();
  }, []);

  return (
    <section className={styles.container}>
      <section>
        <h2>Trainers</h2>
        <button onClick={create} className={styles.createButton}>
          Create
        </button>
        <table>
          <thead>
            <th className={styles.head}>Name</th>
            <th>Dni</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Salary</th>
            <th>Status</th>
            <th className={styles.headEnd}></th>
          </thead>
          <tbody>
            {trainers.map((trainer) => {
              return (
                <tr key={trainer._id}>
                  <td className={styles.row}>
                    {trainer.firstName} {trainer.lastName}
                  </td>
                  <td className={styles.row}>{trainer.dni}</td>
                  <td className={styles.row}>{trainer.email}</td>
                  <td className={styles.row}>{trainer.phone}</td>
                  <td className={styles.row}>{trainer.city}</td>
                  <td className={styles.row}>{trainer.salary}</td>
                  <td className={styles.row}>{showActive(trainer.isActive)}</td>
                  <td className={styles.row}>
                    <div className={styles.containerButtons}>
                      <button className={styles.updateButton} onClick={() => modify(trainer._id)}>
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteTrainer(trainer._id)}
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
          <form className={styles.form} onSubmit={submit} id="form">
            <div className={styles.subContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Name</label>
                <input
                  className={styles.input}
                  name="firstName"
                  id="firstName"
                  type="text"
                  value={formValue.firstName}
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Last Name</label>
                <input
                  className={styles.input}
                  name="lastName"
                  type="text"
                  value={formValue.lastName}
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>DNI</label>
                <input
                  className={styles.input}
                  name="dni"
                  type="text"
                  value={formValue.dni}
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Phone</label>
                <input
                  className={styles.input}
                  name="phone"
                  type="text"
                  value={formValue.phone}
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  name="email"
                  type="text"
                  value={formValue.email}
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>City</label>
                <input
                  className={styles.input}
                  name="city"
                  type="text"
                  value={formValue.city}
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  name="password"
                  type="password"
                  value={formValue.password}
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Salary</label>
                <input
                  className={styles.input}
                  name="salary"
                  type="text"
                  value={formValue.salary}
                  onChange={onChangeInput}
                />
              </div>
              {activeIsVisible && (
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Status</label>
                  <select className={styles.input} name="isActive" onChange={onChangeInput}>
                    <option value={true} selected={!formValue.isActive}>
                      Active
                    </option>
                    <option value={false} selected={!formValue.isActive}>
                      Inactive
                    </option>
                  </select>
                </div>
              )}
            </div>
            <div className={styles.btnContainer}>
              <button className={`${styles.button} ${styles.btnCancel}`} onClick={cancel}>
                Cancel
              </button>
              {buttonAddIsVisible && (
                <button className={styles.button} onClick={submit}>
                  Add
                </button>
              )}
              {buttonSaveIsVisible && (
                <button className={styles.button} onClick={save}>
                  Save
                </button>
              )}
            </div>
          </form>
        </section>
      )}
    </section>
  );
}

export default Trainers;

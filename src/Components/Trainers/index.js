import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';

function Trainers() {
  const [trainers, setTrainers] = useState([]);

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers`);
      const { data: trainers } = await response.json();

      setTrainers(trainers);
    } catch (error) {
      console.log(error);
      // show error in UI
    }
  };

  const deleteTrainer = async (id) => {
    try {
      // Delete a la BD
      await fetch(`${process.env.REACT_APP_API_URL}/trainers/${id}`, {
        method: 'DELETE'
      });

      // Delete in Front End
      setTrainers((currentTrainers) => {
        return currentTrainers.filter((trainer) => trainer._id !== id);
      });
      alert('Trainer deleted succesfully!');
      getTrainers();
    } catch (error) {
      console.error(error);
      // show error in UI
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
      if (createdTrainerResponse.ok) {
        const createdTrainer = await createdTrainerResponse.json();
        console.log(createdTrainer);
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
        alert('Trainer created succesfully!');
      } else {
        const resp = await createdTrainerResponse.json();
        alert(resp.message);
      }
    } catch (error) {
      console.error(error);
      // show error in UI
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

      setTrainers((currentTrainers) => {
        return [...currentTrainers, updatedTrainer.data];
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
      setIdStatus('');
    } catch (error) {
      console.error(error);
      // show error in UI
    }
  };

  const [formValue, setFormValue] = useState({
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

  const [isVisible, setIsVisible] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [idStatus, setIdStatus] = useState('');

  const onChangeInput = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTrainer();
    formInvisible();
  };

  const save = () => {
    updateTrainer();
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
    getTrainers();
  }, []);
  return (
    <section className={styles.container}>
      <section>
        <h2>Trainers</h2>
        <button onClick={create}>Create</button>
        <table>
          <tbody>
            {trainers.map((trainer) => {
              return (
                <tr key={trainer._id}>
                  <td className={styles.row}>{trainer.firstName}</td>
                  <td className={styles.row}>{trainer.email}</td>
                  <td className={styles.row}>{trainer.phone}</td>
                  <td className={styles.row}>{trainer.city}</td>
                  <td className={styles.row}>
                    <button className={styles.updateButton} onClick={() => modify(trainer._id)}>
                      Modify
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteTrainer(trainer._id)}
                    >
                      X
                    </button>
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
                <label className={styles.label}>Name</label>
                <input
                  className={styles.input}
                  name="firstName"
                  type="text"
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Last Name</label>
                <input
                  className={styles.input}
                  name="lastName"
                  type="text"
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>DNI</label>
                <input className={styles.input} name="dni" type="text" onChange={onChangeInput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Phone</label>
                <input className={styles.input} name="phone" type="text" onChange={onChangeInput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} name="email" type="text" onChange={onChangeInput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>City</label>
                <input className={styles.input} name="city" type="text" onChange={onChangeInput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  name="password"
                  type="password"
                  onChange={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Salary</label>
                <input
                  className={styles.input}
                  name="salary"
                  type="text"
                  onChange={onChangeInput}
                />
              </div>
            </div>
            {buttonAddIsVisible && (
              <button className={styles.button} type="submit">
                Add
              </button>
            )}
            {buttonSaveIsVisible && (
              <button className={styles.button} onClick={save}>
                Save
              </button>
            )}
          </form>
        </section>
      )}
    </section>
  );
}

export default Trainers;

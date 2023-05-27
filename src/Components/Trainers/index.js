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

      getTrainers();
    } catch (error) {
      console.error(error);
      // show error in UI
    }
  };

  // const createTrainer = async () => {
  //   const form = document.getElementById('form');
  //   const name = form.elements.name.value;
  //   const email = form.elements.email.value;

  //   const data = {
  //     firstName: name,
  //     email: email
  //   };

  //   try {
  //     const createdTrainer = await fetch(`${process.env.REACT_APP_API_URL}/trainers/`, {
  //       method: 'POST',
  //       body: JSON.stringify(data)
  //     });

  //     setTrainers((currentTrainers) => {
  //       return [...currentTrainers, createdTrainer]; // Not sure if this is right
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     // show error in UI
  //   }
  // };

  useEffect(() => {
    getTrainers();
  }, []);

  // const [trainer, setTrainer] = useState({
  //   name: '',
  //   email: ''
  // });

  // const onChangeInput = (e) => {
  //   setTrainer({
  //     ...trainer,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   createTrainer(trainer);
  //   setTrainer({
  //     name: '',
  //     email: ''
  //   });
  // };

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <button>Create</button>
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => {
            return (
              <tr key={trainer._id}>
                <td>{trainer.firstName}</td>
                <td>{trainer.email}</td>
                <td></td>
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
      <form className={styles.form} /*onSubmit={onSubmit}*/ id="form">
        <div className={styles.subContainer}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              name="name"
              type="text"
              value={trainers.name}
              //onChange={onChangeInput}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              name="email"
              type="text"
              value={trainers.email}
              //onChange={onChangeInput}
            />
          </div>
        </div>
        <button className={styles.button} type="submit">
          Add
        </button>
      </form>
    </section>
  );
}

export default Trainers;

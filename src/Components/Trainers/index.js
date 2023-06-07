import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import Button from '../Shared/Button';
import TextInput from '../Shared/TextInput';
import Modal from '../Shared/Modal';
import Select from '../Shared/Select';

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
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

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

  const deleteTrainer = async () => {
    try {
      const responseTrainer = await fetch(
        `${process.env.REACT_APP_API_URL}/api/trainers/${idDelete}`,
        {
          method: 'DELETE'
        }
      );

      setTrainers((currentTrainers) => {
        return currentTrainers.filter((trainer) => trainer._id !== idDelete);
      });
      const response = await responseTrainer.json();
      setResponseModal({
        title: 'Succes!',
        description: response.message,
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

  const createTrainer = async () => {
    try {
      const createdTrainerResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`, {
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
        setResponseModal({
          title: 'Succes!',
          description: createdTrainer.message,
          isConfirm: false
        });
        setIsOpen(true);
      } else {
        throw new Error(createdTrainer.message);
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

  const updateTrainer = async () => {
    try {
      const updatedTrainerResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/trainers/${idStatus}`,
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
        setResponseModal({
          title: 'Succes!',
          description: updatedTrainer.message,
          isConfirm: false
        });
        setIsOpen(true);
      } else {
        throw new Error(updatedTrainer.message);
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

  const edit = (id) => {
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

  const openModalConfirm = (id) => {
    setIdDelete(id);
    setResponseModal({
      title: '',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => deleteTrainer(idDelete)}
      />
      <section>
        <h2 className={styles.h2}>Trainers</h2>
        <Button text="Create" clickAction={create} type="create" />
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={`${styles.head} ${styles.th}`}>Name</th>
              <th className={styles.th}>Dni</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Phone</th>
              <th className={styles.th}>City</th>
              <th className={styles.th}>Salary</th>
              <th className={styles.th}>Status</th>
              <th className={`${styles.headEnd} ${styles.th}`}></th>
            </tr>
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
                      <Button text="Edit" type="edit" clickAction={() => edit(trainer._id)} />
                      <Button
                        text="X"
                        type="deleteCancel"
                        clickAction={() => openModalConfirm(trainer._id)}
                      />
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
                <TextInput
                  labelName="First name"
                  inputType="text"
                  inputName="firstName"
                  id="firstName"
                  text={formValue.firstName}
                  changeAction={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName="Last name"
                  inputType="text"
                  inputName="lastName"
                  id="lastName"
                  text={formValue.lastName}
                  changeAction={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName="DNI"
                  inputType="text"
                  inputName="dni"
                  id="dni"
                  text={formValue.dni}
                  changeAction={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName="Phone"
                  inputType="text"
                  inputName="phone"
                  id="phone"
                  text={formValue.phone}
                  changeAction={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName="Email"
                  inputType="text"
                  inputName="email"
                  id="email"
                  text={formValue.email}
                  changeAction={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName="City"
                  inputType="text"
                  inputName="city"
                  id="city"
                  text={formValue.city}
                  changeAction={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName="Password"
                  inputType="password"
                  inputName="password"
                  id="password"
                  text={formValue.password}
                  changeAction={onChangeInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName="Salary"
                  inputType="text"
                  inputName="salary"
                  id="salary"
                  text={formValue.salary}
                  changeAction={onChangeInput}
                />
              </div>
              {activeIsVisible && (
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Status</label>
                  <Select name="isActive" changeAction={onChangeInput}>
                    <option value={true} selected={!formValue.isActive}>
                      Active
                    </option>
                    <option value={false} selected={!formValue.isActive}>
                      Inactive
                    </option>
                  </Select>
                </div>
              )}
            </div>
            <div className={styles.btnContainer}>
              <Button text="Cancel" clickAction={cancel} type="cancel" />
              {buttonAddIsVisible && <Button text="Add" clickAction={submit} type="add" />}
              {buttonSaveIsVisible && <Button text="Save" clickAction={save} type="save" />}
            </div>
          </form>
        </section>
      )}
    </section>
  );
}

export default Trainers;

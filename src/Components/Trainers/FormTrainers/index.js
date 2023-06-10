import React, { useState, useEffect } from 'react';
import Button from '../../Shared/Button';
import TextInput from '../../Shared/TextInput';
import Select from '../../Shared/Select';
import Modal from '../../Shared/Modal';
import styles from './form-trainers.module.css';
import { useParams, useHistory } from 'react-router-dom';

const FormTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [isTrainerCreated, setIsTrainerCreated] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [activeVisible, setActiveVisible] = useState(false);
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
        setIsTrainerCreated(true);
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
      setIsTrainerCreated(false);
    }
  };

  const updateTrainer = async () => {
    try {
      const updatedTrainerResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/trainers/${id}`,
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

        setResponseModal({
          title: 'Succes!',
          description: updatedTrainer.message,
          isConfirm: false
        });
        setIsOpen(true);
        setIsTrainerCreated(true);
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
      setIsTrainerCreated(false);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  useEffect(() => {
    formEdit(id);
  }, [trainers]);

  const formEdit = (id) => {
    if (id) {
      const data = trainers.find((trainer) => trainer._id === id);
      if (data) {
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
        setAddVisible(false);
        setActiveVisible(true);
        setSaveVisible(true);
      } else {
        return false;
      }
    } else {
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
      setAddVisible(true);
      setActiveVisible(false);
      setSaveVisible(false);
    }
  };

  const create = () => {
    createTrainer();
  };

  const save = () => {
    updateTrainer();
  };

  const onChangeInput = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  };

  const closeForm = () => {
    if (isTrainerCreated) {
      setIsOpen(false);
      history.goBack();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <section>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={closeForm}
      />
      <form className={styles.form} onSubmit={(e) => e.preventDefault()} id="form">
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
          {activeVisible && (
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
          <Button
            text="Cancel"
            type="cancel"
            clickAction={() => {
              history.goBack();
            }}
          />
          {buttonAddIsVisible && <Button text="Add" type="create" clickAction={create} />}
          {buttonSaveIsVisible && <Button text="Save" type="create" clickAction={save} />}
        </div>
      </form>
    </section>
  );
};

export default FormTrainers;

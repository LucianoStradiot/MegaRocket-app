import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../Shared/TextInput';
import Button from '../../Shared/Button';
import styles from './formSuperAdmin.module.css';

const FormSuperAdmin = ({ createForm }) => {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: ''
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      [name]: value
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
  };

  const cancel = () => {
    // Lógica para cancelar y reiniciar el formulario
  };

  const save = () => {
    // Lógica para guardar los datos del formulario
  };

  const btnAddIsVisible = true; // Cambia esto según tus necesidades
  const btnSaveIsVisible = true; // Cambia esto según tus necesidades

  return createForm ? (
    <section className={styles.sectionForm}>
      <h2>FORM PARA CREAR</h2>
      <form className={styles.form} id="form">
        <div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Email"
              inputType="text"
              inputName="email"
              id="email"
              text={dataForm.email}
              changeAction={onChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Password"
              inputType="password"
              inputName="password"
              id="password"
              text={dataForm.password}
              changeAction={onChange}
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          {btnAddIsVisible && (
            <Link to="/superAdmins">
              <Button text="Cancel" clickAction={cancel} type="cancel" />
            </Link>
          )}
          {btnAddIsVisible && (
            <Link to="/superAdmins">
              <Button text="Add" clickAction={submit} type="add" />
            </Link>
          )}
        </div>
      </form>
    </section>
  ) : (
    <section className={styles.sectionForm}>
      <h2>FORM PARA EDITAR</h2>
      <form className={styles.form} id="form">
        <div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Email"
              inputType="text"
              inputName="email"
              id="email"
              text={dataForm.email}
              changeAction={onChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Password"
              inputType="password"
              inputName="password"
              id="password"
              text={dataForm.password}
              changeAction={onChange}
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          {btnAddIsVisible && (
            <Link to="/superAdmins">
              <Button text="Cancel" clickAction={cancel} type="cancel" />
            </Link>
          )}
          {btnSaveIsVisible && (
            <Link to="/superAdmins">
              <Button text="Save" clickAction={save} type="save" />
            </Link>
          )}
        </div>
      </form>
    </section>
  );
};

export default FormSuperAdmin;

import React, { useState } from 'react';
import styles from './form.module.css';

const Form = ({ AddMember }) => {
  const [member, setMember] = useState({
    name: '',
    email: ''
    });

  const onChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  const onChangeNameinput = (e) => {
    setMember({
      ...member,
      name: e.tareget.value
    });
  };

  const onChangeEmailInput = (e) => {
    setMember({
      ...member,
      email: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addItem(member);
    setMember({
      name: '',
      email: ''
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div clasName={styles.subContainer}>
        <div clasName={styles.inputContainer}>
          <label clasName={styles.label}>Name</label>
          <input
            className="name"
            name="name"
            type="text"
            value={user.name}
            onChange={onChangeNameInput}
          />
        <div>
        <div clasName={styles.inputContainer}>
          <label clasName={styles.label}>Email</label>
          <input
            className={styles.input}
            name="email"
            type="text"
            value={user.email}
            onChange={onChangeEmailInput}
            />
        </div>
      </div>
      <button clasName={styles.button} type="submit">
        Add
      </button>
    </form>
  )
  };

import React from 'react';
import styles from './form.module.css';

const Form = ({
  addMember,
  memberValues,
  setMemberValues,
  updateMember,
  idMember,
  setIdMember
}) => {
  const onChange = (e) => {
    setMemberValues({
      ...memberValues,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (idMember === '') {
      addMember(memberValues);
    } else {
      updateMember(idMember);
    }
    setIdMember('');
    setMemberValues({
      firstName: '',
      lastName: '',
      email: '',
      dni: '',
      phone: '',
      city: '',
      birthday: '2023-05-29T07:32:26+0000',
      postalCode: '',
      membership: '',
      isActive: true
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.subContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>First Name</label>
          <input
            className="name"
            name="firstName"
            type="text"
            value={memberValues.firstName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Last Name</label>
            <input
              className={styles.input}
              name="lastName"
              type="text"
              value={memberValues.lastName}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              name="email"
              type="text"
              value={memberValues.email}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>DNI</label>
            <input
              className={styles.input}
              name="dni"
              type="number"
              value={memberValues.dni}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Phone</label>
            <input
              className={styles.input}
              name="phone"
              type="number"
              value={memberValues.phone}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>City</label>
            <input
              className={styles.input}
              name="city"
              type="text"
              value={memberValues.city}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Birthday</label>
            <input
              className={styles.input}
              name="birthday"
              type="date"
              value={memberValues.birthday}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>PostalCode</label>
            <input
              className={styles.input}
              name="postalCode"
              type="number"
              value={memberValues.postalCode}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Membership</label>
            <input
              className={styles.input}
              name="membership"
              type="text"
              value={memberValues.membership}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>IsActive</label>
            <input
              className={styles.input}
              name="isActive"
              type="checkbox"
              value={memberValues.isActive}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <button className={styles.button} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};
export default Form;

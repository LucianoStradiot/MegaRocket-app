import styles from './datePicker.module.css';
import React from 'react';

const DatePicker = ({ title, name, val, changeAction }) => {
  return (
    <section className={styles.container}>
      <label className={styles.label}>{title}</label>
      <input
        className={styles.datePicker}
        defaultValue={val ? val.substring(0, 10) : ''}
        type="date"
        name={name}
        value={val}
        onChange={changeAction}
      ></input>
    </section>
  );
};

export default DatePicker;

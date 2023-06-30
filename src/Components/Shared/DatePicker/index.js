import styles from './datePicker.module.css';
import React from 'react';

const DatePicker = ({ title, name, val, register, error, testId }) => {
  return (
    <section className={styles.container}>
      <label className={styles.label} data-testId="label-date-picker">
        {title}
      </label>
      <input
        className={`${styles.datePicker} ${error ? styles.error : ''}`}
        defaultValue={val ? val.substring(0, 10) : ''}
        type="date"
        name={name}
        {...register(name)}
        data-testid={testId}
      ></input>
      <p className={styles.errorMsg}>{error}</p>
    </section>
  );
};

export default DatePicker;

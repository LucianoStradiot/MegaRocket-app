import styles from './select.module.css';
import React from 'react';

const Select = ({ name, selectID, register, children, error, testId }) => {
  return (
    <div>
      <select
        {...register(name)}
        className={styles.select}
        id={selectID}
        name={name}
        data-testid={testId}
      >
        {children}
      </select>
      <p className={styles.errorMsg}>{error}</p>
    </div>
  );
};

export default Select;

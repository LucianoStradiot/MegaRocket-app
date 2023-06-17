import styles from './select.module.css';
import React from 'react';

const Select = ({ name, selectID, register, children, error }) => {
  return (
    <div>
      <select {...register(name)} className={styles.select} id={selectID} name={name}>
        {children}
      </select>
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
};

export default Select;

import styles from './select.module.css';
import React from 'react';

const Select = ({ name, selectValue, selectID, changeAction, children }) => {
  return (
    <select
      className={styles.select}
      id={selectID}
      name={name}
      onChange={changeAction}
      value={selectValue}
    >
      {children}
    </select>
  );
};

export default Select;

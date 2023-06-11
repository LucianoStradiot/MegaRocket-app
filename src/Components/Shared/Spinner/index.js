import React from 'react';
import styles from './spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <img className={styles.spinner} src={`${process.env.PUBLIC_URL}/assets/images/spinner.svg`} />
    </div>
  );
};

export default Spinner;

import styles from './textInput.module.css';
import React from 'react';

const TextInput = ({ inputType, selectID, labelName, name, register, error, testId }) => {
  return (
    <div>
      <label className={styles['form-label']} data-testid={testId}>
        {labelName}
      </label>
      <input
        {...register(name)}
        className={`${styles['form-input']} ${error ? styles.error : ''}`}
        name={name}
        type={inputType}
        id={selectID}
        data-testid={testId}
      />
      <p className={styles.errorMsg}>{error}</p>
    </div>
  );
};

export default TextInput;

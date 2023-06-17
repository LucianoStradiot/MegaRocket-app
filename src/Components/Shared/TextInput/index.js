// import { useState, useEffect } from 'react';
import styles from './textInput.module.css';
import React from 'react';

const TextInput = ({ inputType, labelName, name, register, error }) => {
  return (
    <div>
      <label className={styles['form-label']}>{labelName}</label>
      <input {...register(name)} className={styles['form-input']} name={name} type={inputType} />
      <p className={styles.errorMsg}>{error}</p>
    </div>
  );
};

export default TextInput;

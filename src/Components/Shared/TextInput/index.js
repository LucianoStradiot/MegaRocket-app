// import { useState, useEffect } from 'react';
import styles from './textInput.module.css';
import React from 'react';

const TextInput = ({ inputType, labelName, changeAction, text, inputName }) => {
  return (
    <div>
      <label className={styles['form-label']}>{labelName}</label>
      <input
        className={styles['form-input']}
        name={inputName}
        type={inputType}
        value={text}
        onChange={changeAction}
      />
    </div>
  );
};

export default TextInput;

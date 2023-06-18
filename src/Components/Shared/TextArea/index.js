import React from 'react';
import styles from './textArea.module.css';

const TextArea = ({ placeholder, name, register, error }) => {
  return (
    <div className={styles.textareaContainer}>
      <textarea
        type="text"
        className={styles.textarea}
        placeholder={placeholder}
        name={name}
        {...register(name)}
      ></textarea>
      <p className={styles.errorMsg}>{error}</p>
    </div>
  );
};

export default TextArea;

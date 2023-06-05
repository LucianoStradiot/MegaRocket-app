import React from 'react';
import styles from './textArea.module.css';

const TextArea = ({ placeholder }) => {
  return (
    <div className={styles.textareaContainer}>
      <textarea className={styles.textarea} placeholder={placeholder}></textarea>
    </div>
  );
};

export default TextArea;

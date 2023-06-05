import React from 'react';
import styles from './textArea.module.css';

const TextArea = ({ placeholder, val, changeAction, name }) => {
  return (
    <div className={styles.textareaContainer}>
      <textarea
        type="text"
        className={styles.textarea}
        placeholder={placeholder}
        value={val}
        onChange={changeAction}
        name={name}
      ></textarea>
    </div>
  );
};

export default TextArea;

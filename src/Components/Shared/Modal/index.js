import styles from './modal.module.css';
import React from 'react';

const Modal = ({ title, desc, isOpen, handleClose }) => {
  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <h3>{title}</h3>
        <p>{desc}</p>
        <button onClick={() => handleClose(true)}>Accept</button>
        <button onClick={() => handleClose(false)}>Cancel</button>
      </div>
    </div>
  ) : null;
};

export default Modal;

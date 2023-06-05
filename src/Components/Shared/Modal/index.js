import styles from './modal.module.css';
import React from 'react';
import Button from '../Button';

const Modal = ({ title, desc, isOpen, handleClose, confirmModal, deleteFunction }) => {
  return isOpen ? (
    confirmModal ? (
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <h3>{title}</h3>
          <p>{desc}</p>
          <Button
            clickAction={() => {
              deleteFunction;
              handleClose(true);
            }}
            text="Confirm"
            type="btn"
          />
          <Button clickAction={() => handleClose(false)} text="Cancel" type="deleteCancel" />
        </div>
      </div>
    ) : (
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <h3>{title}</h3>
          <p>{desc}</p>
          <Button clickAction={() => handleClose(false)} text="Accept" type="btn" />
        </div>
      </div>
    )
  ) : null;
};

export default Modal;

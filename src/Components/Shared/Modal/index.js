import styles from './modal.module.css';
import React from 'react';
import Button from '../Button';

/**
To implement the Modal component it needs to send a 'title', a 'description',
an open state (true/false) a confirmation state (true/false) a handleClose and
a function that you want to run.
*/

const Modal = ({ title, desc, isOpen, handleClose, confirmModal, deleteFunction }) => {
  return isOpen ? (
    confirmModal ? (
      <div className={styles.modal}>
        <div className={styles.modalContainer} data-testid="modal-confirm">
          <h3>{title}</h3>
          <p>{desc}</p>
          <Button clickAction={deleteFunction} text="Confirm" type="btn" />
          <Button clickAction={handleClose} text="Cancel" type="deleteCancel" />
        </div>
      </div>
    ) : (
      <div className={styles.modal}>
        <div className={styles.modalContainer} data-testid="modal-succes">
          <h3>{title}</h3>
          <p>{desc}</p>
          <Button clickAction={handleClose} text="Accept" type="btn" />
        </div>
      </div>
    )
  ) : null;
};
export default Modal;

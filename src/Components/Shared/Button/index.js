import styles from './button.module.css';

function Button({ text, type, clickAction }) {
  if (type !== 'submit') {
    return (
      <button
        className={
          type === 'deleteCancel'
            ? `${styles.buttonDeleteCancel} ${styles.button}`
            : type === 'edit'
            ? `${styles.buttonEdit} ${styles.button}`
            : `${styles.buttonCreateAdd} ${styles.button}`
        }
        onClick={clickAction}
        type="button"
      >
        {text}
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.buttonSubmit} ${styles.button}`}
        onClick={clickAction}
        type="submit"
      >
        {text}
      </button>
    );
  }
}

export default Button;

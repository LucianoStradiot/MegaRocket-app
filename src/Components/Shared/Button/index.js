import styles from './button.module.css';

function Button({ text, type, clickAction }) {
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
}

export default Button;

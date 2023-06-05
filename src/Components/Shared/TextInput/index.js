import { useState, useEffect } from 'react';
import styles from './textInput.module.css';

function textInput({ inputType, data, labelName, editMode, useStateItem }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editMode) {
      switch (inputType) {
        case 'text':
          setText(data);
          break;
        default:
          break;
      }
    } else {
      setText('');
    }
  }, [data]);

  const renderInputType = (inputType) => {
    if (inputType === 'text') {
      return (
        <label className={styles['form-label']}>
          <h2>{labelName}</h2>
          <input
            className={styles['form-input']}
            type="text"
            value={text}
            onChange={(event) => useStateItem(event.target.value)}
          />
        </label>
      );
    }
  };

  return renderInputType(inputType);
}

export default textInput;

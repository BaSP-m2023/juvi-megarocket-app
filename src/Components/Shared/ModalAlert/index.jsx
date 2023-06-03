import React from 'react';

import styles from './modal-alert.module.css';
const ModalAlert = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <p>{props.texto}</p>
        <button onClick={props.onConfirmar}>Confirm</button>
      </div>
    </div>
  );
};

export default ModalAlert;

import React from 'react';
// eslint-disable-next-line no-unused-vars
import styles from './modal-confirm.module.css';

const ModalConfirm = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;

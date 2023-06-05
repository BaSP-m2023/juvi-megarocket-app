import React from 'react';
import styles from './modal-confirm.module.css';
import Button from '../Button';

const ModalConfirm = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <Button type="confirm" onClick={onConfirm} />
          <Button type="cancel" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;

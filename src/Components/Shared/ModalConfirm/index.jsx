import React from 'react';
import styles from 'Components/Shared/ModalConfirm/modal-confirm.module.css';
import Button from 'Components/Shared/Button';

const ModalConfirm = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} data-testid="modal-confirm">
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

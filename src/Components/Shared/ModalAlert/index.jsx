import React from 'react';
import { Button } from 'Components/Shared';
import styles from 'Components/Shared/ModalAlert/modal-alert.module.css';

const ModalAlert = ({ text, onClick }) => {
  return (
    <div className={styles.modal} data-testid="modal-alert">
      <div className={styles['modal-content']}>
        <p>{text}</p>
        <Button type="confirm" onClick={onClick} />
      </div>
    </div>
  );
};

export default ModalAlert;

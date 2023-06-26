import React from 'react';
import { Button } from 'Components/Shared';
import styles from 'Components/Shared/ModalAlert/modal-alert.module.css';

const ModalAlert = ({ text, onClick, testId }) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']} data-testid={testId}>
        <p>{text}</p>
        <Button type="confirm" onClick={onClick} />
      </div>
    </div>
  );
};

export default ModalAlert;

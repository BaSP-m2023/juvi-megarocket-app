import React from 'react';
import { Button } from '../../Shared';
import styles from './modal-alert.module.css';

const ModalAlert = ({ text, onClick }) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <p>{text}</p>
        <Button type="confirm" onClick={onClick} />
      </div>
    </div>
  );
};

export default ModalAlert;

import React from 'react';
import styles from './loading-spinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default LoadingSpinner;

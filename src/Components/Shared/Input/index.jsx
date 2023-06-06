import React from 'react';
import styles from './input.module.css';
const Input = ({ labelText, type, name, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;

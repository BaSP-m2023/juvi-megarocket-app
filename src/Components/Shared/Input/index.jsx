import React from 'react';
import styles from './input.module.css';
const Input = ({ labelText, type, name, value, onChange, placeholder }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default Input;

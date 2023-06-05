import React from 'react';
import styles from './input.module.css';
const Input = ({ name, onChange }) => {
  return <input name={name} type="text" className={styles.input} onChange={onChange}></input>;
};

export default Input;

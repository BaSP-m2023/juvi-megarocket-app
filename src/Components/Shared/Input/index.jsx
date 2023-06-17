import React from 'react';
import styles from './input.module.css';
import { useForm } from 'react-hook-form';

const Input = ({ labelText, type, name, value, onChange, placeholder }) => {
  const { register } = useForm();

  return (
    <div className={styles.container}>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        {...register(name)}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default Input;

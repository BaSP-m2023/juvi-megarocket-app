import styles from './input.module.css';

const Input = ({ labelText, type, name, error, placeholder, register }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      ></input>
      {error && <p className={styles.errorMessage}> {error} </p>}
    </div>
  );
};

export default Input;

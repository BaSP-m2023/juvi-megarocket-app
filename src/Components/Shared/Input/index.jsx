import styles from 'Components/Shared/Input/input.module.css';

const Input = ({ labelText, type, name, error, placeholder, register, testId }) => {
  return (
    <div className={styles.container} data-testid={testId}>
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

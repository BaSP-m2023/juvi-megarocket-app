import styles from './input.module.css';

const Input = ({
  labelText,
  type,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  register,
  error
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        type={type}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      ></input>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;

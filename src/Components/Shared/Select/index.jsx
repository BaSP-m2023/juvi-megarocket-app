import styles from './select.module.css';
export function SharedSelect({ options, onChange, labelText, placeholder }) {
  return (
    <>
      <label className={styles.label}>{labelText}</label>
      <select className={styles.sharedSelect} onChange={onChange}>
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

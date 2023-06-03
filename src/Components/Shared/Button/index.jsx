import styles from './button.module.css';

const Button = (props) => {
  let text = '';
  const getTypeClassName = () => {
    switch (props.type) {
      case 'delete':
        return styles.btnDelete;
      case 'add':
        text = `+ Add ${props.resource}`;
        return styles.btnAdd;
      case 'confirm':
        text = 'Confirm';
        return styles.btnConfirm;
      case 'edit':
        return styles.btnEdit;
      case 'cancel':
        text = 'Cancel';
        return styles.btnCancel;
      default:
        return styles.btn;
    }
  };

  return (
    <div className={styles.btnContainer}>
      <button className={`${styles.btn} ${getTypeClassName()}`} onClick={props.onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;

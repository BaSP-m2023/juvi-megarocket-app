import styles from './button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const edit = <FontAwesomeIcon icon={faPen} />;
const del = <FontAwesomeIcon icon={faTimes} size="lg" />;

const Button = ({ type, resource, onClick }) => {
  let text = '';
  const getTypeClassName = () => {
    switch (type) {
      case 'delete':
        text = del;
        return styles.btnDelete;
      case 'add':
        text = `+ Add ${resource}`;
        return styles.btnAdd;
      case 'confirm':
        text = 'Confirm';
        return styles.btnConfirm;
      case 'edit':
        text = edit;
        return styles.btnEdit;
      case 'cancel':
        text = 'Cancel';
        return styles.btnCancel;
      case 'submit':
        text = 'Submit';
        return styles.btnAdd;
      default:
        return styles.btn;
    }
  };

  return (
    <div className={styles.btnContainer}>
      <button className={`${styles.btn} ${getTypeClassName()}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;

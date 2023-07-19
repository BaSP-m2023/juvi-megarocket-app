import styles from 'Components/Shared/Button/button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const edit = <FontAwesomeIcon icon={faPen} />;
const del = <FontAwesomeIcon icon={faTimes} size="lg" />;

const Button = ({ type, resource, onClick, testId }) => {
  let text = '';
  const getTypeClassName = () => {
    switch (type) {
      case 'delete':
        text = del;
        return styles.btnDelete;
      case 'add':
        text = `Add ${resource}`;
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
      case 'reset':
        text = 'Reset';
        return styles.btnReset;
      case 'changePassword':
        text = 'Change password';
        return styles.btnCancel;
      case 'Main Schedule':
        text = 'Shown my schedule';
        return styles.btnMainSchedule;
      case 'My Schedule':
        text = 'Shown main schedule';
        return styles.btnMySchedule;
      default:
        return styles.btn;
    }
  };

  return (
    <div className={styles.btnContainer}>
      <button
        className={`${styles.btn} ${getTypeClassName()}`}
        onClick={onClick}
        data-testid={testId}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

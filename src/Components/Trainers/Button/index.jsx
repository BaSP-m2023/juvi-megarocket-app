import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ color, text, onClick }) => {
  return (
    <div className={styles.btnContainer}>
      <button onClick={onClick} style={{ backgroundColor: color }} className={styles.btn}>
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: 'white'
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;

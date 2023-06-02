import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = (props) => {
  return (
    <div className={styles.btnContainer}>
      <button
        onClick={props.onClick}
        style={{
          backgroundColor: props.backColor,
          color: props.color,
          borderColor: props.bColor
        }}
        className={styles.btn}
      >
        {props.text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  backColor: 'black',
  color: 'white',
  bColor: 'white'
};

export default Button;

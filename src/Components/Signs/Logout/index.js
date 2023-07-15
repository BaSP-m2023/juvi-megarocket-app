import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/thunks';
import styles from './logout.module.css';
import { useHistory } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutClick = async () => {
    await dispatch(logout());
    history.push('/auth');
  };
  return (
    <div className={styles.btnLogOutContainer} onClick={logoutClick}>
      <button className={styles.btnLogOut} data-testid="logout-button">
        <span className={styles.buttonText}>Logout</span>
        <img
          className={styles.logoutIcon}
          src={`${process.env.PUBLIC_URL}/assets/images/logout.png`}
        />
      </button>
    </div>
  );
}

export default Logout;

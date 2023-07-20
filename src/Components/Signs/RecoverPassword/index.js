import React from 'react';
import styles from 'Components/Signs/RecoverPassword/recover.module.css';

import { useState } from 'react';
import { ModalAlert } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

const RecoverPassword = () => {
  const [modal, setModal] = useState(false);
  const history = useHistory();

  const checkEmail = () => {
    setModal(true);
  };

  const returnToHome = () => {
    const newUrl = '/auth/sign-in';
    history.replace(newUrl);
    window.location.reload();
  };

  return (
    <div className={styles.recover}>
      <h1>Recover Password</h1>
      <div>
        <fieldset className={styles.fieldset}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="email@example.com" />
        </fieldset>
      </div>
      <div className={styles.btnRecover}>
        <button className={styles.btnConfirm} onClick={checkEmail}>
          Confirm
        </button>
        <button className={styles.btnCancel} onClick={returnToHome}>
          Cancel
        </button>
      </div>
      {modal && (
        <ModalAlert
          text={'An email with the new password has been sent to your email address.'}
          onClick={returnToHome}
        />
      )}
    </div>
  );
};

export default RecoverPassword;

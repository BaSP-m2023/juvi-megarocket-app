import React from 'react';
import styles from 'Components/Signs/RecoverPassword/recover.module.css';

import { useState } from 'react';
import { ModalAlert } from 'Components/Shared';

const RecoverPassword = () => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const checkEmail = () => {
    const testEmails = ['octavito@gmail.com', 'pablomorad@hotmail.com', 'octavitossse@gmail.com'];
    const foundUser = testEmails.includes(email);
    setIsValidEmail(foundUser);
    if (foundUser) {
      setModal(true);
    }
  };

  return (
    <div className={styles.recover}>
      <h1>Recover Password</h1>
      <div>
        <fieldset className={styles.fieldset}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
      </div>
      <div className={styles.btnRecover}>
        <button className={styles.btnConfirm} onClick={checkEmail}>
          Confirm
        </button>
        <button className={styles.btnCancel}>Cancel</button>
      </div>
      {isValidEmail && <p>Email found in the data!</p>}
      {modal && (
        <ModalAlert
          text={'An email with the new password has been sent to your email address.'}
          onClick={() => setModal(!modal)}
        />
      )}
    </div>
  );
};

export default RecoverPassword;

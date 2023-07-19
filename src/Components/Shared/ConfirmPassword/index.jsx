import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { schema } from './confirmValidations';
import { Input } from 'Components/Shared';
import styles from 'Components/Shared/ConfirmPassword/confirm-password.module.css';

const ConfirmPassword = ({ userData, setAuthorization, setModalPass }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    defaultValues: {
      password: ''
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (data.confirmPassword === userData.password) {
        setAuthorization(true);
        setModalPass(false);
      }
    } catch (error) {
      setAuthorization(false);
      setModalPass(false);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']} data-testid="modal-alert">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <Input
            labelText={'Confirm your password'}
            type={'text'}
            name={'confirmPassword'}
            placeholder={'Type your password'}
            register={register}
            error={errors.confirmPassword?.message}
          />
          <button type="submit" onClick={(e) => e.preventDefault()}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;

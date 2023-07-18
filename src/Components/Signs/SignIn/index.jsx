import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { schema } from 'Components/Signs/SignIn/loginValidations';
import { ModalAlert, Button, Input } from 'Components/Shared';
import styles from 'Components/Signs/SignIn/login.module.css';
import { login } from 'redux/auth/thunks';

const Login = () => {
  const data = useSelector((state) => state);
  data.item = {};
  const authState = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState(authState.error ?? '');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: data.item?.email ?? '',
      password: data.item?.password ?? ''
    }
  });

  useEffect(() => {
    if (!authState.error && authState.role !== '' && authState.role !== null) {
      switchModal(false, `Login success \n Welcome... ${authState.role} !`);
      data.item = {};
    } else if (authState.error) {
      switchModal(true, authState.error);
      authState.error = '';
      data.item = {};
    }
  }, [authState.error, authState.role]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const switchModal = (error, msg) => {
    if (error) {
      setMsg(msg);
      setModal(!modal);
    } else {
      setMsg(msg);
      setModalDone(!modalDone);
    }
  };

  const onSubmit = async (data) => {
    try {
      dispatch(login(data));
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  const handleClick = () => {
    const newUrl = `/${authState.role.toLowerCase()}`;

    history.replace(newUrl);

    window.location.reload();
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          data-testid="signin-form"
        >
          <div className={styles.formContainer}>
            <fieldset className={styles.fieldset}>
              <Input
                labelText="Email"
                className={styles.input}
                name={'email'}
                type="text"
                placeholder="example@example.com"
                error={errors.email?.message}
                register={register}
              />
            </fieldset>
            <fieldset className={styles.fieldset}>
              <div className={styles.password}>
                <Input
                  labelText="Password"
                  className={styles.input}
                  name={'password'}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  error={errors.password?.message}
                  register={register}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={styles.showPasswordIcon}
                  onClick={togglePassword}
                />
              </div>
            </fieldset>
          </div>
          <a href="/auth/recover-password">Forgot password?</a>
          <Button type={'submit'} data-testid="submit-button" />
          <Button type={'cancel'} onClick={() => history.push('/')} testId="cancel-button" />
          {modal && (
            <ModalAlert text={msg} onClick={() => setModal(!modal)} data-testid="modal-alert" />
          )}
          {modalDone && <ModalAlert text={msg} onClick={handleClick} data-testid="modal-alert" />}
        </form>
      </div>
    </div>
  );
};

export default Login;

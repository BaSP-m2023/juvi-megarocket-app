import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { schema } from 'Components/Login/loginValidations';
import { ModalAlert, Button, Input } from 'Components/Shared';
import styles from 'Components/Login/login.module.css';
import { login } from 'redux/auth/thunks';

const Login = () => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

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
    data.item = {};
  }, []);

  const history = useHistory();
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

  useEffect(() => {
    switch (authState.role) {
      case 'TRAINER':
        console.log('Redirigir a la página de entrenador');
        break;
      case 'SUPERADMIN':
        console.log('Redirigir a la página de superadministrador');
        break;
      case 'MEMBER':
        console.log('Redirigir a la página de miembro');
        break;
      case 'ADMIN':
        console.log('Redirigir a la página de administrador');
        break;
      default:
        console.log('Rol no reconocido');
    }
  }, [authState.role]);

  const onSubmit = async (data) => {
    try {
      dispatch(login(data));
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
          <Button type={'submit'} />
          <Button type={'cancel'} onClick={() => history.push('/')} />
          {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} />}
          {modalDone && <ModalAlert text={msg} onClick={() => history.push('/')} />}
        </form>
      </div>
    </div>
  );
};

export default Login;

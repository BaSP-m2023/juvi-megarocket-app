/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from 'Components/Admin/Admins/Profile/adminprofile.module.css';
import { schema } from 'Components/Admin/Admins/Form/adminFormValidations';
import { ModalAlert, Button, Input } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

const AdminProfile = () => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state.auth?.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      dni: data?.dni ?? '',
      phone: data?.phone ?? '',
      email: data?.email ?? '',
      city: data?.city ?? '',
      password: data?.password ?? ''
    }
  });

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

  const onSubmit = () => {
    switchModal(false, 'Member updated correctly!');
  };

  const onInvalid = (errors) => console.log(errors);

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className={styles.formContainer}>
          <h1>Edit Profile</h1>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="First Name"
              className={styles.input}
              name={'firstName'}
              type="text"
              placeholder="Ex: Gianluca"
              error={errors.firstName?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Last Name"
              className={styles.input}
              name={'lastName'}
              type="text"
              placeholder="Ex: Agrano"
              error={errors.lastName?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="DNI"
              className={styles.input}
              name={'dni'}
              type="number"
              placeholder="Ex: 44897162"
              error={errors.dni?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Phone"
              className={styles.input}
              name={'phone'}
              type="number"
              placeholder="Ex: 1142642634"
              error={errors.phone?.message}
              register={register}
            />
          </fieldset>
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
            <Input
              labelText="City"
              className={styles.input}
              name={'city'}
              type="text"
              placeholder="Ex: Rosario"
              error={errors.city?.message}
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
        <Button type={'cancel'} onClick={() => history.push('/admin')} />
        {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} />}
        {modalDone && <ModalAlert text={msg} onClick={() => history.push('/member')} />}
      </form>
      <Button className={styles.addButton} type="reset" onClick={() => reset()}></Button>
    </div>
  );
};

export default AdminProfile;

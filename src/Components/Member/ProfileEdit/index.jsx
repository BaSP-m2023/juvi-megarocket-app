/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';

import { joiResolver } from '@hookform/resolvers/joi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from 'Components/Admin/Members/MemberForm/form.module.css';

import { schema } from 'Components/Admin/Members/MemberForm/memberFormValidations';

import { ModalAlert, Button, Input } from 'Components/Shared';

import { useHistory } from 'react-router-dom';

import { putMember } from 'redux/members/thunks';

const MemberProfile = () => {
  const [modal, setModal] = useState(false);

  const [modalDone, setModalDone] = useState(false);

  const [msg, setMsg] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const { data: member } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  console.log(member);

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),

    mode: 'onChange',

    defaultValues: {
      firstName: member?.firstName ?? '',

      lastName: member?.lastName ?? '',

      dni: member?.dni ?? '',

      phone: member?.phone ?? '',

      email: member?.email ?? '',

      city: member?.city ?? '',

      birthDate: member?.birthDate?.substring(0, 10) ?? '',

      postalCode: member?.postalCode ?? '',

      memberships: member?.memberships ?? 'Only Classes'
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

  useEffect(() => {
    if (member) {
      reset({
        firstName: member?.firstName ?? '',

        lastName: member?.lastName ?? '',

        dni: member?.dni ?? '',

        phone: member?.phone ?? '',

        email: member?.email ?? '',

        city: member?.city ?? '',

        birthDate: member?.birthDate?.substring(0, 10) ?? '',

        postalCode: member?.postalCode ?? '',

        memberships: member?.memberships ?? 'Only Classes'
      });
    }
  }, [member]);

  const onSubmit = async (data) => {
    try {
      if (data.password === '') {
        const { password, _id, __v, ...resData } = data;

        dispatch(putMember(member._id, resData, switchModal));
      } else {
        dispatch(putMember(member._id, data, switchModal));
      }
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  const handleClick = () => {
    const newUrl = '/member';
    history.replace(newUrl);
    window.location.reload();
  };
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className={styles.formContainer} data-testid="member-profile-edit-form">
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
            <Input
              labelText="Birth Day"
              className={styles.input}
              name={'birthDate'}
              type="date"
              error={errors.birthDate?.message}
              register={register}
            />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <Input
              labelText="Zip"
              className={styles.input}
              name={'postalCode'}
              type="number"
              placeholder="Ex: 2200"
              error={errors.postalCode?.message}
              register={register}
            />
          </fieldset>
        </div>

        <Button type={'submit'} resource={'Member'} testId="submit-button" />

        <Button type={'cancel'} onClick={() => history.push('/member')} testId="cancel-button" />

        {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} />}

        {modalDone && <ModalAlert text={msg} onClick={handleClick} />}
      </form>

      <Button
        className={styles.addButton}
        type="reset"
        onClick={() => reset()}
        testId="reset-button"
      ></Button>
    </div>
  );
};

export default MemberProfile;

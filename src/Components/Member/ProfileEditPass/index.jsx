import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { schema } from 'Components/Member/ProfileEdit/memberProfileValidations';
import { ModalAlert, Button, Input } from 'Components/Shared';
import { putMember } from 'redux/members/thunks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ProfileEditPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: member } = useSelector((state) => state.auth);

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

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const switchModal = (error, msg) => {
    if (error) {
      setMsg(msg);
      setModal(true);
    } else {
      setMsg(msg);
      setModalDone(true);
    }
  };

  const handleClick = () => {
    const newUrl = '/member/profile';

    history.replace(newUrl);

    window.location.reload();
  };

  const onSubmit = async (data) => {
    data = {
      firstName: member.firstName,
      lastName: member.lastName,
      city: member.city,
      dni: member.dni,
      phone: member.phone,
      email: member.email,
      password: data.password
    };

    try {
      if (data.password === '') {
        dispatch(putMember(member._id, switchModal));
      } else {
        dispatch(putMember(member._id, data, switchModal));
      }
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <h1>{'Edit Password'}</h1>
        <fieldset>
          <Input
            labelText="New Password"
            name={'password'}
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            error={errors.password?.message}
            register={register}
          />
          <div>
            <Input
              labelText="Confirm New Password"
              name={'confirmPassword'}
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              error={errors.password?.message}
              register={register}
            />
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePassword} />
          </div>
        </fieldset>
        <div>
          <Button type="submit"></Button>
          <Button type="cancel" onClick={() => history.push('/member/profile')}></Button>
        </div>
        {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} />}
        {modalDone && <ModalAlert text={msg} onClick={handleClick} />}
      </form>
    </div>
  );
};

export default ProfileEditPassword;

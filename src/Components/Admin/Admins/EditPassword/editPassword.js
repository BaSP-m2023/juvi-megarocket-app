import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from 'Components/Admin/Admins/Form/adminFormValidations';
import { ModalAlert, Button, Input } from 'Components/Shared';
import { editAdmin } from 'redux/admins/thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const EditPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const { data: admin } = useSelector((state) => state.auth);
  const history = useHistory();

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
      setModal(!modal);
    } else {
      setMsg(msg);
      setModalDone(!modalDone);
    }
  };
  console.log(admin);

  const onSubmit = async (data) => {
    try {
      if (data.password === '') {
        dispatch(editAdmin(admin._id, switchModal));
      } else {
        dispatch(editAdmin(admin._id, data, switchModal));
      }
    } catch (error) {
      switchModal(true, error);
    }
  };

  const handleClick = () => {
    const newUrl = '/admin';

    history.replace(newUrl);

    window.location.reload();
  };
  const onInvalid = (errors) => console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <h1>Edit Password</h1>
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
          <Button type="cancel" onClick={() => history.push('/admin/profile')}></Button>
        </div>
        {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} />}
        {modalDone && <ModalAlert text={msg} onClick={handleClick} />}
      </form>
    </div>
  );
};

export default EditPassword;

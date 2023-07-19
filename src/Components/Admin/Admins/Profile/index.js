/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from 'Components/Admin/Admins/Profile/adminprofile.module.css';
import { schema } from 'Components/Admin/Admins/Form/adminFormValidations';
import { ModalAlert, Button, Input, Profile } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { editAdmin } from 'redux/admins/thunks';
import EditPassword from '../EditPassword/editPassword';

const AdminProfile = () => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { data: admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showEditPassword, setShowEditPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: admin?.firstName ?? '',
      lastName: admin?.lastName ?? '',
      dni: admin?.dni ?? '',
      phone: admin?.phone ?? '',
      email: admin?.email ?? '',
      city: admin?.city ?? '',
      password: admin?.password ?? ''
    }
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const openEditPassword = () => {
    history.push('profile/changepassword');
    // setShowEditPassword(true);
  };

  const closeEditPassword = () => {
    setShowEditPassword(false);
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
    if (admin) {
      reset({
        firstName: admin?.firstName || '',
        lastName: admin?.lastName || '',
        dni: admin?.dni || '',
        phone: admin?.phone || '',
        email: admin?.email || '',
        city: admin?.city || '',
        password: admin?.password || ''
      });
    }
  }, [admin]);

  const onSubmit = async (data) => {
    try {
      if (data.password === '') {
        const { password, _id, __v, ...resData } = data;
        dispatch(editAdmin(admin._id, resData, switchModal));
      } else {
        dispatch(editAdmin(admin._id, data, switchModal));
      }
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  const handleClick = () => {
    const newUrl = '/admin';

    history.replace(newUrl);

    window.location.reload();
  };

  return (
    <div>
      <Profile />
      {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} testId="modal-alert" />}
      {modalDone && <ModalAlert text={msg} onClick={handleClick} />}
      {showEditPassword && <EditPassword adminId={admin?._id} onClose={closeEditPassword} />}
    </div>
  );
};

export default AdminProfile;

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './super-admins-form.module.css';
import { addSuperAdmins, editSuperAdmins, getByIdSuperAdmins } from 'redux/superadmins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import superAdminsSchema from './validation';
import { Button, Input, ModalAlert } from 'Components/Shared';

const FormSuperAdmins = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.superAdmins);
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [modalText, setModalText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(superAdminsSchema),
    defaultValues: {
      email: data.item?.email || '',
      password: data.item?.password || ''
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(getByIdSuperAdmins(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (data.item) {
      reset({ email: data.item?.email || '', password: data.item?.password || '' });
    }
  }, [data.item, reset]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(editSuperAdmins(data, id, setModalText, setShowModal, setShowModalSuccess));
    } else {
      dispatch(addSuperAdmins(data, setModalText, setShowModal, setShowModalSuccess));
    }
  };

  const closeModal = () => {
    if (showModal) {
      setShowModal(!showModal);
    } else {
      setShowModalSuccess(false);
      history.goBack();
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {data.isLoading ? (
        <div>is Loading</div>
      ) : (
        <>
          <form className={styles.FormSuperAdmins} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.subContainer}>
              <Input
                register={register}
                labelText="Email"
                name="email"
                type="text"
                error={errors.email?.message}
              />
              <div className={styles.password}>
                <Input
                  register={register}
                  labelText="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  error={errors.password?.message}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={styles.showPasswordIcon}
                  onClick={togglePassword}
                />
              </div>
            </div>
            <Button type="confirm"></Button>
            <Button type="cancel" onClick={closeModal}></Button>
          </form>
          <Button className={styles.addButton} type="reset" onClick={() => reset()}></Button>
        </>
      )}
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
      {showModalSuccess && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};
export default FormSuperAdmins;

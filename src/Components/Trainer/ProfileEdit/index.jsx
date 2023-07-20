import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import { Button, Input, ModalAlert } from 'Components/Shared';
import { putTrainer } from 'redux/trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Schema } from './validationTrainers';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { data: trainer } = useSelector((state) => state.auth);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [modalText, setModalText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(Schema),
    defaultValues: {
      firstName: trainer.firstName || '',
      lastName: trainer.lastName || '',
      dni: trainer.dni || '',
      phone: trainer.phone || '',
      email: trainer.email || '',
      city: trainer.city || '',
      password: trainer.password || '',
      salary: trainer.salary || ''
    }
  });

  useEffect(() => {
    if (trainer) {
      reset({
        firstName: trainer.firstName || '',
        lastName: trainer.lastName || '',
        dni: trainer.dni || '',
        phone: trainer.phone || '',
        email: trainer.email || '',
        city: trainer.city || '',
        password: trainer.password || '',
        salary: trainer.salary || ''
      });
    }
  }, [trainer]);
  const onSubmit = (data) => {
    dispatch(putTrainer(data, trainer._id, setModalText, setShowModal, setShowModalSuccess));
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = () => {
    const newUrl = '/trainer/profile';
    history.replace(newUrl);
    window.location.reload();
  };

  return (
    <>
      {trainer.isLoading ? (
        <div>is Loading</div>
      ) : (
        <>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              labelText="First Name"
              name="firstName"
              type="text"
              error={errors.firstName?.message}
            />
            <Input
              register={register}
              labelText="Last Name"
              name="lastName"
              type="text"
              error={errors.lastName?.message}
            />
            <Input
              register={register}
              labelText={`City`}
              type={'text'}
              name={`city`}
              error={errors.city?.message}
            ></Input>
            <Input
              register={register}
              labelText={`Dni`}
              type={'text'}
              name={`dni`}
              error={errors.dni?.message}
            ></Input>
            <Input
              register={register}
              labelText={`Phone`}
              type={'text'}
              name={`phone`}
              error={errors.phone?.message}
            ></Input>
            <Input
              register={register}
              labelText={`Salary`}
              type={'text'}
              name={`salary`}
              error={errors.salary?.message}
            ></Input>
            <Button className={styles.addButton} type="submit" testId="confirm-button"></Button>
            <Button
              className={styles.addButton}
              type="cancel"
              onClick={() => {
                history.push('/trainer/profile');
              }}
              testId="cancel-button"
            ></Button>
          </form>
        </>
      )}

      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
      {showModalSuccess && (
        <ModalAlert
          text={modalText}
          onClick={() => {
            handleClick();
            setShowModalSuccess(false);
            trainer.message = '';
          }}
        />
      )}
    </>
  );
};

export default ProfileEdit;

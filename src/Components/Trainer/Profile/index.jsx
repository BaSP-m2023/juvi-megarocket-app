import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import { Button, Input, ModalAlert } from 'Components/Shared';
import { getTrainersByEmail } from 'redux/trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import trainersSchema from './validationTrainers';

const Profile = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.trainers);
  const email = sessionStorage.getItem('email');
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [modalText] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(trainersSchema),
    defaultValues: {
      _id: data.item?._id || '',
      firstName: data.item?.firstName || '',
      lastName: data.item?.lastName || '',
      dni: data.item?.dni || '',
      phone: data.item?.phone || '',
      email: data.item?.email || '',
      city: data.item?.city || '',
      password: data.item?.password || '',
      salary: data.item?.salary || ''
    }
  });

  useEffect(() => {
    dispatch(getTrainersByEmail(email));
  }, [email]);

  const onSubmit = (data) => {
    console.log('gola');
    console.log(data);
    //dispatch(putTrainer(data, setModalText, setShowModal, setShowModalSuccess));
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {data.isLoading ? (
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
              onClick={(e) => {
                e.preventDefault();
                history.push('/trainer');
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
            history.goBack();
            setShowModalSuccess(false);
            data.message = '';
          }}
        />
      )}
    </>
  );
};

export default Profile;

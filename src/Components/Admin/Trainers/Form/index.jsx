import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import { Button, Input, ModalAlert } from 'Components/Shared';
import { addTrainer, putTrainer, getTrainersBy } from 'redux/trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import trainersSchema from './validationTrainers';

const Form = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.trainers);
  const { id } = useParams();
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
    resolver: joiResolver(trainersSchema),
    defaultValues: {
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
    if (id) {
      dispatch(getTrainersBy(id));
    } else {
      data.item = {};
    }
  }, [id]);

  useEffect(() => {
    if (data.item) {
      reset({
        firstName: data.item?.firstName || '',
        lastName: data.item?.lastName || '',
        dni: data.item?.dni || '',
        phone: data.item?.phone || '',
        email: data.item?.email || '',
        city: data.item?.city || '',
        password: data.item?.password || '',
        salary: data.item?.salary || ''
      });
    }
  }, [data.item, reset]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(putTrainer(data, id, setModalText, setShowModal, setShowModalSuccess));
    } else {
      dispatch(addTrainer(data, setModalText, setShowModal, setShowModalSuccess));
    }
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
            <div className={styles.divContainer} data-testId="admin-trainers-add-form">
              <Input
                register={register}
                labelText="firstName"
                name="firstName"
                type="text"
                error={errors.firstName?.message}
              />
              <Input
                register={register}
                labelText="lastName"
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
            </div>
            <div className={styles.column}>
              <Input
                register={register}
                labelText={`Email`}
                type={'text'}
                name={`email`}
                error={errors.email?.message}
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
              <Input
                register={register}
                labelText={`Password`}
                type={'password'}
                name={`password`}
                error={errors.password?.message}
              ></Input>
            </div>
            <Button className={styles.addButton} type="confirm" testId="confirm-button"></Button>
            <Button
              className={styles.addButton}
              type="cancel"
              onClick={(e) => {
                e.preventDefault();
                history.push('/admin/trainers');
              }}
              testId="cancel-button"
            ></Button>
          </form>
          <Button
            className={styles.addButton}
            type="reset"
            onClick={() => reset()}
            testId="reset-button"
          ></Button>
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

export default Form;

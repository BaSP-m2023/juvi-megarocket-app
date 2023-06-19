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
            <div className={styles.divContainer}>
              <Input
                register={register}
                labelText="Name"
                name="name"
                type="text"
                error={errors.name?.message}
              />
              <Input
                register={register}
                labelText="LastName"
                name="lastname"
                type="text"
                error={errors.lastName?.message}
              />
              <Input
                register={register}
                labelText={`City`}
                type={'text'}
                name={`city`}
                error={errors.city ?? ''}
              ></Input>
              <Input
                register={register}
                labelText={`Dni`}
                type={'text'}
                name={`dni`}
                error={errors.dni ?? ''}
              ></Input>
            </div>
            <div className={styles.column}>
              <Input
                register={register}
                labelText={`Email`}
                type={'text'}
                name={`email`}
                error={errors.email ?? ''}
              ></Input>
              <Input
                register={register}
                labelText={`Phone`}
                type={'text'}
                name={`phone`}
                error={errors.phone ?? ''}
              ></Input>
              <Input
                register={register}
                labelText={`Salary`}
                type={'text'}
                name={`salary`}
                error={errors.salary ?? ''}
              ></Input>
              <Input
                register={register}
                labelText={`Password`}
                type={'password'}
                name={`password`}
                error={errors.password ?? ''}
              ></Input>
            </div>
            <Button className={styles.addButton} type="confirm"></Button>
            <Button
              className={styles.addButton}
              type="cancel"
              onClick={() => history.push('/trainers')}
            ></Button>
          </form>
          <Button className={styles.addButton} type="reset" onClick={() => reset()}></Button>
        </>
      )}

      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
      {showModalSuccess && (
        <ModalAlert
          text={modalText}
          onClick={() => {
            history.push('/trainers');
            setShowModalSuccess(false);
          }}
        />
      )}
    </>
  );
};

export default Form;

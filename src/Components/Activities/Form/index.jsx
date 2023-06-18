import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import { Button, Input, ModalAlert } from '../../Shared';
import { addActivity, editActivity, getByIdActivity } from '../../../redux/activities/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import activitiesSchema from './validation';

const Form = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.activities);
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
    resolver: joiResolver(activitiesSchema),
    defaultValues: {
      name: data.item?.name || '',
      description: data.item?.description || ''
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(getByIdActivity(id));
    }
  }, [id]);

  useEffect(() => {
    if (data.item) {
      reset({ name: data.item?.name || '', description: data.item?.description || '' });
    }
  }, [data.item, reset]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(editActivity(data, id, setModalText, setShowModal, setShowModalSuccess));
    } else {
      dispatch(addActivity(data, setModalText, setShowModal, setShowModalSuccess));
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
                labelText="Description"
                name="description"
                type="text"
                error={errors.description?.message}
              />
            </div>
            <Button className={styles.addButton} type="confirm"></Button>
            <Button
              className={styles.addButton}
              type="cancel"
              onClick={() => history.push('/activities')}
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
            history.push('/activities');
            setShowModalSuccess(false);
          }}
        />
      )}
    </>
  );
};

export default Form;

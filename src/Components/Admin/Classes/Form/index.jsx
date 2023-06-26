import React, { useState, useEffect } from 'react';
import styles from './classesForm.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import { Input } from 'Components/Shared';
import ModalAlert from 'Components/Shared/ModalAlert';
import { postClass, getByIdClasses, putClass, deleteClass } from 'redux/classes/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers } from 'redux/trainers/thunks';
import { getActivities } from 'redux/activities/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import classesSchema from './validation';

const FormClasses = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.classes);
  const { id } = useParams();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(classesSchema),
    defaultValues: {
      activity: data.item?.activity?._id || 'Choose an activity',
      trainer: data.item?.trainer?._id || 'Choose a trainer',
      day: data.item?.day || '',
      hour: data.item?.hour || '',
      slots: data.item?.slots || ''
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const trainers = useSelector((state) => state.trainers);
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getTrainers());
    dispatch(getActivities());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getByIdClasses(id));
    }
  }, [id]);

  useEffect(() => {
    if (data.item) {
      reset({
        activity: data.item?.activity?._id || 'Choose an activity',
        trainer: data.item?.trainer?._id || 'Choose a trainer',
        day: data.item?.day || '',
        hour: data.item?.hour || '',
        slots: data.item?.slots || ''
      });
    }
  }, [data.item, reset]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(putClass(id, data, setModalText, setShowModal, setIsTrue, deleteClass));
    } else {
      dispatch(postClass(data, setModalText, setShowModal, setIsTrue, deleteClass));
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const closeModal = () => {
    setShowModal(false);
    if (isTrue) {
      history.goBack();
    }
  };

  return (
    <>
      {data.isLoading ? (
        <div>is Loading</div>
      ) : (
        <>
          <form className={styles.formClasses} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formContainer} data-testId="admin-classes-add-form">
              <div className={styles.inputClass}>
                <label className={styles.labelClasses} htmlFor="activity">
                  Activity
                </label>
                <select className={styles.selectClasses} name="activity" {...register('activity')}>
                  <option>Choose an Activity</option>
                  {activities.list.map((activity) => (
                    <option key={activity._id} value={activity?._id}>
                      {activity?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputClass}>
                <label className={styles.labelClasses} htmlFor="trainer">
                  Trainer
                </label>
                <select className={styles.selectClasses} name="trainer" {...register('trainer')}>
                  <option>Choose a Trainer</option>
                  {trainers.list.map((trainer) => (
                    <option key={trainer._id} value={trainer?._id}>
                      {trainer?.firstName} {trainer?.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputClass}>
                <Input
                  register={register}
                  labelText="Day"
                  type="text"
                  name="day"
                  error={errors.day?.message}
                />
              </div>
              <div className={styles.inputClass}>
                <Input
                  register={register}
                  labelText="Hour"
                  type="text"
                  name="hour"
                  error={errors.hour?.message}
                />
              </div>
              <div className={styles.inputClass}>
                <Input
                  register={register}
                  labelText="Slots"
                  type="text"
                  name="slots"
                  error={errors.slots?.message}
                />
              </div>
            </div>
            <Button type="confirm" testId="admin-classes-confirm-button" />
            <Button type="cancel" onClick={onCancel} testId="admin-classes-cancel-button" />
          </form>
          <Button
            className={styles.addButton}
            type="reset"
            onClick={() => reset()}
            testId="admin-classes-reset-button"
          ></Button>
        </>
      )}
      {showModal && <ModalAlert text={modalText} onClick={closeModal} testId="admin-classes-modal-alert" />}
    </>
  );
};

export default FormClasses;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { postClass, getByIdClasses, putClass, deleteClass, getClasses } from 'redux/classes/thunks';
import { getTrainers } from 'redux/trainers/thunks';
import { getActivities } from 'redux/activities/thunks';
import { addSubscription } from 'redux/subscriptions/thunks';
import classesSchema from './validation';
import { Input, Button, ModalAlert } from 'Components/Shared';
import styles from './classesForm.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner/index';
const FormClasses = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.classes);
  const existingClasses = useSelector((state) => state.classes.list);
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
  const [newSub, setNewSub] = useState(false);
  const [newClass, setNewClass] = useState({});
  const [isTrue, setIsTrue] = useState(false);
  const trainers = useSelector((state) => state.trainers);
  const activities = useSelector((state) => state.activities);
  const classes = useSelector((state) => state.classes);
  const availableHours = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00'
  ];
  const week = ['Monday', 'Thuesday', 'Wenesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    dispatch(getTrainers());
    dispatch(getActivities());
    dispatch(getClasses());
    const hoy = new Date();
    const weekDay = classes.list[classes.list.length - 1].day;
    const choosenDay = () => {
      let variable;
      for (let i = 0; i < week.length; i++) {
        if (week[i] === weekDay) {
          variable = i + 1;
        }
      }
      return variable;
    };
    const dif = hoy.getDay() - choosenDay();
    let theDay;
    let theMonth = hoy.getMonth();
    let theYear = hoy.getFullYear();
    if (dif < 0) {
      theDay = hoy.getDate() - dif;
    } else if (choosenDay() === 0) {
      theDay = hoy.getDate();
    } else if (dif > 0) {
      theDay = hoy.getDate() + 7 - dif;
    }
    if (hoy.getMonth() === (0, 2, 4, 6, 7, 9, 11)) {
      if (theDay > 31) {
        const dife = theDay - 31;
        theDay = dife;
        if (hoy.getMonth() === 11) {
          theMonth = 0;
        } else {
          theMonth = hoy.getMonth() + 1;
          theYear = hoy.getFullYear() + 1;
        }
      }
    }
    if (hoy.getMonth() === (3, 5, 8, 10)) {
      if (theDay > 30) {
        const dife = theDay - 30;
        theDay = dife;
        theMonth = hoy.getMonth() + 1;
      }
    }
    if (hoy.getMonth() === 1) {
      if (hoy.getFullYear() % 4 === 0) {
        if (theDay > 29) {
          const dife = theDay - 29;
          theDay = dife;
          theMonth = hoy.getMonth() + 1;
        }
      } else {
        if (theDay > 28) {
          const dife = theDay - 28;
          theDay = dife;
          theMonth = hoy.getMonth() + 1;
        }
      }
    }
    const daisito = new Date(
      theYear,
      theMonth,
      theDay,
      classes.list[classes.list.length - 1].hour.substring(0, 2),
      classes.list[classes.list.length - 1].hour.substring(3, 5)
    );
    const subData = {
      classes: classes.list[classes.list.length - 1]._id,
      date: daisito.toISOString()
    };
    if (
      newClass?.trainer === classes.list[classes.list.length - 1].trainer._id &&
      newClass?.hour === classes.list[classes.list.length - 1].hour &&
      newClass?.day === classes.list[classes.list.length - 1].day
    ) {
      dispatch(addSubscription(subData));
      setNewSub(false);
    }
  }, [newSub, newClass, isTrue, modalText, showModal, dispatch]);

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
    const { day, hour } = data;

    const hasConflict = existingClasses
      .filter((existingClass) => existingClass._id !== id)
      .some((existingClass) => existingClass.day === day && existingClass.hour === hour);

    if (hasConflict) {
      setModalText(`There is already a class scheduled at the same time.`);
      setShowModal(true);
      return;
    } else {
      if (id) {
        dispatch(putClass(id, data, setModalText, setShowModal, setIsTrue, deleteClass));
      } else {
        setNewClass(data);
        dispatch(postClass(data, setModalText, setShowModal, setIsTrue, deleteClass));
        dispatch(getClasses());
        setNewSub(true);
      }
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const closeModal = () => {
    setShowModal(false);
    if (isTrue) {
      history.replace('/admin/classes');
      window.location.reload();
    }
  };

  return (
    <>
      {data.isLoading ? (
        <LoadingSpinner />
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
                <label className={styles.labelClasses} htmlFor="day">
                  Day
                </label>
                <select {...register('day')} name="day">
                  <option>Choose a Day</option>
                  {week.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputClass}>
                <label className={styles.labelClasses} htmlFor="hour">
                  Hour
                </label>
                <select className={styles.selectClasses} name="hour" {...register('hour')}>
                  <option value="">Choose an Hour</option>
                  {availableHours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
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
            <Button type="confirm" testId="confirm-button" />
            <Button type="cancel" onClick={onCancel} testId="cancel-button" />
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
    </>
  );
};

export default FormClasses;

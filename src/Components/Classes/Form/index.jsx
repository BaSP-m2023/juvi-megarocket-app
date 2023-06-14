import React, { useState, useEffect } from 'react';
import styles from './classesForm.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import { Input } from '../../Shared';
import ModalAlert from '../../Shared/ModalAlert';
import { postClass, getByIdClasses, putClass, deleteClass } from '../../../redux/classes/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers } from '../../../redux/trainers/thunks';
import { getActivities } from '../../../redux/activities/thunks';

const FormClasses = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    activity: '',
    trainer: '',
    day: '',
    hour: '',
    slots: ''
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
      dispatch(getByIdClasses(id, setFormData));
    }
  }, [id]);

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(putClass(id, formData, setModalText, setShowModal, setIsTrue, deleteClass));
    } else {
      dispatch(postClass(formData, setModalText, setShowModal, setIsTrue, deleteClass));
    }
  };

  const onSubmitCancel = (e) => {
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
      <form className={styles.formClasses}>
        <div className={styles.formContainer}>
          <div className={styles.inputClass}>
            <label className={styles.labelClasses} htmlFor="activity">
              Activity
            </label>
            <select
              className={styles.selectClasses}
              id="activity"
              name="activity"
              value={formData.activity}
              onChange={onChangeInput}
            >
              <option value="">Choose an Activity</option>
              {activities.list.map((activity) => (
                <option key={activity._id} value={activity._id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputClass}>
            <label className={styles.labelClasses} htmlFor="trainer">
              Trainer
            </label>
            <select
              className={styles.selectClasses}
              id="trainer"
              name="trainer"
              value={formData.trainer}
              onChange={onChangeInput}
            >
              <option value="">Choose a Trainer</option>
              {trainers.list.map((trainer) => (
                <option key={trainer._id} value={trainer._id}>
                  {trainer.firstName} {trainer.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputClass}>
            <Input
              labelText="Day"
              onChange={onChangeInput}
              type="text"
              name="day"
              value={formData.day}
            />
          </div>
          <div className={styles.inputClass}>
            <Input
              labelText="Hour"
              onChange={onChangeInput}
              type="text"
              name="hour"
              value={formData.hour}
            />
          </div>
          <div className={styles.inputClass}>
            <Input
              labelText="Slots"
              onChange={onChangeInput}
              type="text"
              name="slots"
              value={formData.slots}
            />
          </div>
        </div>
        <Button type="confirm" onClick={onSubmit} buttonText="Confirm" />
        <Button type="cancel" onClick={onSubmitCancel} buttonText="Cancel" />
      </form>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default FormClasses;

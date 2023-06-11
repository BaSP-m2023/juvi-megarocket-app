import React, { useState, useEffect } from 'react';
import styles from './classesForm.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import { Input } from '../../Shared';
import ModalAlert from '../../Shared/ModalAlert';
import { postClass, getByIdClasses, putClass } from '../../../redux/classes/thunks';
import { useDispatch, useSelector } from 'react-redux';

const FormClasses = () => {
  const classData = useSelector((state) => state.classes);
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
  console.log(classData);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getByIdClasses(id, setFormData));
      /*fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedClass(data.data);
        })
        .catch((error) => {
          console.log(error);
        });*/
    }
  }, [id]);
  /*
  useEffect(() => {
    setFormData({
      activity: classData.item.activity._id || '',
      trainer: classData.item.trainer._id || '',
      day: classData.item.day || '',
      hour: classData.item.hour || '',
      slots: classData.item.slots || ''
    });
  }, []);
*/
  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(putClass(id, formData, setModalText, setShowModal, setIsTrue));
    } else {
      dispatch(postClass(formData, setModalText, setShowModal, setIsTrue));
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
            <Input
              labelText="ID Activity"
              onChange={onChangeInput}
              type="text"
              name="activity"
              value={formData.activity}
            />
          </div>
          <div className={styles.inputClass}>
            <Input
              labelText="ID Trainer"
              onChange={onChangeInput}
              type="text"
              name="trainer"
              value={formData.trainer}
            />
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
        <Button type="confirm" onClick={onSubmit} />
        <Button type="cancel" onClick={onSubmitCancel} />
      </form>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default FormClasses;

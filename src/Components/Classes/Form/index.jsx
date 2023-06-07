import React, { useState, useEffect } from 'react';
import styles from './classesForm.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import { Input } from '../../Shared';
import ModalAlert from '../../Shared/ModalAlert';

const FormClasses = () => {
  const { id } = useParams();
  const history = useHistory();
  const [classesData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
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

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedClass(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    setFormData({
      activity: selectedClass.activity?._id || '',
      trainer: selectedClass.trainer?._id || '',
      day: selectedClass.day || '',
      hour: selectedClass.hour || '',
      slots: selectedClass.slots || ''
    });
  }, [selectedClass]);

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addClass = async ({ activity, trainer, day, hour, slots }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activity, trainer, day, hour, slots })
      });
      const responseData = await response.json();

      if (responseData.error) {
        throw new Error(responseData.message);
      } else {
        const newClass = responseData.data;
        setClassData([...classesData, newClass]);
        setModalText('Class created correctly!');
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      setModalText('Error creating Class: ' + error);
      setShowModal(true);
    }
  };

  const editClass = async (updatedClass, classId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${classId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClass)
      });
      const responseData = await response.json();
      if (response.ok) {
        const updatedClassData = responseData.data;
        setClassData(
          classesData.map((itemClass) =>
            itemClass._id === updatedClassData._id ? updatedClassData : itemClass
          )
        );
        setIsTrue(true);
        setModalText('Class updated correctly!');
        setShowModal(true);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setModalText('Error updating Class: ' + error);
      setShowModal(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editClass(formData, selectedClass._id);
    } else {
      addClass(formData);
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

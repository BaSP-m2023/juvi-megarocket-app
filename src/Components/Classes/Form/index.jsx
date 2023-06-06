import React, { useState, useEffect } from 'react';
import styles from './classesForm.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import { Input } from '../../Shared';

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

  const onChangeInput = async (e) => {
    await setFormData({
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
        alert('Class created correctly!');
      }
    } catch (error) {
      console.log(error);
      alert('Error creating Class: ' + error);
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
        alert('Class updated correctly!');
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert('Error updating Class: ' + error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editClass(formData, selectedClass._id);
      history.goBack();
    } else {
      addClass(formData);
      history.goBack();
    }
  };

  const onSubmitCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  console.log(selectedClass);
  console.log(selectedClass.activity?._id);

  return (
    <>
      <form className={styles.formClasses}>
        <div className={styles.formContainer}>
          <div className={styles.inputClass}>
            <Input
              labelText="ID Activity"
              onChange={onChangeInput}
              type={'text'}
              name="activity"
              value={formData.activity}
            />
          </div>
          <div className={styles.inputClass}>
            <Input
              labelText="ID Trainer"
              onChange={onChangeInput}
              type={'text'}
              name="trainer"
              value={formData.trainer}
            />
          </div>
          <div className={styles.inputClass}>
            <Input
              labelText="Day"
              onChange={onChangeInput}
              type={'text'}
              name="day"
              value={formData.day}
            />
          </div>
          <div className={styles.inputClass}>
            <Input
              labelText="Hour"
              onChange={onChangeInput}
              type={'text'}
              name="hour"
              value={formData.hour}
            />
          </div>
          <div className={styles.inputClass}>
            <Input
              labelText="Slots"
              onChange={onChangeInput}
              type={'text'}
              name="slots"
              value={formData.slots}
            />
          </div>
        </div>
        <Button type="confirm" onClick={onSubmit}></Button>
        <Button type="cancel" onClick={onSubmitCancel}></Button>
      </form>
    </>
  );
};

export default FormClasses;

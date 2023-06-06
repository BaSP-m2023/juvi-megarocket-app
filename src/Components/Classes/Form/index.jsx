import React, { useState, useEffect } from 'react';
import styles from './classesForm.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
// import Button from '../../Shared';

const FormClasses = () => {
  const { id } = useParams();
  const [classesData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [formData, setFormData] = useState({
    activity: selectedClass.activity || '',
    trainer: selectedClass.trainer || '',
    day: selectedClass.day || '',
    hour: selectedClass.hour || '',
    slots: selectedClass.slots || ''
  });
  const history = useHistory();

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
  }, []);

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
    } else {
      addClass(formData);
    }
  };

  const onSubmitCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <>
      <form className={styles.formClasses}>
        <div className={styles.formContainer}>
          <div className={styles.inputClass}>
            <label>Activity</label>
            <input
              className={styles.input}
              type="text"
              name="activity"
              value={formData.activity}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.inputClass}>
            <label>Trainer</label>
            <input
              className={styles.input}
              type="text"
              name="trainer"
              value={formData.trainer}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.inputClass}>
            <label>Day</label>
            <input
              className={styles.input}
              type="text"
              name="day"
              value={formData.day}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.inputClass}>
            <label>Hour</label>
            <input
              className={styles.input}
              type="text"
              name="hour"
              value={formData.hour}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.inputClass}>
            <label>Slots</label>
            <input
              className={styles.input}
              type="text"
              name="slots"
              value={formData.slots}
              onChange={onChangeInput}
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

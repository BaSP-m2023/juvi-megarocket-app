import styles from './newclass.module.css';
import { useState } from 'react';
import React from 'react';

const createFrom = ({ dataActivity, dataTrainers, showForm, addClass, changeState }) => {
  const [formData, setFormData] = useState({
    activity: '',
    trainer: '',
    day: '',
    hour: '',
    slots: ''
  });
  const defaultFormData = {
    activity: '',
    trainer: '',
    day: '',
    hour: '',
    slots: ''
  };
  const onChangeInput = async (e) => {
    await setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData) {
      alert('Please fill out the form');
    } else {
      addClass(formData);
      setFormData(defaultFormData);
    }
  };
  const onCancelButton = () => {
    changeState();
  };
  return (
    <>
      {showForm ? (
        <form className={styles.addClass} onSubmit={onSubmit}>
          <div className={styles.formControl}>
            <div className={styles.firstLine}>
              <label className={styles.labelClasses}>Activity</label>
              <select
                className={styles.selectClasses}
                value={formData.activity}
                name="activity"
                onChange={onChangeInput}
              >
                <option value="">Select an activity</option>
                {dataActivity.map((activity) => (
                  <option key={activity._id} value={activity._id}>
                    {activity.name}
                  </option>
                ))}
              </select>
              <label className={styles.labelClasses}>Trainers</label>
              <select
                className={styles.selectClasses}
                value={formData.trainer}
                name="trainer"
                onChange={onChangeInput}
              >
                <option value="">Select a trainer</option>
                {dataTrainers.map((trainer) => (
                  <option key={trainer._id} value={trainer._id}>
                    {trainer.firstName}
                  </option>
                ))}
              </select>
              <label className={styles.labelClasses}>Day</label>
              <select
                className={styles.selectClasses}
                value={formData.day}
                name="day"
                onChange={onChangeInput}
              >
                <option value="">Select a Day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </select>
            </div>
            <div className={styles.secondLine}>
              <div className={styles.formHour}>
                <label className={styles.labelClasses}>Hours</label>
                <input
                  className={styles.inputClasses}
                  type="time"
                  name="hour"
                  onChange={onChangeInput}
                ></input>
              </div>
              <div className={styles.formSlots}>
                <label className={styles.labelClasses}>Slots</label>
                <input
                  className={styles.inputClasses}
                  type="text"
                  name="slots"
                  placeholder="Add slots for class"
                  onChange={onChangeInput}
                ></input>
              </div>
            </div>
            <div className={styles.btnCreateForm}>
              <button className={styles.btnSubmit} type="submit" value="Save">
                Submit
              </button>
              <button className={styles.btnCancel} type="button" onClick={onCancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default createFrom;

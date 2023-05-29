import React, { useState } from 'react';
import styles from './newclass.module.css';

const ClassForm = (props) => {
  const [formData, setFormData] = useState({
    trainer: props.classData.trainer._id,
    activity: props.classData.activity._id,
    day: props.classData.day,
    hour: props.classData.hour,
    slots: props.classData.slots
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleUpdate(formData, props.classData._id);
  };

  const handleCancel = () => {
    props.handleCancel();
  };

  const filteredTrainers = props.trainersData.filter(
    (trainer) => trainer._id !== props.classData.trainer._id
  );
  const filteredActivities = props.activitiesData.filter(
    (activity) => activity._id !== props.classData.activity._id
  );
  return (
    <form className={styles.updateClass} onSubmit={handleSubmit}>
      <div className={styles.formControlUpdate}>
        <div className={styles.updateOption}>
          <label>
            Trainer:
            <select name="trainer" onChange={handleChange}>
              <option value={props.classData.trainer._id}>
                {props.classData.trainer.firstName + ' ' + props.classData.trainer.lastName}
              </option>
              {filteredTrainers.map((trainer) => (
                <option key={trainer._id} value={trainer._id}>
                  {trainer.firstName + ' ' + trainer.lastName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.updateOption}>
          <label>
            Activity:
            <select name="activity" onChange={handleChange}>
              <option value={props.classData.activity._id}>{props.classData.activity.name}</option>
              {filteredActivities.map((activity) => (
                <option key={activity._id} value={activity._id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.updateOption}>
          <label>
            Day:
            <input type="text" name="day" value={formData.day} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.updateOption}>
          <label>
            Hour:
            <input type="text" name="hour" value={formData.hour} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.updateOption}>
          <label>
            Slots:
            <input type="text" name="slots" value={formData.slots} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.btnEdit}>
          <button className={styles.btnSubmit} type="submit">
            Update
          </button>
          <button className={styles.btnCancel} type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ClassForm;

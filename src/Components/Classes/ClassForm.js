import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
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
      <label>
        Day:
        <input type="text" name="day" value={formData.day} onChange={handleChange} />
      </label>
      <label>
        Hour:
        <input type="text" name="hour" value={formData.hour} onChange={handleChange} />
      </label>
      <label>
        Slots:
        <input type="text" name="slots" value={formData.slots} onChange={handleChange} />
      </label>
      <button type="submit">Update</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ClassForm;

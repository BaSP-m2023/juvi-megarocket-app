import React, { useState } from 'react';

const ClassForm = (props) => {
  const [formData, setFormData] = useState({
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

  return (
    <form onSubmit={handleSubmit}>
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

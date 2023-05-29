import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = ({ addActivity, editActivity, selectedActivity, setShowForm }) => {
  const [activity, setActivity] = useState({
    name: '',
    description: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (selectedActivity) {
      setActivity(selectedActivity);
      setEditMode(true);
    } else {
      setActivity({
        name: '',
        description: ''
      });
      setEditMode(false);
    }
  }, [selectedActivity]);

  const onChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      editActivity(activity);
      alert('Activity updated successfully!');
    } else {
      addActivity(activity);
      alert('Activity added successfully!');
    }
    setActivity({
      name: '',
      description: ''
    });
    setShowForm(false);
  };

  const buttonText = editMode ? 'Update' : 'Add';

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.subContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            name="name"
            type="text"
            value={activity.name}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            name="description"
            type="text"
            value={activity.description}
            onChange={onChange}
          />
        </div>
      </div>
      <button className={styles.button} type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default Form;

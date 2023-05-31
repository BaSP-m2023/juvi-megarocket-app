import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = ({ addActivity, editActivity, selectedActivity, setShowForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (selectedActivity) {
      setEditMode(true);
      setFormData({
        name: selectedActivity.name,
        description: selectedActivity.description
      });
    } else {
      setEditMode(false);
      setFormData({
        name: '',
        description: ''
      });
    }
  }, [selectedActivity]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      editActivity(formData, selectedActivity._id);
    } else {
      addActivity(formData);
    }
    setFormData({
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
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            name="description"
            type="text"
            value={formData.description}
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

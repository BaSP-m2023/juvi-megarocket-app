import React, { useState, useEffect } from 'react';
import styles from './super-admins-form.module.css';

const Form = ({ addAdmin, editAdmin, selectedAdmin }) => {
  const [admin, setAdmin] = useState({
    email: '',
    password: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [newSelectedAdmin, setNewSelectedAdmin] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (selectedAdmin) {
      setEditMode(true);
      setNewSelectedAdmin({
        email: selectedAdmin.email,
        password: selectedAdmin.password
      });
    } else {
      setAdmin({
        email: '',
        password: ''
      });
      setEditMode(false);
    }
  }, [selectedAdmin]);

  const onChange = (e) => {
    if (editMode) {
      setNewSelectedAdmin((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    } else {
      setAdmin((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      editAdmin(newSelectedAdmin, selectedAdmin._id);
      alert('Admin updated successfully!');
    } else {
      addAdmin(admin);
      alert('Admin added successfully!');
    }
    setAdmin({
      email: '',
      password: ''
    });
  };

  const buttonText = editMode ? 'Update' : 'Add';

  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <div className={styles.boxContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            name="email"
            type="email"
            value={editMode ? newSelectedAdmin.email : admin.email}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            name="password"
            type="password"
            value={editMode ? newSelectedAdmin.password : admin.password}
            onChange={onChange}
          />
        </div>
      </div>
      <button className={styles.buttonB} type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default Form;

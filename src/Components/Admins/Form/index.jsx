import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory } from 'react-router-dom';

const Form = ({ addAdmin, editAdmin, setShowForm, selectedAdmin, isEditing }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: ''
  });

  useEffect(() => {
    if (isEditing) {
      setFormData({
        firstName: selectedAdmin.firstName,
        lastName: selectedAdmin.lastName,
        dni: selectedAdmin.dni,
        phone: selectedAdmin.phone,
        email: selectedAdmin.email,
        city: selectedAdmin.city,
        password: selectedAdmin.password
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
        email: '',
        city: '',
        password: ''
      });
    }
  }, [selectedAdmin]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await editAdmin(formData, selectedAdmin._id);
      console.log(editAdmin);
    } else {
      await addAdmin(formData);
      console.log(formData);
    }
    setShowForm(false);
  };

  const switchButtonText = isEditing ? 'Update' : 'Add';

  return (
    <form className={styles.myForm} onSubmit={onSubmit}>
      <div className={styles.divContainer}>
        <div className={styles.inputDiv}>
          <label>First Name</label>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputDiv}>
          <label>Last Name</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputDiv}>
          <label>DNI</label>
          <input
            className={styles.input}
            type="text"
            name="dni"
            value={formData.dni}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputDiv}>
          <label>Phone</label>
          <input
            className={styles.input}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputDiv}>
          <label>Email</label>
          <input
            className={styles.input}
            type="text"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputDiv}>
          <label>City</label>
          <input
            className={styles.input}
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputDiv}>
          <label>Password</label>
          <input
            className={styles.input}
            type="text"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
      </div>
      <button className={styles.addButton} type="submit">
        {switchButtonText}
      </button>
      <button type="button" className={styles.cancelButton} onClick={() => history.goBack()}>
        Cancel
      </button>
    </form>
  );
};

export default Form;

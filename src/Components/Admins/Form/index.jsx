import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = (props) => {
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
    if (props.isEditing) {
      setFormData({
        firstName: props.selectedAdmin.firstName,
        lastName: props.selectedAdmin.lastName,
        dni: props.selectedAdmin.dni,
        phone: props.selectedAdmin.phone,
        email: props.selectedAdmin.email,
        city: props.selectedAdmin.city,
        password: props.selectedAdmin.password
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
  }, [props.selectedAdmin]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (props.isEditing) {
      props.editAdmin(formData, props.selectedAdmin._id);
    } else {
      props.addAdmin(formData);
    }
    props.setShowForm(false);
  };

  const switchButtonText = props.isEditing ? 'Update' : 'Add';

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
      <button className={styles.cancelButton} onClick={() => props.setShowForm(false)}>
        Cancel
      </button>
    </form>
  );
};

export default Form;

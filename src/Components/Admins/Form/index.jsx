import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';

const Form = () => {
  const { id } = useParams();
  const [adminsData, setAdminsData] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [formData, setFormData] = useState({
    firstName: selectedAdmin.firstName || '',
    lastName: selectedAdmin.lastName || '',
    dni: selectedAdmin.dni || '',
    phone: selectedAdmin.phone || '',
    email: selectedAdmin.email || '',
    city: selectedAdmin.city || '',
    password: selectedAdmin.password || ''
  });

  const history = useHistory();

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedAdmin(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    setFormData({
      firstName: selectedAdmin.firstName || '',
      lastName: selectedAdmin.lastName || '',
      dni: selectedAdmin.dni || '',
      phone: selectedAdmin.phone || '',
      email: selectedAdmin.email || '',
      city: selectedAdmin.city || '',
      password: selectedAdmin.password || ''
    });
  }, [selectedAdmin]);

  const addAdmin = async ({ firstName, lastName, dni, phone, email, city, password }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, dni, phone, email, city, password })
      });
      const responseData = await response.json();

      if (!responseData.error) {
        alert('Admin created correctly!');
        history.goBack();
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.log(error);
      alert('Error creating admin: ' + error);
    }
  };
  const editAdmin = async (updatedAdmin, adminId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAdmin)
      });
      const responseData = await response.json();
      if (response.ok) {
        const updatedAdminData = responseData.data;
        setAdminsData(
          adminsData.map((admin) => (admin._id === updatedAdminData._id ? updatedAdminData : admin))
        );
        alert('Admin updated correctly!');
        history.goBack();
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert('Error updating Admin: ' + error);
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editAdmin(formData, selectedAdmin._id);
    } else {
      addAdmin(formData);
    }
  };

  const switchButtonText = id ? 'Update' : 'Add';

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

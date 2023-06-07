import React, { useState, useEffect } from 'react';
import styles from './super-admins-form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import Input from '../../Shared/Input';
// import { Link } from 'react-router-dom';

const FormSuperAdmin = () => {
  const { id } = useParams();
  const [adminsData, setAdminsData] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [formData, setFormData] = useState({
    email: selectedAdmin.email || '',
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

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addAdmin = async ({ email, password }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const responseData = await response.json();

      if (responseData.error) {
        throw new Error(responseData.message);
      } else {
        const newAdmin = responseData.data;
        setAdminsData([...adminsData, newAdmin]);
        alert('Admin created correctly!');
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
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert('Error updating Admin: ' + error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editAdmin(formData, selectedAdmin._id);
      history.goBack();
    } else {
      addAdmin(formData);
      history.goBack();
    }
  };

  const onSubmitCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <form className={styles.formAdmin}>
      <div className={styles.formContainer}>
        <div className={styles.inputAdmin}>
          <Input
            labelText="Email"
            onChange={onChange}
            type="text"
            name="email"
            value={formData.admin}
          />
        </div>
        <div className={styles.inputAdmin}>
          <Input
            labelText="Password"
            onChange={onChange}
            type="password"
            name="password"
            value={formData.admin}
          />
        </div>
      </div>
      <Button type="confirm" onClick={onSubmit}></Button>
      <Button type="cancel" onClick={onSubmitCancel}></Button>
    </form>
  );
};

export default FormSuperAdmin;

import React, { useState, useEffect } from 'react';
import styles from './super-admins-form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Input, ModalAlert } from '../../Shared';

const FormSuperAdmin = () => {
  const { id } = useParams();
  const history = useHistory();
  const [adminsData, setAdminsData] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({
    email: selectedAdmin.email || '',
    password: selectedAdmin.password || ''
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/${id}`)
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
    setFormData(selectedAdmin);
  }, [selectedAdmin]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addAdmin = async ({ email, password }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/`, {
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
        setModalText('Admin add successfully!');
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      alert('Error creating admin: ' + error);
    }
  };

  const editAdmin = async (updatedAdmin, adminId) => {
    const dataUpdate = {
      email: updatedAdmin.email,
      password: updatedAdmin.password
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUpdate)
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedAdminData = responseData.data;
        setAdminsData(
          adminsData.map((admin) => (admin._id === updatedAdminData._id ? updatedAdminData : admin))
        );
        setModalText('Admin updated correctly!');
        setShowModal(true);
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.log(formData);
      setModalText('Error updating admin: ' + error);
      setShowModal(true);
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

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const onSubmitCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <>
      <form className={styles.formAdmin}>
        <div className={styles.formContainer}>
          <div className={styles.inputAdmin}>
            <Input
              labelText="Email"
              onChange={onChange}
              type="text"
              name="email"
              value={formData.email}
            />
          </div>
          <Input
            labelText="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="confirm" onClick={onSubmit}></Button>
          <Button type="cancel" onClick={onSubmitCancel}></Button>
        </div>
      </form>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default FormSuperAdmin;

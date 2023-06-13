import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import ModalAlert from '../../Shared/ModalAlert/index.jsx';
import { Input } from '../../Shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { editAdmin, addAdmin, getByIdAdmins } from '../../../redux/admins/thunks';

const AdminsForm = () => {
  const dispatch = useDispatch();
  const [modalText, setModalText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: selectedAdmin.firstName || '',
    lastName: selectedAdmin.lastName || '',
    dni: selectedAdmin.dni || '',
    phone: selectedAdmin.phone || '',
    email: selectedAdmin.email || '',
    city: selectedAdmin.city || '',
    password: selectedAdmin.password || ''
  });

  const closeModalAndBack = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    history.goBack();
  };
  const closeModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    if (success) {
      history.goBack();
    }
  };

  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (id) {
      dispatch(getByIdAdmins(id, setSelectedAdmin));
    }
  }, [id]);

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

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editAdmin(id, formData, setSuccess, setModalText, setIsModalOpen));
    } else {
      dispatch(addAdmin(formData, setModalText, setIsModalOpen, setSuccess));
    }
  };

  const switchButtonText = id ? 'Update' : 'Add';

  return (
    <>
      <form className={styles.myForm}>
        <div className={styles.divContainer}>
          <div className={styles.inputDiv}>
            <label>First Name</label>
            <Input name="firstName" type="text" value={formData.firstName} onChange={onChange} />
          </div>
          <div className={styles.inputDiv}>
            <label>Last Name</label>
            <Input
              className={styles.input}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>DNI</label>
            <Input
              className={styles.input}
              type="text"
              name="dni"
              value={formData.dni}
              onChange={onChange}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Phone</label>
            <Input
              className={styles.input}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChange}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Email</label>
            <Input
              className={styles.input}
              type="text"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>City</label>
            <Input
              className={styles.input}
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Password</label>
            <div className={styles.password}>
              <Input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={onChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={styles.showPasswordIcon}
                onClick={togglePassword}
              />
            </div>
          </div>
        </div>
        <Button className={styles.addButton} type="confirm" onClick={onSubmit}>
          {switchButtonText}
        </Button>
        <Button type="cancel" className={styles.cancelButton} onClick={closeModalAndBack}>
          Cancel
        </Button>
      </form>
      {isModalOpen && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default AdminsForm;

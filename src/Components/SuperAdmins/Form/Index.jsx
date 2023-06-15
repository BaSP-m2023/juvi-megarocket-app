import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './super-admins-form.module.css';
import { Button, Input, ModalAlert } from '../../Shared';
import {
  addSuperAdmins,
  editSuperAdmins,
  getByIdSuperAdmins
} from '../../../redux/superadmins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormSuperAdmins = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.superAdmins);
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({
    email: data.item?.email || '',
    password: data.item?.password || ''
  });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (id) {
      dispatch(getByIdSuperAdmins(id));
    } else {
      setFormData({
        email: '',
        password: ''
      });
    }
  }, [id, dispatch]);
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: data.item?.email || '',
      password: data.item?.password || ''
    }));
  }, [data.item]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editSuperAdmins(formData, id, setModalText, setShowModal, setShowModalSuccess));
    } else {
      dispatch(addSuperAdmins(formData, setModalText, setShowModal, setShowModalSuccess));
    }
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const closeModal = () => {
    if (showModal) {
      setShowModal(!showModal);
    } else {
      setShowModalSuccess(false);
      history.goBack();
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {data.isLoading ? (
        <div>is Loading</div>
      ) : (
        <form className={styles.FormSuperAdmins} onSubmit={onSubmit}>
          <div className={styles.subContainer}>
            <Input
              labelText="Email"
              name="email"
              type="text"
              value={formData.email}
              onChange={onChange}
            />
            <div className={styles.password}>
              <Input
                labelText="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
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
          <Button type="confirm"></Button>
          <Button type="cancel" onClick={closeModal}></Button>
        </form>
      )}
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
      {showModalSuccess && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};
export default FormSuperAdmins;

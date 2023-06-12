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
const FormSuperAdmins = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.superAdmins);
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({
    email: data.item?.email || '',
    password: data.item?.password || ''
  });
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
      dispatch(editSuperAdmins(formData, id, setModalText, setShowModal));
    } else {
      dispatch(addSuperAdmins(formData, setModalText, setShowModal));
      console.log(formData);
    }
    setFormData({
      email: '',
      password: ''
    });
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const closeModal = () => {
    setShowModal(!showModal);
    history.goBack();
  };
  return (
    <>
      {data.isLoading ? (
        <div>is Loading</div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.subContainer}>
            <Input
              labelText="Email"
              name="email"
              type="text"
              value={formData.email}
              onChange={onChange}
            />
            <Input
              labelText="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={onChange}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button type="confirm"></Button>
            <Button type="cancel" onClick={closeModal}></Button>
          </div>
        </form>
      )}
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};
export default FormSuperAdmins;

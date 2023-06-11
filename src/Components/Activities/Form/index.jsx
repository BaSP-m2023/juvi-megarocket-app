import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import { Button, Input, ModalAlert } from '../../Shared';
import { addActivity, editActivity, getByIdActivity } from '../../../redux/activities/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.activity);
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({
    name: data.item?.name || '',
    description: data.item?.description || ''
  });

  useEffect(() => {
    if (id) {
      dispatch(getByIdActivity(id));
    }
  }, [id]);
  useEffect(() => {
    setFormData({
      name: data.item?.name || '',
      description: data.item?.description || ''
    });
  }, [data.item]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editActivity(formData, id, setModalText, setShowModal));
    } else {
      dispatch(addActivity(formData, setModalText, setShowModal));
    }
    setFormData({
      name: '',
      description: ''
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
              labelText="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={onChange}
            />
            <Input
              labelText="Description"
              name="description"
              type="text"
              value={formData.description}
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

export default Form;

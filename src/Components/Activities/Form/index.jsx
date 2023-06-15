import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import { Button, Input, ModalAlert } from '../../Shared';
import { addActivity, editActivity, getByIdActivity } from '../../../redux/activities/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.activities);
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
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
      dispatch(editActivity(formData, id, setModalText, setShowModal, setShowModalSuccess));
    } else {
      dispatch(addActivity(formData, setModalText, setShowModal, setShowModalSuccess));
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {data.isLoading ? (
        <div>is Loading</div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.divContainer}>
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
          <Button className={styles.addButton} type="confirm"></Button>
          <Button
            className={styles.addButton}
            type="cancel"
            onClick={() => history.push('/activities')}
          ></Button>
        </form>
      )}

      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
      {showModalSuccess && (
        <ModalAlert
          text={modalText}
          onClick={() => {
            history.push('/activities');
            setShowModalSuccess(false);
          }}
        />
      )}
    </>
  );
};

export default Form;

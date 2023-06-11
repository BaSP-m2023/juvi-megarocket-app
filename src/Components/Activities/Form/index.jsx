import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import { Button, Input, ModalAlert } from '../../Shared';
import { addActivity } from '../../../redux/activities/thunks';
import { useDispatch } from 'react-redux';

const Form = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({
    name: selectedActivity?.name || '',
    description: selectedActivity?.description || ''
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedActivity(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    setFormData({
      name: selectedActivity?.name || '',
      description: selectedActivity?.description || ''
    });
  }, [selectedActivity]);

  /*const addActivityLocal = async ({ name, description }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
      });
      const responseData = await response.json();

      if (response.ok) {
        const newActivity = responseData.data;
        setActivities([...activities, newActivity]);
        setModalText('Activity added successfully!');
        setShowModal(true);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setModalText('Error creating activity: ' + error);
      setShowModal(true);
    }
  };*/

  const editActivityLocal = async (updatedActivity, id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedActivity)
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedData = responseData.data;
        setActivities(
          activities.map((activity) => (activity._id === updatedData._id ? updatedData : activity))
        );
        setModalText('Activity updated successfully!');
        setShowModal(true);
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      setModalText('Error updating activity: ' + error);
      setShowModal(true);
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
      editActivityLocal(formData, selectedActivity._id);
    } else {
      dispatch(addActivity(formData, setModalText, setShowModal));
    }
    setFormData({
      name: '',
      description: ''
    });
  };

  const closeModal = () => {
    setShowModal(!showModal);
    history.goBack();
  };

  return (
    <>
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
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default Form;

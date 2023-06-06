import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import { Button } from '../../Shared';
// import { Input } from '../../Shared';

const Form = ({ activities, setActivities }) => {
  const { id } = useParams();
  const history = useHistory();
  const [selectedActivity, setSelectedActivity] = useState({});
  const [formData, setFormData] = useState({
    name: selectedActivity.name || '',
    description: selectedActivity.description || ''
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/activity/`)
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
      name: selectedActivity.name || '',
      description: selectedActivity.description || ''
    });
  }, [selectedActivity]);

  const addActivity = async ({ name, description }) => {
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
        setSelectedActivity(null);
        alert('Activity added successfully!');
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert('Error creating activity: ' + error);
    }
  };

  const editActivity = async (updatedActivity, _id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${_id}`, {
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
        setSelectedActivity(null);
        alert('Activity updated successfully!');
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert('Error updating activity: ' + error);
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
      editActivity(formData, selectedActivity._id);
    } else {
      addActivity(formData);
    }
    setFormData({
      name: '',
      description: ''
    });
  };

  const buttonText = id ? 'Update' : 'Add';

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.subContainer}>
        <input name="name" type="text" value={formData.name} onChange={onChange} />
        <input name="description" type="text" value={formData.description} onChange={onChange} />
      </div>
      <Button className={styles.button} type="confirm">
        {buttonText}
      </Button>
      <Button className={styles.cancelButton} type="cancel" onClick={() => history.goBack()}>
        Cancel
      </Button>
    </form>
  );
};

export default Form;

import React, { useEffect, useState } from 'react';
import styles from './activities.module.css';
import Table from './Table';
import Form from './Form';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/`);
      const responseData = await response.json();
      const data = responseData.data;
      setActivities(data);
    } catch (error) {
      alert('Error fetching activities: ' + error);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const addActivity = async ({ name, description }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
      });

      if (response.ok) {
        const responseData = await response.json();
        const newActivity = responseData.data;
        setActivities([...activities, newActivity]);
        setShowForm(false);
        setSelectedActivity(null);
        alert('Activity added successfully!');
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      setShowForm(true);
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
        setShowForm(false);
        setSelectedActivity(null);
        alert('Activity updated successfully!');
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      setShowForm(true);
      alert('Error updating activity: ' + error);
    }
  };

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${_id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setActivities(activities.filter((activity) => activity._id !== _id));
        alert('Activity deleted successfully!');
      } else {
        throw new Error('Error deleting activity');
      }
    } catch (error) {
      alert('Error deleting activity: ' + error);
    }
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setShowForm(true);
  };

  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      {!showForm && (
        <button className={styles.addButton} onClick={() => setShowForm(true)}>
          Add Activity
        </button>
      )}
      {showForm && (
        <Form
          addActivity={addActivity}
          editActivity={editActivity}
          selectedActivity={selectedActivity}
          setShowForm={setShowForm}
        />
      )}
      <Table data={activities} deleteItem={deleteItem} editActivity={handleEdit} />
    </section>
  );
};

export default Activities;

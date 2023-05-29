import { useEffect, useState } from 'react';
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

  const addActivity = ({ name, description }) => {
    const newActivity = {
      _id: Math.floor(Math.random() * 100),
      name,
      description
    };
    setActivities([...activities, newActivity]);
    setShowForm(false);
  };

  const editActivity = (updatedActivity) => {
    const updatedActivities = activities.map((activity) => {
      if (activity._id === updatedActivity._id) {
        return updatedActivity;
      }
      return activity;
    });
    setActivities(updatedActivities);
    setShowForm(false);
    setSelectedActivity(null);
  };

  const deleteItem = (_id) => {
    setActivities([...activities.filter((activity) => activity._id !== _id)]);
    alert('Activity deleted successfully!');
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

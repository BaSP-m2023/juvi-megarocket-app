import React, { useEffect, useState } from 'react';
import styles from './activities.module.css';
import { Link } from 'react-router-dom';
import { SharedTable, Button } from '../Shared';

const Activities = () => {
  const [activities, setActivities] = useState([]);

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

  return (
    <section className={styles.container}>
      <h2 className={styles.titleActivities}>Activities</h2>
      <Link to="/activities/ActivitiesForm">
        <Button type="add" resource="Activity" />
      </Link>
      <SharedTable
        data={activities}
        editLink={'activities/ActivitiesForm/'}
        handleDelete={deleteItem}
      />
    </section>
  );
};

export default Activities;

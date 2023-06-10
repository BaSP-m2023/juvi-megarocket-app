import React, { useEffect, useState } from 'react';
import styles from './activities.module.css';
import { Link } from 'react-router-dom';
import { Button, SharedTable, ModalAlert } from '../Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../redux/activities/thunks';
import { deleteActivity } from '../../redux/activities/thunks';

const Activities = () => {
  // const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const { list, isLoading, error, item } = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  console.log('list', list);
  console.log('isLoading', isLoading);
  console.log('error', error);
  console.log('item', item);

  /*const getActivitiesLocal = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/`);
      const responseData = await response.json();
      const data = responseData.data;
      setActivities(data);
    } catch (error) {
      setModalText('Error fetching activities: ' + error);
      setShowModal(true);
    }
  };*/
  /*const deleteItemLocal = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${_id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setActivities(activities.filter((activity) => activity._id !== _id));
        setModalText('Activity deleted successfully!');
        setShowModal(true);
      } else {
        throw new Error('Error deleting activity');
      }
    } catch (error) {
      setModalText('Error deleting activity: ' + error);
      setShowModal(true);
    }
  };
  console.log(deleteItemLocal);*/

  useEffect(() => {
    // getActivitiesLocal();
    dispatch(getActivities());
  }, []);

  const deleteItem = (_id) => {
    dispatch(deleteActivity(_id));
    setModalText('Activity deleted');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.titleActivities}>Activities</h2>
        <Link to="/activities/ActivitiesForm">
          <Button type="add" resource="Activity" />
        </Link>
        {isLoading ? (
          <div>is Loading</div>
        ) : (
          <SharedTable
            data={list}
            editLink={'activities/ActivitiesForm/'}
            handleDelete={deleteItem}
          />
        )}
      </section>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default Activities;

import React, { useEffect, useState } from 'react';
import styles from './activities.module.css';
import { Link } from 'react-router-dom';
import { Button, SharedTable, ModalAlert } from '../../Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, deleteActivity } from '../../../redux/activities/thunks';

const Activities = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const { list, isLoading } = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  const deleteItem = (_id) => {
    dispatch(deleteActivity(_id, setModalText));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.titleActivities}>
          <h2>Activities</h2>
          <Link to="/admins/activities/ActivitiesForm">
            <Button type="add" resource="Activity" />
          </Link>
        </div>
        {isLoading ? (
          <div>is Loading</div>
        ) : (
          <SharedTable
            data={list}
            editLink={'/admins/activities/ActivitiesForm/'}
            handleDelete={deleteItem}
          />
        )}
      </section>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default Activities;

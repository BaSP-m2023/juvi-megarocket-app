import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, deleteClass } from 'redux/classes/thunks';
import { getSubscriptions, deleteSubscription } from 'redux/subscriptions/thunks';
import { Button, ModalAlert, SharedTable } from 'Components/Shared';
import styles from './classes.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner/index';

const Classes = () => {
  const { list, isLoading } = useSelector((state) => state.classes);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const dispatch = useDispatch();
  const subsData = useSelector((state) => state.subscriptions);

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getClasses());
  }, [dispatch]);

  const deleteClasses = (_id) => {
    dispatch(deleteClass(_id, setModalText, setShowModal));
    subsData.list.forEach((sub) => {
      if (sub?.classes?._id === _id) {
        dispatch(deleteSubscription(sub._id));
      }
    });
  };

  const closeModal = () => {
    setShowModal(false);
    reloadPage();
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <section className={styles.containerClass} data-testid="admin-classes-section">
      <div className={styles.titleClass}>
        <h2>Classes</h2>
        <Link to="/admin/classes/form" className={styles.contButton}>
          <Button type="add" resource="Class" testId="add-button" />
        </Link>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SharedTable
          data={list}
          editLink={'/admin/classes/form/'}
          handleDelete={deleteClasses}
          testId="admin-classes-table"
        />
      )}
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </section>
  );
};

export default Classes;

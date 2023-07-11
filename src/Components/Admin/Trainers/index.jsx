import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './trainers.module.css';
import { resetErrorAndMessage } from 'redux/trainers/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers, delTrainer } from 'redux/trainers/thunks';
import { SharedTable, ModalAlert, Button } from 'Components/Shared';

function Trainers() {
  const { list, isLoading, error, message, item } = useSelector((state) => state.trainers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainers());
  }, [item]);

  const handleDelete = async (id) => {
    dispatch(delTrainer(id));
  };

  const closeAlert = () => {
    dispatch(resetErrorAndMessage());
  };

  return (
    <section className={styles.container} data-testid="admin-trainers-section">
      <div className={styles.titleTrainers}>
        <h2>Trainers</h2>
        <Link to="/admins/trainers/form" className={styles.link}>
          <Button type="add" resource="Trainer" testId="add-button" />
        </Link>
      </div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <SharedTable
          data={list}
          editLink={'/admin/trainers/form/'}
          handleDelete={handleDelete}
          testId="admin-trainers-table"
        />
      )}
      {message != '' && (
        <ModalAlert text={message} onClick={closeAlert} testId="admin-trainers-modal-alert" />
      )}
      {error != '' && (
        <ModalAlert text={error} onClick={closeAlert} testId="admin-trainers-modal-alert" />
      )}
    </section>
  );
}

export default Trainers;

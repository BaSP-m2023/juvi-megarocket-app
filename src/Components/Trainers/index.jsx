import { ModalAlert } from '../Shared';
import Button from 'Components/Shared/Button';
import SharedTable from 'Components/Shared/Table';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './trainers.module.css';
import { resetErrorAndMessage } from '../../redux/trainers/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers, delTrainer } from '../../redux/trainers/thunks';

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
    <section className={styles.container}>
      <div className={styles.titleTrainers}>
        <h2>Trainers</h2>
        <Link to="/admins/trainers/form" className={styles.link}>
          <Button type="add" resource="Trainer" />
        </Link>
      </div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <SharedTable data={list} editLink={'/admins/trainers/form/'} handleDelete={handleDelete} />
      )}
      {message != '' && <ModalAlert text={message} onClick={closeAlert} />}
      {error != '' && <ModalAlert text={error} onClick={closeAlert} />}
    </section>
  );
}

export default Trainers;

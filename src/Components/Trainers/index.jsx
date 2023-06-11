import { Button, SharedTable, ModalAlert } from '../Shared';
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
    resetErrorAndMessage();
  };

  return (
    <section className={styles.container}>
      <h1>Trainers</h1>
      <Link to="/trainers/form" className={styles.link}>
        <Button type="add" resource="Trainer" />
      </Link>
      {!isLoading && (
        <SharedTable data={list} editLink={'/trainers/form/'} handleDelete={handleDelete} />
      )}
      {error != '' && <ModalAlert text={error} onClick={closeAlert} />}
      {message != '' && <ModalAlert text={message} onClick={closeAlert} />}
    </section>
  );
}

export default Trainers;

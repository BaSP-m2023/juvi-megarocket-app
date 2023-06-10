import { Button, SharedTable, ModalAlert } from '../Shared';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './trainers.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getTrainers, delTrainer } from '../../redux/trainers/thunks';

function Trainers() {
  const [showAlert, setshowAlert] = false;
  const { list, isLoading, error, message, item } = useSelector((state) => state.trainers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainers());
  }, [item]);

  useEffect(() => {
    if (message != '') setshowAlert(true);
  }, [message]);

  const handleDelete = async (id) => {
    dispatch(delTrainer(id));
  };

  const closeAlert = () => {};

  return (
    <section className={styles.container}>
      <h1>Trainers</h1>
      <Link to="/trainers/add" className={styles.link}>
        <Button type="add" resource="Trainer" />
      </Link>
      {!isLoading && (
        <SharedTable data={list} editLink={'/trainers/edit/'} handleDelete={handleDelete} />
      )}
      {error != '' && <ModalAlert text={error} onClick={closeAlert} />}
      {showAlert && <ModalAlert text={message} onClick={closeAlert} />}
    </section>
  );
}

export default Trainers;

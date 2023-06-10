import { Button, SharedTable, ModalAlert } from '../Shared';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './trainers.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getTrainers, delTrainer } from '../../redux/trainers/thunks';

function Trainers() {
  const [showAlert, setshowAlert] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  const { list, isLoading, error, message, item } = useSelector((state) => state.trainers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainers());
  }, [item]);

  useEffect(() => {
    if (deleteTrigger === true) {
      setshowAlert(true);
      setDeleteTrigger((prevTrigger) => !prevTrigger);
    }
  }, [deleteTrigger]);

  const handleDelete = async (id) => {
    dispatch(delTrainer(id));
    setDeleteTrigger((prevTrigger) => !prevTrigger);
  };

  const closeAlert = () => {
    setshowAlert(false);
  };

  return (
    <section className={styles.container}>
      <h1>Trainers</h1>
      <Link to="/trainers/add" className={styles.link}>
        <Button type="add" resource="Trainer" />
      </Link>
      {!isLoading && (
        <SharedTable data={list} editLink={'/trainers/edit/'} handleDelete={handleDelete} />
      )}
      {showAlert && error != '' && <ModalAlert text={error} onClick={closeAlert} />}
      {showAlert && message != '' && <ModalAlert text={message} onClick={closeAlert} />}
    </section>
  );
}

export default Trainers;

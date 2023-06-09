import { Button, SharedTable, ModalAlert } from '../Shared';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './trainers.module.css';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletedTrainerId, setDeletedTrainerId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/trainer/`)
      .then((response) => response.json())
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
        setIsAlertOpen(true);
        setAlertMessage(error);
      });
  }, [deletedTrainerId]);

  const toggleFormAdd = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      setIsAlertOpen(true);
      setAlertMessage('Trainer deleted');
      setDeletedTrainerId(id);
    } else {
      setIsAlertOpen(true);
      setAlertMessage('Error deleting trainer');
    }
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <section className={styles.container}>
      <Link to="/trainers/add" className={styles.link}>
        <Button type="add" resource="Trainer" onClick={toggleFormAdd} />
      </Link>
      <SharedTable
        data={trainers.data}
        editLink={'/trainers/edit/'}
        handleDelete={handleDelete}
      ></SharedTable>

      {isAlertOpen && <ModalAlert text={alertMessage} onClick={closeAlert} />}
    </section>
  );
}

export default Trainers;

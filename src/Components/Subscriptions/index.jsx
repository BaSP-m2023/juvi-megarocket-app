/* eslint-disable no-unused-vars */
import styles from './subscriptions.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { SharedTable, ModalAlert, Button } from '../Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions, deleteSubscription } from '../../redux/subscriptions/thunks';

function Subscriptions() {
  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { list, isLoading } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteSubscription(id, setAlertText));
    setAlertText('');
  };

  const showAlertHandler = () => {
    setshowAlert(!showAlert);
  };

  return (
    <section className={styles.container}>
      <Link to="/subscriptions/form">
        <Button type="add" resource="Subscription"></Button>
      </Link>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <SharedTable data={list} editLink={'/trainers/form/'} handleDelete={handleDelete} />
      )}
    </section>
  );
}

export default Subscriptions;

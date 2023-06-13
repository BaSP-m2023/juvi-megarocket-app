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
    setshowAlert(true);
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
        <div>is Loading</div>
      ) : (
        <SharedTable data={list} editLink={'/subscriptions/form/'} handleDelete={handleDelete} />
      )}
      {showAlert && <ModalAlert text={alertText} onClick={showAlertHandler} />}
    </section>
  );
}

export default Subscriptions;

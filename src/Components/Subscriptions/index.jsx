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
    dispatch(deleteSubscription(id, setAlertText, setshowAlert));
  };

  const showAlertHandler = () => {
    setshowAlert(!showAlert);
  };

  return (
<<<<<<< HEAD
    <>
      <section className={styles.container}>
        <Link to="/subscriptions/form">
          <Button type="add" resource="Subscription"></Button>
        </Link>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <SharedTable data={list} editLink={'/subscriptions/form/'} handleDelete={handleDelete} />
        )}
      </section>
      {showAlert && <ModalAlert text={alertText} onClick={showAlertHandler} />}
    </>
=======
    <section className={styles.container}>
      <div className={styles.titleSubscriptions}>
        <h2>Subscriptions</h2>
        <Link to="/subscriptions/form">
          <Button type="add" resource="Subscription"></Button>
        </Link>
      </div>
      <SharedTable
        data={subscriptions}
        editLink={'/subscriptions/form/'}
        handleDelete={handleDelete}
      />
      {showAlert && <ModalAlert text={alertText} onClick={showAlertHandler} />}
    </section>
>>>>>>> master
  );
}

export default Subscriptions;

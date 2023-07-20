import styles from './subscriptions.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { SharedTable, ModalAlert, Button } from 'Components/Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions, deleteSubscription } from 'redux/subscriptions/thunks';
import LoadingSpinner from 'Components/Shared/LoadingSpinner/index';

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
    <>
      <section className={styles.container}>
        <Link to="/admin/subscriptions/form">
          <Button type="add" resource="Subscription"></Button>
        </Link>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <SharedTable
            data={list}
            editLink={'/admin/subscriptions/form/'}
            handleDelete={handleDelete}
          />
        )}
      </section>
      {showAlert && <ModalAlert text={alertText} onClick={showAlertHandler} />}
    </>
  );
}

export default Subscriptions;

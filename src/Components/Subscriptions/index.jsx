import styles from './subscriptions.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { SharedTable, ModalAlert, Button } from '../Shared';

function Subscriptions() {
  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error === true) {
            setAlertText(data.message);
          } else {
            setAlertText(data.message);
          }
        });
      getData();
      showAlertHandler();
    } catch (error) {
      setAlertText(error);
      showAlertHandler();
    }
  };

  const getData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`)
      .then((response) => response.json())
      .then((jsonData) => {
        const subData = jsonData.data;
        setSubscriptions(subData);
      })
      .catch((error) => {
        setAlertText(error);
        showAlertHandler();
      });
  };

  const showAlertHandler = () => {
    setshowAlert(!showAlert);
  };

  return (
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
  );
}

export default Subscriptions;

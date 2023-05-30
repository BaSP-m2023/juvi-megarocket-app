import styles from './subscriptions.module.css';
import Table from './Table';
import Form from './Form';
import { useState, useEffect } from 'react';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`)
      .then((response) => response.json())
      .then((data) => {
        setSubscriptions(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error', error);
      });
  }, []);

  return (
    <section className={styles.container}>
      <Table
        data={subscriptions.data ? subscriptions.data : []}
        onButtonClick={handleButtonClick}
      />
      {showForm && <Form onClose={handleFormClose} />}
    </section>
  );
}

export default Subscriptions;

import styles from './subscriptions.module.css';
import Table from './Table';
import { useState, useEffect } from 'react';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`)
      .then((response) => response.json())
      .then((data) => {
        setSubscriptions(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <section className={styles.container}>
      <Table data={subscriptions.data ? subscriptions.data : []} />
    </section>
  );
}

export default Subscriptions;

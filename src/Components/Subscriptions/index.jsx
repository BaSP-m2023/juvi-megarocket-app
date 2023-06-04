import styles from './subscriptions.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Table from '../Shared';
import ModalAlert from '../Shared';
import Button from '../Shared';

function Subscriptions() {
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
            ModalAlert(data.message);
          } else ModalAlert(data.message);
        });
      getData();
    } catch (error) {
      ModalAlert(error);
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
        ModalAlert(error);
      });
  };

  return (
    <section className={styles.container}>
      <Link>
        <Button>Add Admin</Button>
      </Link>
      <Table data={subscriptions} editLink={'/subscriptions/form'} handleDelete={handleDelete} />
    </section>
  );
}

export default Subscriptions;

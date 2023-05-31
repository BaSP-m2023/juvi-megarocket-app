import styles from './subscriptions.module.css';
import Table from './Table';
import Form from './Form';
import { useState, useEffect } from 'react';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  useEffect(() => {
    getData();
    getMember();
    getClasses();
  }, []);

  const getData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`)
      .then((response) => response.json())
      .then((jsonData) => {
        const subData = jsonData.data;
        setSubscriptions(subData);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getMember = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/member/`)
      .then((response) => response.json())
      .then((jsonData) => {
        const memberData = jsonData.data;
        setMembers(memberData);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getClasses = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/class/`)
      .then((response) => response.json())
      .then((jsonData) => {
        const classesData = jsonData.data;
        setClasses(classesData);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <section className={styles.container}>
      <Table
        data={subscriptions}
        members={members}
        classes={classes}
        onButtonClick={handleButtonClick}
      />

      {showForm && (
        <Form
          subscriptions={subscriptions}
          members={members}
          classes={classes}
          onClose={handleFormClose}
        />
      )}
    </section>
  );
}

export default Subscriptions;

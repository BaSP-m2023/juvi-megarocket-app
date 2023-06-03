import { useEffect, useState } from 'react';
import Table from './Table/index.jsx';
import styles from './admins.module.css';
import { Link } from 'react-router-dom';

function Admins() {
  const [adminsData, setAdminsData] = useState([]);

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const jsonData = await response.json();
      const adminData = jsonData.data;
      setAdminsData(adminData);
    } catch (error) {
      alert('Error getting Admins.');
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setAdminsData(adminsData.filter((admin) => admin.id !== id));
        alert('Admin deleted correctly!');
      } else {
        throw new Error('Error deleting Admin.');
      }
    } catch (error) {
      alert(`Error deleting Admin: ` + error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>

      <Link to="/admins/form">Add Admin</Link>

      <Table data={adminsData} deleteAdmin={deleteAdmin} />
    </section>
  );
}

export default Admins;

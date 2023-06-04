import { useEffect, useState } from 'react';
import Table from './Table/index.jsx';
import styles from './admins.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button/index.jsx';
import ModalAlert from '../Shared/ModalAlert/index.jsx';

function Admins() {
  const [adminsData, setAdminsData] = useState([]);
  const [modalText, setModalText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const jsonData = await response.json();
      const adminData = jsonData.data;
      setAdminsData(adminData);
    } catch (error) {
      setModalText('Error getting Admins.');
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
        setModalText('Admin deleted correctly!');
        setIsModalOpen(true);
      } else {
        throw new Error('Error deleting Admin.');
      }
    } catch (error) {
      setModalText(`Error deleting Admin: ${error}`);
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Link to="/admins/AdminForm">
        <Button type="add" resource="admin" styles>
          Add Admin
        </Button>
      </Link>
      <Table data={adminsData} deleteAdmin={deleteAdmin} />
      {isModalOpen && <ModalAlert text={modalText} onClick={closeModal} />}
    </section>
  );
}

export default Admins;

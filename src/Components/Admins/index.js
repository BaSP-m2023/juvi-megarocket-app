import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button/index.jsx';
import { ModalAlert } from '../Shared/index.jsx';
import { SharedTable } from '../Shared';

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
        setAdminsData(adminsData.filter((admin) => admin._id !== id));
        setModalText('Admin deleted correctly!');
        setIsModalOpen(true);
      } else {
        throw new Error('Error deleting Admin.');
      }
    } catch (error) {
      setModalText(`Error : ${error}`);
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onDelete = (id) => {
    deleteAdmin(id);
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleAdmin}>
        <h2>Admins</h2>
        <Link to="/admins/form">
          <Button type="add" resource="admin">
            Add Admin
          </Button>
        </Link>
      </div>
      <SharedTable data={adminsData} handleDelete={onDelete} editLink="/admins/form/" />
      {isModalOpen && <ModalAlert text={modalText} onClick={closeModal} />}
    </section>
  );
}

export default Admins;

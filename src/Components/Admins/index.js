import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button/index.jsx';
import { ModalAlert, ModalConfirm } from '../Shared/index.jsx';
import { SharedTable } from '../Shared';

function Admins() {
  const [adminsData, setAdminsData] = useState([]);
  const [modalText, setModalText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [idToDelete, setidToDelete] = useState('');

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

  const deleteAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${idToDelete}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setAdminsData(adminsData.filter((admin) => admin._id !== idToDelete));
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
    setIsModalDeleteOpen(false);
  };
  const onDelete = (id) => {
    setIsModalDeleteOpen(true);
    setidToDelete(id);
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
      {isModalDeleteOpen && (
        <ModalConfirm
          onConfirm={deleteAdmin}
          onCancel={closeModal}
          message="Are you sure you want to delete this admin?"
          title="Delete Admin"
        />
      )}
      {isModalOpen && <ModalAlert text={modalText} onClick={closeModal} />}
    </section>
  );
}

export default Admins;

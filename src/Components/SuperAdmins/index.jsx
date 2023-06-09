import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import { Link } from 'react-router-dom';
import { Button, SharedTable, ModalAlert } from '../Shared';

const AdminsPage = () => {
  const [admin, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/`);
      const responseData = await response.json();
      const data = responseData.data;
      setAdmins(data);
    } catch (error) {
      setModalText('Error fetching admins: ' + error);
      setShowModal(true);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/${_id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAdmins(admin.filter((admin) => admin._id !== _id));
        setModalText('Admin deleted successfully!');
        setShowModal(true);
      } else {
        throw new Error('Error deleting admin');
      }
    } catch (error) {
      setModalText('Error deleting admin: ' + error);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.titleAdmins}>SuperAdmin</h2>
        <Link to="/super-admins/form">
          <Button type="add" resource="superAdmin" />
        </Link>
        <SharedTable data={admin} editLink={'super-admins/form/'} handleDelete={deleteItem} />
      </section>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default AdminsPage;

import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import { Link } from 'react-router-dom';
import { Button, SharedTable, ModalAlert } from '../Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmins } from '../../redux/superadmins/thunks';

const SuperAdminsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const { list, isLoading } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuperAdmins());
    dispatch(deleteSuperAdmins());
  }, []);

  const deleteItem = (_id) => {
    dispatch(deleteSuperAdmins(_id, setModalText));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.titleAdmins}>SuperAdmins</h2>
        <Link to="/super-admins/form">
          <Button type="add" resource="superAdmin" />
        </Link>
        {isLoading ? (
          <div>Is loading</div>
        ) : (
          <SharedTable data={list} editLink={'super-admins/form/'} handleDelete={deleteItem} />
        )}
      </section>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default SuperAdminsPage;

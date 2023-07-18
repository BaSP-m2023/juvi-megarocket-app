import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import { Link } from 'react-router-dom';
import { ModalAlert } from '../Shared';
import Button from 'Components/Shared/Button';
import SharedTable from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmins } from '../../redux/superadmins/thunks';
const SuperAdminsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const { list, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);
  const deleteItem = (_id) => {
    dispatch(deleteSuperAdmins(_id, setModalText, setShowModal));
  };
  const closeModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <section className={styles.container}>
        <div className={styles.titleSuperAdmins}>
          <h2>Super Admins</h2>
          <Link to="/super-admins/form">
            <Button type="add" resource="Super Admin" />
          </Link>
        </div>
        {isLoading ? (
          <div>Is loading</div>
        ) : (
          <SharedTable
            data={list}
            editLink={'super-admins/admin/form/'}
            handleDelete={deleteItem}
          />
        )}
      </section>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};
export default SuperAdminsPage;

import React, { useState } from 'react';
import styles from './table.module.css';
import { Link } from 'react-router-dom';
import Button from '../../Shared/Button';
import ModalConfirm from '../../Shared/ModalConfirm';

const Table = (props) => {
  const [modalMessage, setModalMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirm = (id) => {
    props.deleteAdmin(id);
  };
  const cancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <table className={styles.adminsTable}>
        <thead>
          <tr>
            <th className={styles.thAdmins}>Name</th>
            <th className={styles.thAdmins}>Email</th>
            <th className={styles.thAdmins}>DNI</th>
            <th className={styles.thAdmins}>Phone</th>
            <th className={styles.thAdmins}>City</th>
            <th className={styles.thAdmins}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((admin) => (
            <tr key={admin._id}>
              <td className={styles.tdAdmins}>{admin.firstName + ' ' + admin.lastName}</td>
              <td className={styles.tdAdmins}>{admin.email}</td>
              <td className={styles.tdAdmins}>{admin.dni}</td>
              <td className={styles.tdAdmins}>{admin.phone}</td>
              <td className={styles.tdAdmins}>{admin.city}</td>
              <td className={styles.tdAdmins}>
                <Button
                  type="delete"
                  onClick={() => {
                    setIsModalOpen(true);
                    setModalMessage({
                      message: 'Are you sure you want to delete this item?',
                      title: 'Delete Admin'
                    });
                  }}
                >
                  Delete
                </Button>
                <Link to={`/admins/AdminForm/${admin._id}`}>
                  <Button type="edit">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && modalMessage && (
        <ModalConfirm
          onConfirm={confirm}
          onCancel={cancel}
          message={modalMessage.message}
          title={modalMessage.title}
        />
      )}
    </>
  );
};

export default Table;

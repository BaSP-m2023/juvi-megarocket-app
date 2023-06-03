import React from 'react';
import styles from './table.module.css';
import { Link } from 'react-router-dom';

const Table = (props) => {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      props.deleteAdmin(id);
    }
  };

  return (
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
              <button className={styles.deleteButton} onClick={() => handleDelete(admin._id)}>
                Delete
              </button>
              <Link to={`/admins/form/${admin._id}`}>
                <button className={styles.editButton}>Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

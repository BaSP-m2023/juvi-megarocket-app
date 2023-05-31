import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteAdmin, editAdmin }) => {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      deleteAdmin(id);
    }
  };

  return (
    <table className={styles.adminsTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>DNI</th>
          <th>Phone</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((admin) => (
          <tr key={admin._id}>
            <td>{admin.firstName + ' ' + admin.lastName}</td>
            <td>{admin.email}</td>
            <td>{admin.dni}</td>
            <td>{admin.phone}</td>
            <td>{admin.city}</td>
            <td>
              <button className={styles.deleteButton} onClick={() => handleDelete(admin._id)}>
                Delete
              </button>
              <button className={styles.editButton} onClick={() => editAdmin(admin)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

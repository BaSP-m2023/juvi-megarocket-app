import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteItem, editActivity }) => {
  const handleEdit = (activity) => {
    editActivity(activity);
  };

  return (
    <table className={styles.tableActivities}>
      <thead>
        <tr className={styles.trTable}>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td className={styles.tdTable}>{item.name}</td>
              <td className={styles.tdTable}>{item.description}</td>
              <td className={styles.tdTable}>
                <button className={styles.deleteButton} onClick={() => deleteItem(item._id)}>
                  X
                </button>
                <button className={styles.buttonEdit} onClick={() => handleEdit(item)}>
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

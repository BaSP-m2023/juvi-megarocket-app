import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteItem, editActivity }) => {
  const handleEdit = (activity) => {
    editActivity(activity);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => deleteItem(item._id)}>
                  X
                </button>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

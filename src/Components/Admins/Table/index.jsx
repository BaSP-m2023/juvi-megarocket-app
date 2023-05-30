import React from 'react';
import styles from './table.module.css';

const Table = (props) => {
  return (
    <table className="adminsTable">
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.adminsData.map((item) => {
          <tr key={item.id}>
            <td> {item.name} </td>
            <td> {item.email} </td>
            <td>
              <button className={styles.deleteButton} onClick={() => props.deleteItem(item.id)}>
                X
              </button>
              <button className={styles.editButton}>Edit</button>
            </td>
          </tr>;
        })}
      </tbody>
    </table>
  );
};

export default Table;

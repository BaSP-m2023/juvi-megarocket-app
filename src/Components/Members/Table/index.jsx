import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteMemb, setShowUpdMember, showUpdMember, setSelectId }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Dni</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
          <th>Birthdate</th>
          <th>Zip</th>
          <th>Is active?</th>
          <th>Membership type</th>
          <th>Tools</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.dni}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.city}</td>
              <td>{item.birthDate}</td>
              <td>{item.postalCode}</td>
              <td>{item.isActive}</td>
              <td>{item.memberships}</td>
              <td>
                <button
                  onClick={() => {
                    setShowUpdMember(!showUpdMember);
                    setSelectId(item._id);
                  }}
                >
                  M
                </button>
                <button className={styles.deleteButton} onClick={() => deleteMemb(item._id)}>
                  X
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

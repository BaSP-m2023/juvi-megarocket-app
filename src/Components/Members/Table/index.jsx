import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteMemb, setUpd, showUpd, setSelectId }) => {
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
        {data.map((i) => {
          return (
            <tr key={i._id}>
              <td>{i.firstName}</td>
              <td>{i.lastName}</td>
              <td>{i.dni}</td>
              <td>{i.phone}</td>
              <td>{i.email}</td>
              <td>{i.city}</td>
              <td>{i.birthDate}</td>
              <td>{i.postalCode}</td>
              <td>{i.isActive}</td>
              <td>{i.memberships}</td>
              <td>
                <button
                  onClick={() => {
                    setUpd(!showUpd);
                    setSelectId(i._id);
                  }}
                >
                  M
                </button>
                <button className={styles.deleteButton} onClick={() => deleteMemb(i._id)}>
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

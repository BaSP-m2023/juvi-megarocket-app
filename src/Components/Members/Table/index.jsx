import React from 'react';
// import styles from './table.module.css';

const Table = ({ data }) => {
  return (
    <table>
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

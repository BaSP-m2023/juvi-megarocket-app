import React from 'react';
import styles from './table.module.css';
import Button from '../../Shared/Button';

const Table = ({ data, deleteMemb, setShowAddMember, showAddMember, setSelectId, setTexts }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.trTrainers}>
          <th className={styles.thTrainers}>Name</th>
          <th className={styles.thTrainers}>Last Name</th>
          <th className={styles.thTrainers}>Dni</th>
          <th className={styles.thTrainers}>Phone</th>
          <th className={styles.thTrainers}>Email</th>
          <th className={styles.thTrainers}>City</th>
          <th className={styles.thTrainers}>Birthdate</th>
          <th className={styles.thTrainers}>Zip</th>
          <th className={styles.thTrainers}>Is active?</th>
          <th className={styles.thTrainers}>Membership type</th>
          <th className={styles.thTrainers}>Tools</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr className={styles.trTrainers} key={item._id}>
              <td className={styles.tdTrainers}>{item.firstName}</td>
              <td className={styles.tdTrainers}>{item.lastName}</td>
              <td className={styles.tdTrainers}>{item.dni}</td>
              <td className={styles.tdTrainers}>{item.phone}</td>
              <td className={styles.tdTrainers}>{item.email}</td>
              <td className={styles.tdTrainers}>{item.city}</td>
              <td className={styles.tdTrainers}>{item.birthDate}</td>
              <td className={styles.tdTrainers}>{item.postalCode}</td>
              <td className={styles.tdTrainers}>{item.isActive}</td>
              <td className={styles.tdTrainers}>{item.memberships}</td>
              <td className={styles.tdTrainers}>
                <Button
                  type="modify"
                  clickAction={() => {
                    setTexts('Modify member');
                    setShowAddMember(!showAddMember);
                    setSelectId(item._id);
                  }}
                />
                <Button type="delete" clickAction={() => deleteMemb(item._id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

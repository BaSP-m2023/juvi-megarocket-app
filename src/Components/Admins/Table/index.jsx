import styles from './table.module.css';
import { Link } from 'react-router-dom';
import Button from '../../Shared/Button';

const Table = (props) => {
  const confirm = (id) => {
    props.deleteAdmin(id);
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
              <Button
                type="delete"
                onClick={() => {
                  confirm(admin._id);
                }}
              ></Button>
              <Link to={`/admins/AdminForm/${admin._id}`}>
                <Button type="edit">Edit</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

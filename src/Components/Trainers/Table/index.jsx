import styles from './table.module.css';

const handleDelete = async (id, firstName, lastName) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 200) {
    alert(`The trainer named:${lastName} ${firstName} was eliminated successfully`);
  } else {
    alert(`ERROR`);
  }
};

const Table = (props) => {
  if (!props.data || props.data.length === 0) {
    return <p>There are no elements to show.</p>;
  }

  const editButton = (id) => {
    props.edit(id);
  };

  return (
    <section className={styles.classContainer}>
      <h1>Trainers</h1>
      <table className={styles.tableTrainers}>
        <thead>
          <tr>
            <th className={styles.thTrainers}>Name</th>
            <th className={styles.thTrainers}>City</th>
            <th className={styles.thTrainers}>Dni</th>
            <th className={styles.thTrainers}>Email</th>
            <th className={styles.thTrainers}>Active state</th>
            <th className={styles.thTrainers}>Phone</th>
            <th className={styles.thTrainers}>Salary</th>
            <th className={styles.thTrainers}>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => (
            <tr key={item._id}>
              <td className={styles.tdTrainers}>{item.lastName + ' ' + item.firstName}</td>
              <td className={styles.tdTrainers}>{item.city}</td>
              <td className={styles.tdTrainers}>{item.dni}</td>
              <td className={styles.tdTrainers}>{item.email}</td>
              <td className={styles.tdTrainers}>{item.isActive ? 'Active' : 'Inactive'}</td>
              <td className={styles.tdTrainers}>{item.phone}</td>
              <td className={styles.tdTrainers}>{item.salary}</td>
              <td className={styles.tdTrainers}>
                <button
                  style={{ backgroundColor: 'black' }}
                  onClick={() => editButton(item._id)}
                  className={styles.Button}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.firstName, item.lastName)}
                  className={styles.Button}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;

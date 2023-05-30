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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Dni</th>
            <th>Email</th>
            <th>Active state</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => (
            <tr key={item._id}>
              <td>{item.lastName + ' ' + item.firstName}</td>
              <td>{item.city}</td>
              <td>{item.dni}</td>
              <td>{item.email}</td>
              <td>{item.isActive ? 'Active' : 'Inactive'}</td>
              <td>{item.phone}</td>
              <td>{item.salary}</td>
              <td>
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

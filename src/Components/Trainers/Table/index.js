import styles from './table.module.css';

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>There are no elements to show.</p>;
  }
  console.log(data);

  const handleDelete = (id) => {
    console.log(`Deleting item with ID: ${id}`);
  };

  return (
    <section className={styles.classContainer}>
      <h1>Trainers</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
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
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.lastName + ' ' + item.firstName}</td>
              <td>{item.city}</td>
              <td>{item.dni}</td>
              <td>{item.email}</td>
              <td>{item.isActive ? 'Active' : 'Inactive'}</td>
              <td>{item.phone}</td>
              <td>{item.salary}</td>
              <td>
                <button onClick={() => handleDelete(item._id)} className={styles.deleteButton}>
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

import styles from './table.module.css';

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>LOADING...There are no elements to show.</p>;
  }

  const handleAdd = () => {
    console.log('Add');
  };

  const handleEdit = (id) => {
    console.log('Edit', id);
  };

  const handleDelete = (id) => {
    console.log('Delete', id);
  };

  return (
    <section className={styles.classContainer}>
      <h1>Subscriptions</h1>
      <button className={styles.button} onClick={handleAdd}>
        Add New Subscription
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DAY</th>
            <th>HOUR</th>
            <th>TRAINER</th>
            <th>ACTIVITY</th>
            <th>DATE</th>
            <th>MEMBERS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.classes.day}</td>
              <td>{item.classes.hour}</td>
              <td>{item.classes.trainer}</td>
              <td>{item.classes.activity}</td>
              <td>{item.date.substring(0, 10)}</td>
              <td>
                {item.members.map((member) => (
                  <div key={member._id}>{member.firstName + ' ' + member.lastName}</div>
                ))}
              </td>
              <td>
                <button className={styles.button} onClick={() => handleEdit(item._id)}>
                  Edit
                </button>
                <button className={styles.buttonDelete} onClick={() => handleDelete(item._id)}>
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

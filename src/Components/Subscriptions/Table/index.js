import styles from './table.module.css';

const Table = ({ data }) => {
  console.log(data);

  if (!data || data.length === 0) {
    return <p>There are no elements to show.</p>;
  }

  return (
    <section className={styles.classContainer}>
      <h1>Subscriptions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DAY</th>
            <th>HOUR</th>
            <th>TRAINER</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.classes.day}</td>
              <td>{item.classes.hour}</td>
              <td>{item.classes.trainer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;

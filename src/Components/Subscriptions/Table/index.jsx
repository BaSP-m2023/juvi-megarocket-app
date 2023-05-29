import { useState } from 'react';
import styles from './table.module.css';

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>LOADING...There are no elements to show.</p>;
  }

  const [editingItemId, setEditingItemId] = useState(null);

  const handleAdd = () => {
    alert('New subscription successfully added.');
    const requestData = {
      classes: '646bb9576a1d04d630b3e4b6',
      members: ['646014b31c70e12b863ad70a', '646015ffa877f6e5fb0e5de2'],
      date: '2023-05-15T14:57:14.000Z'
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEdit = (id) => {
    console.log('Edit', id);
    setEditingItemId(id);
  };

  const handleSave = (id) => {
    console.log('Save', id);
    setEditingItemId(null);
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleDelete = (id) => {
    alert('subscription ' + id + ' removed successfully');
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
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
              <td>{item.classes && item.classes.day}</td>
              <td>{item.classes && item.classes.hour}</td>
              <td>{item.classes && item.classes.trainer}</td>
              <td>{item.classes && item.classes.activity}</td>
              <td>{item.date && item.date.substring(0, 10)}</td>
              <td>
                {item.members &&
                  item.members.map((member) => (
                    <div key={member._id}>
                      {member.firstName &&
                        member.lastName &&
                        member.firstName + ' ' + member.lastName}
                    </div>
                  ))}
              </td>
              <td>
                {editingItemId === item._id ? (
                  <button className={styles.button} onClick={() => handleSave(item._id)}>
                    Save
                  </button>
                ) : (
                  <>
                    <button className={styles.button} onClick={() => handleEdit(item._id)}>
                      Edit
                    </button>
                    <button className={styles.buttonDelete} onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;

import React, { useState } from 'react';
import styles from './table.module.css';

const Table = ({ data, onButtonClick }) => {
  if (!data || data.length === 0) {
    return <p>LOADING...There are no elements to show.</p>;
  }

  const [user, setUser] = useState({
    idMember: '646015ffa877f6e5fb0e5de2',
    date: new Date().toISOString(),
    idClass: '64750dd551aa0de8c834eb3f'
  });
  const [expandedRows, setExpandedRows] = useState([]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === 'editMember') {
      setUser({
        ...user,
        idMember: value
      });
    } else if (name === 'date') {
      const dateValue = new Date(value).toISOString();
      setUser({
        ...user,
        date: dateValue
      });
    }
  };

  const handleClick = () => {
    onButtonClick();
  };

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
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleDelete = (id) => {
    alert('Subscription ' + id + ' removed successfully');
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handlePut = (id) => {
    const requestData = {
      members: [user.idMember],
      date: user.date
    };

    setUser({
      ...user,
      idMember: requestData.members[0],
      date: requestData.date
    });

    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
        alert('Info successfully sent.');
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEdit = (id) => {
    const expandedRowsCopy = [...expandedRows];
    if (expandedRowsCopy.includes(id)) {
      expandedRowsCopy.splice(expandedRowsCopy.indexOf(id), 1);
    } else {
      expandedRowsCopy.push(id);
    }
    setExpandedRows(expandedRowsCopy);
  };

  return (
    <section className={styles.classContainer}>
      <h1>Subscriptions</h1>
      <div>
        <button className={styles.button} onClick={handleClick}>
          New manual subscription
        </button>
      </div>
      <button className={styles.button} onClick={handleAdd}>
        New automatic subscription (for testing)
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item._id}>
              <tr>
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
                  <button className={styles.button} onClick={() => handleEdit(item._id)}>
                    Edit
                  </button>
                  <button className={styles.buttonDelete} onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
              {expandedRows.includes(item._id) && (
                <tr>
                  <td colSpan="8">
                    <select
                      className={styles.selectEdit}
                      name="editMember"
                      value={user.idMember}
                      onChange={onChangeInput}
                    >
                      <option value="646014b31c70e12b863ad70a">Juan Manuel Lopez</option>
                      <option value="646015ffa877f6e5fb0e5de2">Ariana Lopez</option>
                      <option value="64601701a877f6e5fb0e5de5">Carla Lopez</option>
                    </select>
                    <input
                      className={styles.inputEdit}
                      name="date"
                      type="datetime-local"
                      value={user.date.slice(0, -5)}
                      onChange={onChangeInput}
                    />
                    <button className={styles.buttonSave} onClick={() => handlePut(item._id)}>
                      Save
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;

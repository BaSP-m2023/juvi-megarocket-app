import React, { useState } from 'react';
import styles from './table.module.css';

const Table = ({ data, members, onButtonClick }) => {
  if (!data || data.length === 0) {
    return <p>LOADING...There are no elements to show.</p>;
  }

  const [user, setUser] = useState({
    idMember: '',
    date: new Date().toISOString(),
    idClass: ''
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DAY</th>
            <th>HOUR</th>
            <th>TRAINER</th>
            <th>CLASS</th>
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
                      <option value="">Choose Member</option>
                      {members.map((member) => (
                        <option key={member._id} value={member._id}>
                          {member.firstName} {member.lastName}
                        </option>
                      ))}
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

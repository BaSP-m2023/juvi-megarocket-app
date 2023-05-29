import React, { useState } from 'react';
import styles from './table.module.css';

const Table = (props) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const handleEdit = (classEditing) => {
    props.handleEdit(classEditing);
  };

  const handleCancel = () => {
    setSelectedClass(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      props.handleDelete(id);
    }
  };

  return (
    <table className={styles.tableClass}>
      <thead>
        <tr className={styles.classes}>
          <th>Activity</th>
          <th>Trainer</th>
          <th>Day</th>
          <th>Hour</th>
          <th>Slot</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tableInfo}>
        {props.dataClasses.map((classMap) => (
          <tr className={styles.classes} key={classMap._id}>
            <td>{classMap.activity.name}</td>
            <td>{classMap.trainer.firstName}</td>
            <td>{classMap.day}</td>
            <td>{classMap.hour}</td>
            <td>{classMap.slots}</td>
            <td>
              {selectedClass && selectedClass._id === classMap._id ? (
                <>
                  <button onClick={() => props.handleUpdate(selectedClass)}>Update</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button className={styles.btnGeneralEdit} onClick={() => handleEdit(classMap)}>
                    Edit
                  </button>
                  <button
                    className={styles.btnGeneralDelete}
                    onClick={() => handleDelete(classMap._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

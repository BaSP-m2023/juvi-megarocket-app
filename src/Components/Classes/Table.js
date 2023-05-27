import React, { useState } from 'react';
import styles from './table.module.css';

const Table = (props) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const handleEdit = (clase) => {
    props.handleEdit(clase);
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
    <table>
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
      <tbody>
        {props.classesData.map((clase) => (
          <tr className={styles.classes} key={clase._id}>
            <td>{clase.activity.name}</td>
            <td>{clase.trainer.firstName}</td>
            <td>{clase.day}</td>
            <td>{clase.hour}</td>
            <td>{clase.slots}</td>
            <td>
              {selectedClass && selectedClass._id === clase._id ? (
                <>
                  <button onClick={() => props.handleUpdate(selectedClass)}>Update</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(clase)}>Edit</button>
                  <button onClick={() => handleDelete(clase._id)}>Delete</button>
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

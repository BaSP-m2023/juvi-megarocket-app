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
          <th className={styles.thClasses}>Activity</th>
          <th className={styles.thClasses}>Trainer</th>
          <th className={styles.thClasses}>Day</th>
          <th className={styles.thClasses}>Hour</th>
          <th className={styles.thClasses}>Slot</th>
          <th className={styles.thClasses}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tableInfo}>
        {props.dataClasses.map((classMap) => (
          <tr className={styles.classes} key={classMap._id}>
            <td className={styles.tdClasses}>{classMap.activity.name}</td>
            <td className={styles.tdClasses}>{classMap.trainer.firstName}</td>
            <td className={styles.tdClasses}>{classMap.day}</td>
            <td className={styles.tdClasses}>{classMap.hour}</td>
            <td className={styles.tdClasses}>{classMap.slots}</td>
            <td className={styles.tdClasses}>
              {selectedClass && selectedClass._id === classMap._id ? (
                <>
                  <button
                    className={styles.buttonClasses}
                    onClick={() => props.handleUpdate(selectedClass)}
                  >
                    Update
                  </button>
                  <button className={styles.buttonClasses} onClick={handleCancel}>
                    Cancel
                  </button>
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

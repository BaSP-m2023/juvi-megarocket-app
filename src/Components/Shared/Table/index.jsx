import React from 'react';
import styles from './table.module.css';
import { Link } from 'react-router-dom';

const Table = (props) => {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      props.handleDelete(id);
    }
  };
  if (!props.data || props.data.length === 0) {
    return <div>No data available</div>;
  }
  const excludedProperties = ['_id', 'isActive', '__v'];
  const propertyNames = Object.keys(props.data[0]).filter(
    (propertyName) => !excludedProperties.includes(propertyName)
  );

  const renderCellValue = (value) => {
    if (typeof value === 'object') {
      if (value.name) {
        return value.name;
      }
      if (value.firstName) {
        return value.firstName;
      }
      return value._id;
    } else {
      return value;
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {propertyNames.map((propertyName) => (
            <th key={propertyName}>{propertyName}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr key={index}>
            {propertyNames.map((propertyName) => (
              <td key={propertyName}>{renderCellValue(item[propertyName])}</td>
            ))}
            <td>
              <Link to={props.editLink + item._id}>
                <button>Edit</button>
              </Link>
              <button className={styles.btnGeneralDelete} onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

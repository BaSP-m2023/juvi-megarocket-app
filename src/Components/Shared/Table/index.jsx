import React from 'react';
import styles from './table.module.css';
import Button from '../Button';
import { Link } from 'react-router-dom';

const Table = ({ data, handleDelete, editLink }) => {
  const handleDeleteTable = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      handleDelete(id);
    }
  };
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  const excludedProperties = ['_id', 'isActive', '__v'];
  const propertyNames = Object.keys(data[0]).filter(
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {propertyNames.map((propertyName) => (
              <td key={propertyName}>{renderCellValue(item[propertyName])}</td>
            ))}
            <td>
              <Link to={editLink + item._id}>
                <Button type="edit" />
              </Link>
              <Button type="delete" onClick={() => handleDeleteTable(item._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

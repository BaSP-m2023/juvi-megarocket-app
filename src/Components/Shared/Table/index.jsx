import React from 'react';
import styles from './table.module.css';
const Table = (props) => {
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
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr key={index}>
            {propertyNames.map((propertyName) => (
              <td key={propertyName}>{renderCellValue(item[propertyName])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

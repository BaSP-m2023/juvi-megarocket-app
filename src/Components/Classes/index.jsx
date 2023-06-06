import styles from './classes.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ModalAlert, SharedTable, Button } from '../Shared';

const Classes = () => {
  const [classesData, setClassData] = useState([]);

  useEffect(() => {
    getDataClasses();
  }, []);

  const getDataClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`);
      const jsonData = await response.json();
      const classData = jsonData.data;
      setClassData(classData);
    } catch (error) {
      ModalAlert(error);
    }
  };

  const deleteClass = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setClassData(classesData.filter((itemClass) => itemClass.id !== id));
        ModalAlert(response.message);
      } else {
        throw new Error('Error deleting Class.');
      }
    } catch (error) {
      ModalAlert(error);
    }
  };

  return (
    <section className={styles.containerClass}>
      <Link to="/classes/form">
        <Button type="add" resource="Class"></Button>
      </Link>
      <SharedTable data={classesData} editLink={'classes/form/'} handleDelete={deleteClass} />
    </section>
  );
};

export default Classes;

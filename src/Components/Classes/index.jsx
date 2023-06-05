import styles from './newclasses.module.css';
import Table from './Table';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      alert('Error getting Classes.');
    }
  };

  const deleteClass = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setClassData(classesData.filter((itemClass) => itemClass.id !== id));
        alert('Class deleted correctly!');
      } else {
        throw new Error('Error deleting Class.');
      }
    } catch (error) {
      alert('Error deleting Class: ' + error);
    }
  };

  return (
    <section className={styles.containerClass}>
      <h2>Classes</h2>
      <Link to="./Form">Add Class</Link>
      <Table data={classesData} deleteClass={deleteClass} />
    </section>
  );
};

export default Classes;

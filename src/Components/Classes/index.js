import styles from './classes.module.css';
import Table from './Table';
import ClassForm from './ClassForm';
import { useEffect, useState } from 'react';

function Projects() {
  const [classesData, setClassesData] = useState([]);
  const [editedClass, setEditedClass] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/class`);
      const jsonData = await response.json();
      const classData = jsonData.data;
      setClassesData(classData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (updatedClass, classId) => {
    console.log(updatedClass);
    fetch(`${process.env.REACT_APP_API_URL}/class/${classId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedClass)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getData();
        handleCancel();
        setEditedClass(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/class/${id}`, {
        method: 'DELETE'
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (clase) => {
    setIsEditing(true);
    setEditedClass(clase);
  };
  const handleCancel = () => {
    setEditedClass(null);
    setIsEditing(false);
  };

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      {isEditing && editedClass ? (
        <ClassForm
          classData={editedClass}
          handleUpdate={handleUpdate}
          handleCancel={() => setEditedClass(null)}
        />
      ) : (
        <Table classesData={classesData} handleDelete={handleDelete} handleEdit={handleEdit} />
      )}
    </section>
  );
}

export default Projects;

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`);
      const jsonData = await response.json();
      const classData = jsonData.data;
      setClassesData(classData);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdate = (updatedClass, classId) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/class/${classId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedClass)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error === true) {
          alert(data.message);
        } else {
          alert(data.message);
          getData();
          handleCancel();
        }
      })
      .catch((error) => alert(error));
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error === true) {
            alert(data.message);
          } else alert(data.message);
        });
      getData();
    } catch (error) {
      alert(error);
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
      <button>New Class</button>
      {classesData ? (
        isEditing && editedClass ? (
          <ClassForm
            classData={editedClass}
            handleUpdate={handleUpdate}
            handleCancel={() => setEditedClass(null)}
          />
        ) : (
          <Table classesData={classesData} handleDelete={handleDelete} handleEdit={handleEdit} />
        )
      ) : (
        <h3>There are no classes to show</h3>
      )}
    </section>
  );
}

export default Projects;

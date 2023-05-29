import styles from './classes.module.css';
import Table from './Table';
import ClassForm from './ClassForm';
import { useEffect, useState } from 'react';
import ClassFormCreate from './form/ClassFormCreate';

function Projects() {
  const [dataClasses, setDataClasses] = useState([]);
  const [dataTrainers, setTrainers] = useState([]);
  const [dataActivity, setActivity] = useState([]);

  const [editedClass, setEditedClass] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const changeState = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    getData();
    getTrainers();
    getActivities();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`);
      const jsonData = await response.json();
      const classData = jsonData.data;
      setDataClasses(classData);
    } catch (error) {
      alert(error);
    }
  };

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const jsonData = await response.json();
      const trainerData = jsonData.data;
      setTrainers(trainerData);
    } catch (error) {
      alert(error);
    }
  };

  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
      const jsonData = await response.json();
      const activityData = jsonData.data;
      setActivity(activityData);
    } catch (error) {
      alert(error);
    }
  };

  const addClass = (formData) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/class/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setDataClasses([
            ...dataClasses,
            {
              _id: data.data._id,
              activity: data.activity.name,
              trainer: data.trainer.firstNAme,
              day: data.data.day,
              hour: data.data.hour,
              slots: data.data.slots
            }
          ]);
          alert(data.message);
          changeState();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

  const handleEdit = (classEditing) => {
    setIsEditing(true);
    setEditedClass(classEditing);
  };
  const handleCancel = () => {
    setEditedClass(null);
    setIsEditing(false);
  };
  return (
    <section className={styles.container}>
      <div className={styles.mainClass}>
        <h2>Classes</h2>
        <button className={styles.btnClass} onClick={changeState}>
          Add Class
        </button>
      </div>
      {dataClasses ? (
        isEditing && editedClass ? (
          <ClassForm
            classData={editedClass}
            handleUpdate={handleUpdate}
            handleCancel={() => setEditedClass(null)}
            trainersData={dataTrainers}
            activitiesData={dataActivity}
          />
        ) : (
          <Table dataClasses={dataClasses} handleDelete={handleDelete} handleEdit={handleEdit} />
        )
      ) : (
        <h3>There are no classes to show</h3>
      )}
      {
        <ClassFormCreate
          dataActivity={dataActivity}
          dataTrainers={dataTrainers}
          showForm={showForm}
          addClass={addClass}
          changeState={changeState}
        />
      }
    </section>
  );
}

export default Projects;

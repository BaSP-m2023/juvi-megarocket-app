import styles from './classes.module.css';
import Table from './Table';
import ClassForm from './ClassForm';
import { useEffect, useState } from 'react';
import ClassFormCreate from './form/ClassFormCreate';

function Projects() {
  const [classesData, setClassesData] = useState([]);
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
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/class`);
      const classData = await response.json();
      const resTrainers = await fetch(`${process.env.REACT_APP_API_URL}api/trainer`);
      const dataTrainers = await resTrainers.json();
      const resActivity = await fetch(`${process.env.REACT_APP_API_URL}api/activity`);
      const dataActivity = await resActivity.json();
      setTrainers(dataTrainers.data);
      setActivity(dataActivity.data);
      setClassesData(classData.data);
    } catch (error) {
      alert(error);
    }
  };

  const addClass = (formData) => {
    console.log(formData);
    fetch(`${process.env.REACT_APP_API_URL}api/class/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          const trainer = dataTrainers.find((trainer) => {
            if (trainer._id === data.data.trainer) {
              return trainer.firstName;
            }
          });
          const activity = dataActivity.find((activity) => {
            if (activity._id === data.data.activity) {
              return activity.name;
            }
          });
          setClassesData([
            ...classesData,
            {
              _id: data.data._id,
              activity: activity,
              trainer: trainer,
              day: data.data.day,
              hour: data.data.hour,
              slots: data.data.slots
            }
          ]);
        }
        alert(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (updatedClass, classId) => {
    fetch(`${process.env.REACT_APP_API_URL}api/class/${classId}`, {
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
      await fetch(`${process.env.REACT_APP_API_URL}api/class/${id}`, {
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
      <div className={styles.mainClass}>
        <h2>Classes</h2>
        <button className={styles.btnClass} onClick={changeState}>
          Add Class
        </button>
      </div>
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

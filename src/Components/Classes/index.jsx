import styles from './classes.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SharedTable, Button } from '../Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../../redux/classes/thunks';

const Classes = () => {
  const [classesData, setClassData] = useState([]);

  const { list, item, isLoading, error } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  console.log(item);
  console.log(isLoading);
  console.log(error);

  useEffect(() => {
    dispatch(getClasses());
  }, []);

  const deleteClass = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setClassData(classesData.filter((itemClass) => itemClass.id !== id));
      } else {
        throw new Error('Error deleting Class.');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={styles.containerClass}>
      <Link to="/classes/form">
        <Button type="add" resource="Class"></Button>
      </Link>
      {isLoading ? (
        <div>Is Loading</div>
      ) : (
        <SharedTable data={list} editLink={'classes/form/'} handleDelete={deleteClass} />
      )}
    </section>
  );
};

export default Classes;

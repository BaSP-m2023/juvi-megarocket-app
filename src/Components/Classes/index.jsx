import styles from './classes.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SharedTable, Button } from '../Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, deleteClass } from '../../redux/classes/thunks';

const Classes = () => {
  const { list, item, isLoading, error } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  console.log(item);
  console.log(isLoading);
  console.log(error);
  console.log(useState);

  useEffect(() => {
    dispatch(getClasses());
  }, []);

  const deleteClasses = (_id) => {
    dispatch(deleteClass(_id));
  };
  return (
    <section className={styles.containerClass}>
      <Link to="/classes/form">
        <Button type="add" resource="Class"></Button>
      </Link>
      {isLoading ? (
        <div>Is Loading</div>
      ) : (
        <SharedTable data={list} editLink={'classes/form/'} handleDelete={deleteClasses} />
      )}
    </section>
  );
};

export default Classes;

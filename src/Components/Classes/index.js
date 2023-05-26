import { useState } from 'react';
import styles from './classes.module.css';
import { useEffect } from 'react';
import Table from './Table';

function Projects() {
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/class/`);
    const responseData = await response.json();
    const classesData = responseData.data;
    setClasses(classesData);
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <Table data={classes} />
    </section>
  );
}

export default Projects;

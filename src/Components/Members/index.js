import { useEffect, useState } from 'react';
import styles from './members.module.css';
//components imports
import Table from './Table/index';

function Members() {
  const [members, setMembers] = useState([]);

  const getMembs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await response.json();
    setMembers(data.data);
  };

  useEffect(() => {
    getMembs();
  });

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <Table data={members} />
    </section>
  );
}

export default Members;

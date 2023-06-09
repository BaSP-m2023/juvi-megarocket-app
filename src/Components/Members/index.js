import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './members.module.css';
// Shared
import { SharedTable, Button } from '../Shared';

function Members() {
  const [members, setMembers] = useState([]);

  const getMembs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await response.json();
    data.data.forEach((item) => {
      item.birthDate = item.birthDate.substring(0, 10);
    });
    setMembers(data.data);
  };

  useEffect(() => {
    getMembs();
  }, []);

  const deleteMemb = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, { method: 'DELETE' });
      setMembers(members.filter((member) => member._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className={styles.container}>
      <Link to="members/form">
        <Button type={'add'} resource={'Member'} />
      </Link>
      <SharedTable data={members} handleDelete={deleteMemb} editLink={'members/form/'} />
    </section>
  );
}

export default Members;

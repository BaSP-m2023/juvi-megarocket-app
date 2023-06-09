import { useEffect, useState } from 'react';
import styles from './members.module.css';
import { SharedTable, Button } from '../Shared';

function Members(props) {
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
      <Button
        type={'add'}
        resource={'Member'}
        onClick={() => props.history.push('/members/form')}
      />
      <SharedTable data={members} handleDelete={deleteMemb} editLink={'members/form/'} />
    </section>
  );
}

export default Members;

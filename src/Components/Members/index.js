import { useEffect, useState } from 'react';
import styles from './members.module.css';
//components imports
import Table from './Table/index';
import Form from './Form/index';

function Members() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [members, setMembers] = useState([]);

  const getMembs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await response.json();
    setMembers(data.data);
  };

  useEffect(() => {
    getMembs();
  });

  const addMember = ({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    birthDate,
    postalCode,
    isActive,
    membership
  }) => {
    const newMemb = {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDate,
      postalCode,
      isActive,
      membership
    };
    setMembers([...members, newMemb]);
  };

  const deleteMemb = (id) => {
    setMembers([...members.filter((member) => member._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <a className={styles.a} onClick={() => setShowAddMember(!showAddMember)}>
        + Add Member
      </a>
      {showAddMember && <Form addMember={addMember} data={members} showAdd={showAddMember} />}
      <Table data={members} delete={deleteMemb} />
    </section>
  );
}

export default Members;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './members.module.css';
import MemberForm from './MemberForm/index';
// Shared
import Button from '../Shared/Button';
import Table from '../Shared/Table';

function Members() {
  const [members, setMembers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectId, setSelectId] = useState('');
  const [buttonType, setButtonType] = useState('add');

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

  const addMember = async (member) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(member)
      });

      const newMemb = await response.json();

      if (!newMemb.error) {
        setMembers([...members, newMemb]);
        getMembs();
        alert(newMemb.message);
      } else {
        alert(newMemb.message);
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const deleteMemb = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, { method: 'DELETE' });
      setMembers(members.filter((member) => member._id !== id));
      alert('Member deleted!');
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const updateMemb = async (id, member) => {
    try {
      setSelectId(id);
      await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(member)
      }).then(async (response) => {
        const data = await response.json();
        if (!data.error) {
          alert(data.message);
          setMembers(
            members.map((member) =>
              member._id === id
                ? {
                    ...member,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dni: data.dni,
                    phone: data.phone,
                    email: data.email,
                    city: data.city,
                    birthDate: data.birthDate,
                    postalCode: data.postalCode,
                    memberships: data.memberships
                  }
                : member
            )
          );
          getMembs();
        } else {
          alert(data.message);
        }
      });
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <Link to="members/form">
        <Button type={buttonType} resource={'Member'} onClick={() => setButtonType('cancel')} />
      </Link>
      <Table data={members} handleDelete={deleteMemb} editLink={'members/form/'} />
      <Table data={members} handleDelete={deleteMemb} editLink={'members/form/'} />
      <MemberForm data={members} setMembers={setMembers} addMember={addMember} />
      <MemberForm data={members} updateMemb={updateMemb} selectId={selectId} />
    </section>
  );
}

export default Members;

import { useEffect, useState } from 'react';
import styles from './members.module.css';
import Table from './Table/index';
import MemberForm from './MemberForm/index';
// Shared
import Button from '../Shared/Button';

function Members() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectId, setSelectId] = useState('');
  const [texts, setTexts] = useState('');

  const getMembs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await response.json();
    data.data.forEach((item) => {
      item.birthDate = item.birthDate.substring(0, 10);
    });
    setMembers(data.data);
  };

  const hideForm = () => {
    setShowAddMember(false);
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
        hideForm();
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
          hideForm();
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
      {!showAddMember && (
        <Button
          text="Add member"
          clickAction={() => {
            setShowAddMember(!showAddMember);
            setTexts('Add member');
          }}
          disabled={false}
        />
      )}
      {showAddMember && (
        <MemberForm
          data={members}
          setMembers={setMembers}
          addMember={addMember}
          updateMemb={updateMemb}
          selectId={selectId}
          hideForm={hideForm}
          text={texts}
        />
      )}
      {!showAddMember && (
        <Table
          data={members}
          deleteMemb={deleteMemb}
          showAddMember={showAddMember}
          setShowAddMember={setShowAddMember}
          selectId={selectId}
          setSelectId={setSelectId}
          text={texts}
          setTexts={setTexts}
        />
      )}
    </section>
  );
}

export default Members;

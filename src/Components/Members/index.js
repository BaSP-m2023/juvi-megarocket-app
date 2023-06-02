import { useEffect, useState } from 'react';
import styles from './members.module.css';
import Table from './Table/index';
import AddForm from './AddForm/index';
import UpdateForm from './UpdateForm/index';

function Members() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showUpdMember, setShowUpdMember] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectId, setSelectId] = useState('');

  const getMembs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await response.json();
    data.data.forEach((item) => {
      item.birthDate = item.birthDate.substring(0, 10);
    });
    setMembers(data.data);
  };
  const hideForm = () => {
    setShowUpdMember(false);
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
      console.log(newMemb);

      if (!newMemb.error) {
        setMembers([...members, newMemb]);
        alert(newMemb.message);
        hideForm();
      } else {
        alert(newMemb.message);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const deleteMemb = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, { method: 'DELETE' });
      setMembers(members.filter((member) => member._id !== id));
      alert('Member deleted!');
    } catch (error) {
      alert(error);
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
          hideForm();
        } else {
          alert(data.message);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={styles.container}>
      <a className={styles.a} onClick={() => setShowAddMember(!showAddMember)}>
        + Add Member
      </a>
      {showAddMember && (
        <AddForm
          addMember={addMember}
          data={members}
          showAddMember={showAddMember}
          setAddMember={setShowAddMember}
          showUpdMember={showUpdMember}
          setShowUpdMember={setShowUpdMember}
          hideForm={hideForm}
        />
      )}
      {showUpdMember && (
        <UpdateForm
          updateMemb={updateMemb}
          setMembers={setMembers}
          data={members}
          showUpdMember={showUpdMember}
          selectId={selectId}
          hideForm={hideForm}
        />
      )}
      <Table
        data={members}
        deleteMemb={deleteMemb}
        showAddMember={showAddMember}
        setAddMember={setShowAddMember}
        showUpdMember={showUpdMember}
        setShowUpdMember={setShowUpdMember}
        selectId={selectId}
        setSelectId={setSelectId}
      />
    </section>
  );
}

export default Members;

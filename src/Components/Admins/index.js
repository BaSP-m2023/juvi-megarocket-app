import { useEffect, useState } from 'react';
import Table from './Table/index.jsx';
import styles from './admins.module.css';
import Form from './Form';

function Admins() {
  const [adminsData, setAdminsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const jsonData = await response.json();
      const adminData = jsonData.data;
      setAdminsData(adminData);
    } catch (error) {
      alert('Error getting Admins.');
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const addAdmin = async ({ firstName, lastName, dni, phone, email, city, password }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, dni, phone, email, city, password })
      });
      const responseData = await response.json();
      if (!responseData.error) {
        const newAdmin = responseData.data;
        setAdminsData([...adminsData, newAdmin]);
        setShowForm(false);
        alert('Admin created correctly!');
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setShowForm(true);
      console.log(error);
      alert('Error creating admin: ' + error);
    }
  };

  const editAdmin = async (updatedAdmin, adminId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAdmin)
      });
      const responseData = await response.json();
      if (response.ok) {
        const updatedAdminData = responseData.data;
        setAdminsData(
          adminsData.map((admin) => (admin._id === updatedAdminData._id ? updatedAdminData : admin))
        );
        setShowForm(false);
        alert('Admin updated correctly!');
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setShowForm(true);
      alert('Error updating Admin: ' + error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setAdminsData(adminsData.filter((admin) => admin.id !== id));
        alert('Admin deleted correctly!');
      } else {
        throw new Error('Error deleting Admin.');
      }
    } catch (error) {
      alert(`Error deleting Admin: ` + error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      {!showForm && (
        <button
          className={styles.addButton}
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
          }}
        >
          Add Admin
        </button>
      )}
      {showForm && (
        <Form
          addAdmin={addAdmin}
          editAdmin={editAdmin}
          setShowForm={setShowForm}
          selectedAdmin={selectedAdmin}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
      <Table
        data={adminsData}
        deleteAdmin={deleteAdmin}
        editAdmin={editAdmin}
        setShowForm={setShowForm}
        setSelectedAdmin={setSelectedAdmin}
        setIsEditing={setIsEditing}
      />
    </section>
  );
}

export default Admins;

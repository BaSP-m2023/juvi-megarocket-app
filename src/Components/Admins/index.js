import { useEffect, useState } from 'react';
import Table from './Table/index.jsx';
import styles from './admins.module.css';
import Form from './Form';

function Admins() {
  const [adminsData, setAdminsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const jsonData = await response.json();
      const adminData = jsonData.data;
      setAdminsData(adminData);
    } catch (error) {
      alert('Error getting Admins');
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
        setSelectedAdmin(null);
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
      const responseData = response.json();
      if (!responseData) {
        const adminData = await response.json();
        const updatedAdminData = adminData.data;
        setAdminsData(
          setAdminsData(
            adminsData.map((admin) =>
              admin._id === updatedAdminData._id ? updatedAdminData : admin
            )
          )
        );
        setShowForm(false);
        setSelectedAdmin(null);
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
        showForm();
      } else {
        throw new Error('Error deleting Admin.');
      }
    } catch {
      alert(`Admin with ID: ${id} was deleted correctly`);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      {!showForm && (
        <button className={styles.addButton} onClick={() => setShowForm(true)}>
          Add Admin
        </button>
      )}
      {showForm && (
        <Form
          addAdmin={addAdmin}
          editAdmin={editAdmin}
          selectedAdmin={selectedAdmin}
          setShowForm={setShowForm}
        />
      )}
      <Table data={adminsData} deleteAdmin={deleteAdmin} editAdmin={editAdmin} />
    </section>
  );
}

export default Admins;

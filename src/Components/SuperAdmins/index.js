import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from './Table/Index';
import Form from './Form/Index';

const SuperAdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/`);
      const responseData = await response.json();
      const data = responseData.data;
      setAdmins(data);
    } catch (error) {
      alert('Error fetching admins: ' + error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const addAdmin = async ({ email, password }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const responseData = await response.json();
        const newAdmin = responseData.data;
        setAdmins([...admins, newAdmin]);
        setShowForm(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      alert('Error creating admin: ' + error);
    }
  };

  const editAdmin = async (updatedAdmin, _id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAdmin)
      });
      const data = await response.json();

      if (data.error === true) {
        alert(data.message);
      } else if (data.error === false) {
        getAdmins();
        alert(data.message);
        setShowForm(false);
        setSelectedAdmin(null);
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  const deleteAdmin = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin/${_id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAdmins(admins.filter((admin) => admin._id !== _id));
        alert('Admin deleted successfully!');
      } else {
        throw new Error('Error: Admin cannot be deleted');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
    setSelectedAdmin(null);
  };

  return (
    <section className={styles.container}>
      <div className={styles.firstBox}>
        <h2>SuperAdmins</h2>
        {!showForm && <button onClick={() => setShowForm(true)}>Add Admin</button>}
      </div>
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <Form
              addAdmin={addAdmin}
              editAdmin={editAdmin}
              selectedAdmin={selectedAdmin}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
      <Table data={admins} deleteAdmin={deleteAdmin} editAdmin={handleEdit} />
    </section>
  );
};

export default SuperAdminsPage;

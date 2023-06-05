import { Button, SharedTable, ModalAlert } from '../Shared';
import Form from './Form/addForm';
import FormEdit from './Form/editForm';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    salary: ''
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/trainer/`)
      .then((response) => response.json())
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
        setIsAlertOpen(true);
        setAlertMessage(error.message);
      });
  }, []);

  const getEditId = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setFormData(data.data);
        }
      })
      .catch((error) => {
        setIsAlertOpen(true);
        setAlertMessage(error.message);
      });
  };
  const toggleFormAdd = () => {
    setIsFormOpen(!isFormOpen);
  };

  // eslint-disable-next-line no-unused-vars
  const toggleFormEdit = (id) => {
    setIsFormEditOpen(!isFormEditOpen);
    getEditId(id);
  };

  const toggleFormEditClose = () => {
    setIsFormEditOpen(!isFormEditOpen);
  };
  const handleDelete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      setIsAlertOpen(true);
      setAlertMessage('Trainer deleted');
    } else {
      setIsAlertOpen(true);
      setAlertMessage('Error deleting trainer');
    }
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <section>
      <Link to="/trainers/add">
        <Button type="add" resource="Trainer" onClick={toggleFormAdd} />
      </Link>
      <SharedTable
        data={trainers.data}
        editLink={'/trainers/edit/'}
        handleDelete={handleDelete}
      ></SharedTable>
      {isFormOpen && <Form />}
      {isFormEditOpen && (
        <FormEdit formData={formData} setFormData={setFormData} close={toggleFormEditClose} />
      )}
      {isAlertOpen && <ModalAlert text={alertMessage} onClick={closeAlert} />}
    </section>
  );
}

export default Trainers;

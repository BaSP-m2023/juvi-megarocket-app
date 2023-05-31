import Table from './Table';
import Button from './Button';
import Form from './Form/addForm';
import FormEdit from './Form/editForm';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/trainer/`)
      .then((response) => response.json())
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
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
        alert(error);
      });
  };
  const toggleFormAdd = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleFormEdit = (id) => {
    setIsFormEditOpen(!isFormEditOpen);
    getEditId(id);
  };

  const toggleFormEditClose = () => {
    setIsFormEditOpen(!isFormEditOpen);
  };

  return (
    <section>
      <Button color="black" text={isFormOpen ? 'Close' : 'Add'} onClick={toggleFormAdd} />
      <Table data={trainers.data ? trainers.data : []} edit={toggleFormEdit} />
      {isFormOpen && <Form />}
      {isFormEditOpen && (
        <FormEdit formData={formData} setFormData={setFormData} close={toggleFormEditClose} />
      )}
    </section>
  );
}

export default Trainers;

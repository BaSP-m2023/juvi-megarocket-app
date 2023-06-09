import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './form.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '../../Shared';

const Form = () => {
  const history = useHistory();
  const [initialFormData, setInitialFormData] = useState({});
  const [selectedTrainer, setSelectedTrainer] = useState({});
  const [formData, setFormData] = useState({
    firstName: selectedTrainer.firstName || '',
    lastName: selectedTrainer.lastName || '',
    dni: selectedTrainer.dni || '',
    phone: selectedTrainer.phone || '',
    email: selectedTrainer.email || '',
    city: selectedTrainer.city || '',
    password: selectedTrainer.password || '',
    salary: selectedTrainer.salary || ''
  });
  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedTrainer(data.data);
        setInitialFormData(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  useEffect(() => {
    setFormData({
      firstName: selectedTrainer.firstName || '',
      lastName: selectedTrainer.lastName || '',
      dni: selectedTrainer.dni || '',
      phone: selectedTrainer.phone || '',
      email: selectedTrainer.email || '',
      city: selectedTrainer.city || '',
      password: selectedTrainer.password || '',
      salary: selectedTrainer.salary || ''
    });
  }, [selectedTrainer]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    setFormData(initialFormData);
    history.push('/trainers');
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await editTrainer(formData);
  };
  const editTrainer = async (formData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dni: formData.dni,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        password: formData.password,
        salary: formData.salary
      })
    });
    if (response.status === 200) {
      alert(`The trainer named:${formData.lastName} ${formData.firstName} was edited successfully`);
      history.push('/trainers');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };
  return (
    <form className={styles.addTrainer} onSubmit={onSubmit}>
      <div className={styles.column}>
        <Input
          labelText={`First name`}
          type={'text'}
          name={`firstName`}
          value={formData.firstName}
          onChange={handleChange}
        ></Input>
        <Input
          labelText={`Last Name`}
          type={'text'}
          name={`lastName`}
          value={formData.lastName}
          onChange={handleChange}
        ></Input>
        <Input
          labelText={`City`}
          type={'text'}
          name={`city`}
          value={formData.city}
          onChange={handleChange}
        ></Input>
        <Input
          labelText={`Dni`}
          type={'text'}
          name={`dni`}
          value={formData.dni}
          onChange={handleChange}
        ></Input>
      </div>
      <div className={styles.column}>
        <Input
          labelText={`Email`}
          type={'text'}
          name={`email`}
          value={formData.email}
          onChange={handleChange}
        ></Input>
        <Input
          labelText={`Phone`}
          type={'text'}
          name={`phone`}
          value={formData.phone}
          onChange={handleChange}
        ></Input>
        <Input
          labelText={`Salary`}
          type={'text'}
          name={`salary`}
          value={formData.salary}
          onChange={handleChange}
        ></Input>
        <Input
          labelText={`Password`}
          type={'password'}
          name={`password`}
          value={formData.password}
          onChange={handleChange}
        ></Input>
      </div>
      <Input type={'submit'} value={'Edit trainer'}></Input>
      <Button type="cancel" onClick={handleCancel}>
        Cancel
      </Button>
    </form>
  );
};

export default Form;

import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { addTrainer } from '../../../redux/trainers/thunks';

import { Button, Input } from '../../Shared';
import { useDispatch } from 'react-redux';

const Form = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
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
  const [selectedTrainer, setSelectedTrainer] = useState({
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
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedTrainer(data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setFormData({
        firstName: selectedTrainer.firstName,
        lastName: selectedTrainer.lastName,
        dni: selectedTrainer.dni,
        phone: selectedTrainer.phone,
        email: selectedTrainer.email,
        city: selectedTrainer.city,
        password: selectedTrainer.password,
        salary: selectedTrainer.salary
      });
    }
  }, [selectedTrainer]);

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addNewTrainer = async ({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
    salary
  }) => {
    const requestData = {
      firstName: firstName,
      lastName: lastName,
      dni: dni,
      phone: phone,
      email: email,
      city: city,
      password: password,
      salary: salary
    };
    dispatch(addTrainer(requestData));
  };

  const editTrainer = async (updatedTrainer, trainerId) => {
    const requestData = {
      firstName: updatedTrainer.firstName,
      lastName: updatedTrainer.lastName,
      dni: updatedTrainer.dni,
      phone: updatedTrainer.phone,
      email: updatedTrainer.email,
      city: updatedTrainer.city,
      password: updatedTrainer.password,
      salary: updatedTrainer.salary
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${trainerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    const responseData = await response.json();
  };
  const handleCancel = () => {
    history.push('/trainers');
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editTrainer(formData, id);
    } else {
      console.log('hola');
      addNewTrainer(formData);
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
          onChange={onChangeInput}
        ></Input>
        <Input
          labelText={`Last Name`}
          type={'text'}
          name={`lastName`}
          value={formData.lastName}
          onChange={onChangeInput}
        ></Input>
        <Input
          labelText={`City`}
          type={'text'}
          name={`city`}
          value={formData.city}
          onChange={onChangeInput}
        ></Input>
        <Input
          labelText={`Dni`}
          type={'text'}
          name={`dni`}
          value={formData.dni}
          onChange={onChangeInput}
        ></Input>
      </div>
      <div className={styles.column}>
        <Input
          labelText={`Email`}
          type={'text'}
          name={`email`}
          value={formData.email}
          onChange={onChangeInput}
        ></Input>
        <Input
          labelText={`Phone`}
          type={'text'}
          name={`phone`}
          value={formData.phone}
          onChange={onChangeInput}
        ></Input>
        <Input
          labelText={`Salary`}
          type={'text'}
          name={`salary`}
          value={formData.salary}
          onChange={onChangeInput}
        ></Input>
        <Input
          labelText={`Password`}
          type={'password'}
          name={`password`}
          value={formData.password}
          onChange={onChangeInput}
        ></Input>
      </div>
      <Button type="submit" />
      <Button type="cancel" onClick={handleCancel}>
        Cancel
      </Button>
    </form>
  );
};

export default Form;

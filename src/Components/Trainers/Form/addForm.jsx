import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import { Button, ModalAlert, Input } from '../../Shared';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [password, setPassword] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const addTrainer = async (firstName, lastName, city, dni, email, phone, salary, password) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        dni: dni,
        phone: phone,
        email: email,
        city: city,
        password: password,
        salary: salary
      })
    });
    const data = await response.json();
    if (!data.error) {
      setAlertMessage(`The trainer named: ${lastName} ${firstName} was created successfully`);
      setIsAlertOpen(true);
    } else {
      setAlertMessage(data.message);
      setIsAlertOpen(true);
      return 'error';
    }
  };

  const handleCancel = () => {
    history.push('/trainers');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !city || !dni || !email || !phone || !salary) {
      setIsAlertOpen(true);
      setAlertMessage('Please complete all fields');
    }
    if (
      (await addTrainer(firstName, lastName, city, dni, email, phone, salary, password)) === 'error'
    ) {
      setIsAlertOpen(true);
    } else {
      setFirstName('');
      setLastName('');
      setCity('');
      setDni('');
      setEmail('');
      setPhone('');
      setSalary('');
      setPassword('');
      history.push('/trainers');
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname !== '/trainers/add') {
      history.push('/trainers/add');
    }
  }, [history]);
  const closeAlert = () => {
    setIsAlertOpen(false);
  };
  return (
    <form className={styles.addTrainer} onSubmit={onSubmit}>
      <div className={styles.column}>
        <Input
          labelText={`First Name`}
          type={'text'}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></Input>
        <Input
          labelText={`Last Name`}
          type={'text'}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></Input>
        <Input
          labelText={`City`}
          type={'text'}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></Input>
        <Input
          labelText={`Dni`}
          type={'text'}
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        ></Input>
      </div>
      <div className={styles.column}>
        <Input
          labelText={`Email`}
          type={'text'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          labelText={`Phone`}
          type={'text'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></Input>
        <Input
          labelText={`Salary`}
          type={'text'}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        ></Input>
        <Input
          labelText={`Password`}
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
      </div>
      <Button type={'confirm'} onClick={() => onSubmit} />
      <Button type="cancel" onClick={handleCancel}>
        Cancel
      </Button>
      {isAlertOpen && <ModalAlert text={alertMessage} onClick={closeAlert} />}
    </form>
  );
};

export default Form;

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import { Button, ModalAlert, Input } from '../../Shared';
// import { ModalAlert } from '../../Shared/ModalAlert';
// import { Link } from 'react-router-dom';

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
    if (response.status === 201) {
      alert(`The trainer named: ${lastName} ${firstName} was created successfully`);
    } else {
      const error = await response.json();
      alert(error.message);
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
      return;
    }
    await addTrainer(firstName, lastName, city, dni, email, phone, salary, password);
    setFirstName('');
    setLastName('');
    setCity('');
    setDni('');
    setEmail('');
    setPhone('');
    setSalary('');
    setPassword('');
    history.push('/trainers');
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
      <Input type={'submit'} value={'Save trainer'}></Input>
      <Button type="cancel" onClick={handleCancel}>
        Cancel
      </Button>
      {isAlertOpen && <ModalAlert text={alertMessage} onClick={closeAlert} />}
    </form>
  );
};

export default Form;

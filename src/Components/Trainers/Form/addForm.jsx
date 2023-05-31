import { useState } from 'react';

import styles from './form.module.css';

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

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !city || !dni || !email || !phone || !salary) {
      alert('Pleas complete all fields');
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
  };
  return (
    <form className={styles.addTrainer} onSubmit={onSubmit}>
      <div className={styles.column}>
        <div className={styles.formControl}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Add First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Add Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label>City</label>
          <input
            type="text"
            placeholder="Add City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label>Dni</label>
          <input
            type="text"
            placeholder="Add Dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.formControl}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Add Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Add Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label>Salary</label>
          <input
            type="text"
            placeholder="Add Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Add password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <input type="submit" value="Save trainer" className={`${styles.btn} ${styles.btnBlock}`} />
    </form>
  );
};

export default Form;

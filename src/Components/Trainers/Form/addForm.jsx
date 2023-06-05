import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
// import { Link } from 'react-router-dom';

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
      alert('Please complete all fields');
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
  return (
    <form className={styles.addTrainer} onSubmit={onSubmit}>
      <div className={styles.column}>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>First Name</label>
          <input
            className={styles.inputTrainers}
            type="text"
            placeholder="Add First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Last Name</label>
          <input
            className={styles.inputTrainers}
            type="text"
            placeholder="Add Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>City</label>
          <input
            className={styles.inputTrainers}
            type="text"
            placeholder="Add City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Dni</label>
          <input
            className={styles.inputTrainers}
            type="text"
            placeholder="Add Dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Email</label>
          <input
            className={styles.inputTrainers}
            type="text"
            placeholder="Add Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Phone</label>
          <input
            className={styles.inputTrainers}
            type="text"
            placeholder="Add Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Salary</label>
          <input
            className={styles.inputTrainers}
            type="text"
            placeholder="Add Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Password</label>
          <input
            className={styles.inputTrainers}
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

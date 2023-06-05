import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './form.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';

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
      //close();
      history.push('/trainers');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };
  return (
    <form className={styles.addTrainer} onSubmit={onSubmit}>
      <div className={styles.column}>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>First Name</label>
          <input
            className={styles.inputTrainers}
            type="text"
            name="firstName"
            placeholder="Add First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Last Name</label>
          <input
            className={styles.inputTrainers}
            type="text"
            name="lastName"
            placeholder="Add Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>City</label>
          <input
            className={styles.inputTrainers}
            type="text"
            name="city"
            placeholder="Add City"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Dni</label>
          <input
            className={styles.inputTrainers}
            type="text"
            name="dni"
            placeholder="Add Dni"
            value={formData.dni}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Email</label>
          <input
            className={styles.inputTrainers}
            type="text"
            name="email"
            placeholder="Add Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Phone</label>
          <input
            className={styles.inputTrainers}
            type="text"
            name="phone"
            placeholder="Add Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Salary</label>
          <input
            className={styles.inputTrainers}
            type="text"
            name="salary"
            placeholder="Add Salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelTrainers}>Password</label>
          <input
            className={styles.inputTrainers}
            type="password"
            name="password"
            placeholder="Add password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <input type="submit" value="Edit trainer" className={`${styles.btn} ${styles.btnBlock}`} />
      <Button type="cancel" onClick={handleCancel}>
        Cancel
      </Button>
    </form>
  );
};

export default Form;

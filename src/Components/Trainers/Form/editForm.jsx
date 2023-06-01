import styles from './form.module.css';

const Form = (props) => {
  const handleChange = (e) => {
    props.setFormData({ ...props.formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await editTrainer(props.formData);
  };
  const editTrainer = async (formData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${formData._id}`, {
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
      props.close();
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
            value={props.formData.firstName}
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
            value={props.formData.lastName}
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
            value={props.formData.city}
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
            value={props.formData.dni}
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
            value={props.formData.email}
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
            value={props.formData.phone}
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
            value={props.formData.salary}
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
            value={props.formData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <input type="submit" value="Edit trainer" className={`${styles.btn} ${styles.btnBlock}`} />
    </form>
  );
};

export default Form;

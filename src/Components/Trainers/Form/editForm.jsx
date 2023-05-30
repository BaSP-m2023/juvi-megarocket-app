import styles from './form.module.css';

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
  } else {
    const error = await response.json();
    alert(error.message);
  }
};

const Form = (props) => {
  const handleChange = (e) => {
    props.setFormData({ ...props.formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await editTrainer(props.formData);
    props.close();
  };
  return (
    <form className={styles.addTrainer} onSubmit={onSubmit}>
      <div className={styles.column}>
        <div className={styles.formControl}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Add First Name"
            value={props.formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Add Last Name"
            value={props.formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Add City"
            value={props.formData.city}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Dni</label>
          <input
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
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Add Email"
            value={props.formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Add Phone"
            value={props.formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            placeholder="Add Salary"
            value={props.formData.salary}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label>Password</label>
          <input
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

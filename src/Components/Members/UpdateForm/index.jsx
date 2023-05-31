import React, { useState } from 'react';
import styles from './form.module.css';

const Form = ({ data, updMemb, selectId }) => {
  const selectedMember = data.filter((d) => d._id === selectId);
  const [member, setMember] = useState({
    firstName: selectedMember[0].firstName,
    lastName: selectedMember[0].lastName,
    dni: selectedMember[0].dni,
    phone: selectedMember[0].phone,
    email: selectedMember[0].email,
    city: selectedMember[0].city,
    birthDate: selectedMember[0].birthDate,
    postalCode: selectedMember[0].postalCode,
    memberships: selectedMember[0].memberships
  });

  const onChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      updMemb(selectId, member);
    } catch (e) {
      console.log(e);
    }
    setMember({
      firstName: member.firstName,
      lastName: member.lastName,
      dni: member.dni,
      phone: member.phone,
      email: member.email,
      city: member.city,
      birthDate: member.birthDate,
      postalCode: member.postalCode,
      memberships: member.memberships
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>First name</label>
          <input
            className={styles.input}
            name="firstName"
            type="text"
            value={member.firstName}
            onChange={onChange}
            placeholder="First Name"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Last Name</label>
          <input
            className={styles.input}
            name="lastName"
            type="text"
            value={member.lastName}
            onChange={onChange}
            placeholder="Last Name"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>DNI</label>
          <input
            className={styles.input}
            name="dni"
            type="number"
            value={member.dni}
            onChange={onChange}
            placeholder="DNI"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Phone</label>
          <input
            className={styles.input}
            name="phone"
            type="number"
            value={member.phone}
            onChange={onChange}
            placeholder="Phone"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Email</label>
          <input
            className={styles.input}
            name="email"
            type="text"
            value={member.email}
            onChange={onChange}
            placeholder="Email"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>City</label>
          <input
            className={styles.input}
            name="city"
            type="text"
            value={member.city}
            onChange={onChange}
            placeholder="City"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Birth Day</label>
          <input
            className={styles.input}
            name="birthDate"
            type="date"
            value={member.birthDate}
            onChange={onChange}
            placeholder="Birth Day"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Zip</label>
          <input
            className={styles.input}
            name="postalCode"
            type="number"
            value={member.postalCode}
            onChange={onChange}
            placeholder="Zip"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Membership</label>
          <select name="memberships" value={member.memberships} onChange={onChange}>
            <option value="Only Classes">Only Classes</option>
            <option value="Classic">Classic</option>
            <option value="Black">Black</option>
          </select>
        </fieldset>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;

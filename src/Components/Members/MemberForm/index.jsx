/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const MemberForm = ({ data, addMember, updateMemb, selectId, hideForm, text }) => {
  let selectedMember = [
    {
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      birthDate: '',
      postalCode: '',
      memberships: ''
    }
  ];

  if (text !== 'Add member') {
    selectedMember = data.filter((item) => item._id === selectId);
  }

  const [member, setMember] = useState({
    firstName: selectedMember[0].firstName ?? '',
    lastName: selectedMember[0].lastName ?? '',
    dni: selectedMember[0].dni ?? '',
    phone: selectedMember[0].phone ?? '',
    email: selectedMember[0].email ?? '',
    city: selectedMember[0].city ?? '',
    birthDate: selectedMember[0].birthDate ?? '',
    postalCode: selectedMember[0].postalCode ?? '',
    memberships: selectedMember[0].memberships ?? ''
  });

  const onChange = (event) => {
    setMember({
      ...member,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    member.birthDate = member.birthDate + 'T03:00:00.000+00:00';
    try {
      if (text === 'Add member') {
        await addMember(member);
      } else {
        await updateMemb(selectId, member);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1>{text}</h1>
      <div className={styles.formContainer}>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>First name</label>
          <input
            className={styles.input}
            name="firstName"
            type="text"
            value={member.firstName}
            onChange={onChange}
            placeholder="Ex: Tristan"
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
            placeholder="Ex: Galvez"
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
            placeholder="Ex: 33555888"
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
            placeholder="Ex: 11426426"
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
            placeholder="example@example.com"
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
            placeholder="Ex: Casilda"
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
            placeholder="Ex: 2170"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Password</label>
          <input
            className={styles.input}
            name="password"
            type="password"
            onChange={console.log('password')}
            placeholder="Password"
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
        <Link to="/">
          <Button type={'confirm'} resource={'Member'} onClick={onSubmit} />
        </Link>
        <Link to="/">
          <Button type={'cancel'} resource={'Member'} />
        </Link>
      </div>
    </form>
  );
};

export default MemberForm;

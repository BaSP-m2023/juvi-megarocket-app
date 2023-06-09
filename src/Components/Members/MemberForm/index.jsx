/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import ModalAlert from '../../Shared/ModalAlert';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom';

const MemberForm = (props) => {
  const [members, setMembers] = useState([]);
  const [msg, setMsg] = useState('');
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [member, setMember] = useState({
    firstName: members.firstName ?? '',
    lastName: members.lastName ?? '',
    dni: members.dni ?? '',
    phone: members.phone ?? '',
    email: members.email ?? '',
    city: members.city ?? '',
    birthDate: members.birthDate ?? '',
    postalCode: members.postalCode ?? '',
    memberships: members.memberships ?? '',
    password: members.password ?? ''
  });

  const { id } = useParams();
  let text = 'Add member';

  const getMembs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`);
    const data = await response.json();
    data.data.birthDate = data.data.birthDate.substring(0, 10);
    setMembers(data.data);
  };

  useEffect(() => {
    if (id) {
      getMembs();
      text = 'Edit member';
    } else {
      text = 'Add member';
    }
  }, []);

  useEffect(() => {
    setMember({
      firstName: members.firstName ?? '',
      lastName: members.lastName ?? '',
      dni: members.dni ?? '',
      phone: members.phone ?? '',
      email: members.email ?? '',
      city: members.city ?? '',
      birthDate: members.birthDate ?? '',
      postalCode: members.postalCode ?? '',
      memberships: members.memberships ?? '',
      password: members.password ?? ''
    });
  }, [members]);

  const onChange = (event) => {
    setMember({
      ...member,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    member.birthDate = member.birthDate + 'T03:00:00.000+00:00';
    try {
      if (text === 'Add member') {
        addMember(member);
      } else {
        updateMemb(id, member);
      }
    } catch (error) {
      setMsg(error);
      setModal(!modal);
    }
  };

  const addMember = async (member) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(member)
      });

      const newMemb = await response.json();

      if (!newMemb.error) {
        setMembers([...members, newMemb]);
        setMsg('Member created!');
        setModal(!modal);
      } else {
        setMsg(newMemb.message);
        setModal(!modal);
      }
    } catch (error) {
      setMsg(error.message);
      setModal(!modal);
    }
  };

  const updateMemb = async (id, member) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(member)
      }).then(async (response) => {
        const data = await response.json();
        if (!data.error) {
          setMembers(
            members.map((member) =>
              member._id === id
                ? {
                    ...member,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dni: data.dni,
                    phone: data.phone,
                    email: data.email,
                    city: data.city,
                    birthDate: data.birthDate,
                    postalCode: data.postalCode,
                    memberships: data.memberships,
                    password: data.password
                  }
                : member
            )
          );
          setMsg(`Member ${members.firstName} ${members.lastName} updated!`);
          setModalDone(!modalDone);
        } else {
          setMsg(data.message);
          setModal(!modal);
        }
      });
    } catch (error) {
      setMsg(error.message);
      setModal(!modal);
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
        <Button
          type={'confirm'}
          resource={'Member'}
          onClick={() => {
            onSubmit;
          }}
        />
        <Link to="/members">
          <Button type={'cancel'} />
        </Link>
        {modal && <ModalAlert text={msg} onClick={setModal(!modal)} />}
        {modalDone && <ModalAlert text={msg} onClick={setModalDone(!modalDone)} />}
      </div>
    </form>
  );
};

export default MemberForm;

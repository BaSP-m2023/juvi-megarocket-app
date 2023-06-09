import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { ModalAlert, Button, Input } from '../../Shared';
import { useParams } from 'react-router-dom';

const MemberForm = (props) => {
  const [members, setMembers] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
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

  if (id) {
    text = 'Edit member';
  } else {
    text = 'Add member';
  }

  const getMembs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`);
    const data = await response.json();
    data.data.birthDate = data.data.birthDate.substring(0, 10);
    setMembers(data.data);
  };

  useEffect(() => {
    if (id) {
      getMembs();
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
        setMsg('Member created!');
        setModalDone(!modalDone);
        getMembs();
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
          setMembers({
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
          });
          setMsg(`Member ${member.firstName} ${member.lastName} updated!`);
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
            className={styles.input}
            name="birthDate"
            type="date"
            value={member.birthDate}
            onChange={onChange}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Zip</label>
          <Input
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
          <Input
            className={styles.input}
            name="password"
            type="password"
            value={member.password}
            onChange={onChange}
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
        <Button type={'cancel'} onClick={() => props.history.push('/members')} />
        {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} />}
        {modalDone && <ModalAlert text={msg} onClick={() => props.history.push('/members')} />}
      </div>
    </form>
  );
};

export default MemberForm;

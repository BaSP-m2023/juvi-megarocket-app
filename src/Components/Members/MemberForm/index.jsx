import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberById, putMember, addMember } from '../../../redux/members/thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './form.module.css';
import { ModalAlert, Button, Input } from '../../Shared';

const MemberForm = (props) => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const [member, setMember] = useState({
    firstName: data.item.firstName ?? '',
    lastName: data.item.lastName ?? '',
    dni: data.item.dni ?? '',
    phone: data.item.phone ?? '',
    email: data.item.email ?? '',
    city: data.item.city ?? '',
    birthDate: data.item.birthDate ?? '',
    postalCode: data.item.postalCode ?? '',
    memberships: data.item.memberships ?? 'Only Classes',
    password: data.item.password ?? ''
  });

  const { id } = useParams();
  let text = 'Add member';

  if (id) {
    text = 'Edit member';
  } else {
    text = 'Add member';
  }

  useEffect(() => {
    if (id) {
      dispatch(getMemberById(id, setMember));
    }
  }, [data.error, msg]);

  useEffect(() => {
    if (!id) {
      setMember({
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
        email: '',
        city: '',
        birthDate: '',
        postalCode: '',
        memberships: 'Only Classes',
        password: ''
      });
    }
  }, []);

  const onChange = (event) => {
    setMember({
      ...member,
      [event.target.name]: event.target.value
    });
  };

  const replaceBd = () => {
    setMember({
      ...member,
      birthDate: member.birthDate.substring(0, 10)
    });
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const errorAlert = (errorMsg) => {
    setMsg(errorMsg);
    setModal(!modal);
  };

  const successAlert = (successMsg) => {
    setMsg(successMsg);
    setModalDone(!modalDone);
  };

  const switchModal = (error, msg) => {
    if (error) {
      replaceBd();
      errorAlert(msg);
    } else {
      successAlert(msg);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    member.birthDate = member.birthDate + 'T03:00:00.000+00:00';
    if (text === 'Add member') {
      dispatch(addMember(member, switchModal));
    } else {
      dispatch(putMember(id, member, switchModal));
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="First Name"
            className={styles.input}
            name="firstName"
            type="text"
            value={member.firstName}
            onChange={onChange}
            placeholder="Ex: Tristan"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="Last Name"
            className={styles.input}
            name="lastName"
            type="text"
            value={member.lastName}
            onChange={onChange}
            placeholder="Ex: Galvez"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="DNI"
            className={styles.input}
            name="dni"
            type="number"
            value={member.dni}
            onChange={onChange}
            placeholder="Ex: 33555888"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="Phone"
            className={styles.input}
            name="phone"
            type="number"
            value={member.phone}
            onChange={onChange}
            placeholder="Ex: 11426426"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="Email"
            className={styles.input}
            name="email"
            type="text"
            value={member.email}
            onChange={onChange}
            placeholder="example@example.com"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="City"
            className={styles.input}
            name="city"
            type="text"
            value={member.city}
            onChange={onChange}
            placeholder="Ex: Casilda"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="Birth Day"
            className={styles.input}
            name="birthDate"
            type="date"
            value={member.birthDate}
            onChange={onChange}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="Zip"
            className={styles.input}
            name="postalCode"
            type="number"
            value={member.postalCode}
            onChange={onChange}
            placeholder="Ex: 2170"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <div className={styles.password}>
            <Input
              labelText="Password"
              className={styles.input}
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={member.password}
              onChange={onChange}
              placeholder="Password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className={styles.showPasswordIcon}
              onClick={togglePassword}
            />
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label>Membership</label>
          <select name="memberships" value={member.memberships} onChange={onChange}>
            <option value="Only Classes">Only Classes</option>
            <option value="Classic">Classic</option>
            <option value="Black">Black</option>
          </select>
        </fieldset>
      </div>
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
    </form>
  );
};

export default MemberForm;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from 'Components/Admin/Members/MemberForm/form.module.css';

import { schema } from 'Components/Admin/Members/MemberForm/memberFormValidations';
import { ModalAlert, Button, Input } from 'Components/Shared';
import { getMemberById, putMember, addMember } from 'redux/members/thunks';

const MemberForm = (props) => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: data.item?.firstName ?? '',
      lastName: data.item?.lastName ?? '',
      dni: data.item?.dni ?? '',
      phone: data.item?.phone ?? '',
      email: data.item?.email ?? '',
      city: data.item?.city ?? '',
      birthDate: data.item?.birthDate ?? '',
      postalCode: data.item?.postalCode ?? '',
      password: data.item?.password ?? '',
      memberships: data.item?.memberships ?? 'Only Classes'
    }
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getMemberById(id));
      setText('Edit member');
    } else {
      data.item = {};
      setText('Add member');
    }
  }, []);

  useEffect(() => {
    if (data.item) {
      reset({
        firstName: data.item?.firstName ?? '',
        lastName: data.item?.lastName ?? '',
        dni: data.item?.dni ?? '',
        phone: data.item?.phone ?? '',
        email: data.item?.email ?? '',
        city: data.item?.city ?? '',
        birthDate: data.item?.birthDate ?? '',
        postalCode: data.item?.postalCode ?? '',
        password: data.item?.password ?? '',
        memberships: data.item?.memberships ?? 'Only Classes'
      });
    }
  }, [data.item]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const switchModal = (error, msg) => {
    if (error) {
      setMsg(msg);
      setModal(!modal);
    } else {
      setMsg(msg);
      setModalDone(!modalDone);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (text === 'Add member') {
        dispatch(addMember(data, switchModal));
      } else {
        dispatch(putMember(id, data, switchModal));
      }
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className={styles.formContainer} data-testId="admin-members-add-form">
          <h1>{text}</h1>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="First Name"
              className={styles.input}
              name={'firstName'}
              type="text"
              placeholder="Ex: Tristan"
              error={errors.firstName?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Last Name"
              className={styles.input}
              name={'lastName'}
              type="text"
              placeholder="Ex: Galvez"
              error={errors.lastName?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="DNI"
              className={styles.input}
              name={'dni'}
              type="number"
              placeholder="Ex: 33555888"
              error={errors.dni?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Phone"
              className={styles.input}
              name={'phone'}
              type="number"
              placeholder="Ex: 11426426"
              error={errors.phone?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Email"
              className={styles.input}
              name={'email'}
              type="text"
              placeholder="example@example.com"
              error={errors.email?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="City"
              className={styles.input}
              name={'city'}
              type="text"
              placeholder="Ex: Casilda"
              error={errors.city?.message}
              register={register}
              testId="admin-member-form-city"
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Birth Date"
              className={styles.input}
              name={'birthDate'}
              type="datetime-local"
              error={errors.birthDate?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Zip"
              className={styles.input}
              name={'postalCode'}
              type="number"
              placeholder="Ex: 2170"
              error={errors.postalCode?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <div className={styles.password}>
              <Input
                labelText="Password"
                className={styles.input}
                name={'password'}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                error={errors.password?.message}
                register={register}
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
            <select name="memberships" {...register('memberships')}>
              <option value="Only Classes">Only Classes</option>
              <option value="Classic">Classic</option>
              <option value="Black">Black</option>
            </select>
            {errors.memberships && <p>{errors.memberships.message}</p>}
          </fieldset>
        </div>
        <Button type={'submit'} resource={'Member'} testId="submit-button" />
        <Button
          type={'cancel'}
          onClick={() => props.history.push('/admins/members')}
          testId="cancel-button"
        />
        {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} testId="modal-alert" />}
        {modalDone && (
          <ModalAlert
            text={msg}
            onClick={() => props.history.push('/admins/members')}
            testId="modal-alert"
          />
        )}
      </form>
      <Button
        className={styles.addButton}
        type="reset"
        onClick={() => reset()}
        testId="reset-button"
      ></Button>
    </div>
  );
};

export default MemberForm;

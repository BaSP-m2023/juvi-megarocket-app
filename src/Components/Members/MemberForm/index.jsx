import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberById, putMember, addMember } from '../../../redux/members/thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './form.module.css';
import { schema } from './memberFormValidations';
import { ModalAlert, Button, Input } from '../../Shared';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const MemberForm = (props) => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const [memb, setMemb] = useState({});
  const [text, setText] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema)
  });

  const { id } = useParams();

  useEffect(() => {
    console.log(data.item);
    console.log(memb);
    if (id) {
      console.log('Si, ID!!!');
      dispatch(getMemberById(id));
      setMemb(data.item);
      setText('Edit member');
    } else {
      console.log('Sad, NO ID!!!');
      setMemb({});
      setText('Add member');
    }
  }, [data.error, msg, data.item.firstName, memb]);

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

  const handleChange = (event) => {
    setMemb({
      ...data.item,
      [event.target.name]: event.current.value
    });
  };

  const onSubmit = async (data) => {
    try {
      console.log(await data);
      if (text === 'Add member') {
        dispatch(addMember(data, switchModal));
      } else {
        dispatch(putMember(id, data, switchModal));
      }
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.error(errors);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className={styles.formContainer}>
        <h1>{text}</h1>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="First Name"
            className={styles.input}
            name={'firstName'}
            type="text"
            value={memb?.firstName}
            defaultValue={memb?.firstName ?? ''}
            onChange={handleChange}
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
            defaultValue={memb?.lastName ?? ''}
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
            defaultValue={memb?.dni ?? ''}
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
            defaultValue={memb?.phone ?? ''}
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
            defaultValue={memb?.email ?? ''}
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
            defaultValue={memb?.city ?? ''}
            placeholder="Ex: Casilda"
            error={errors.city?.message}
            register={register}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            labelText="Birth Day"
            className={styles.input}
            name={'birthDate'}
            type="datetime-local"
            defaultValue={memb?.birthDate ?? '1990-01-01 01-01'}
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
            defaultValue={memb?.postalCode ?? ''}
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
              defaultValue={memb?.password ?? ''}
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
          <select
            name="memberships"
            defaultValue={memb?.memberships ?? 'Only Classes'}
            {...register('memberships')}
          >
            <option value="Only Classes">Only Classes</option>
            <option value="Classic">Classic</option>
            <option value="Black">Black</option>
          </select>
          {errors.memberships && <p>{errors.memberships.message}</p>}
        </fieldset>
      </div>
      <Button type={'submit'} resource={'Member'} />
      <Button type={'cancel'} onClick={() => props.history.push('/members')} />
      {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} />}
      {modalDone && <ModalAlert text={msg} onClick={() => props.history.push('/members')} />}
    </form>
  );
};

export default MemberForm;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from 'Components/Signs/SignUp/form.module.css';
import { schema } from 'Components/Signs/SignUp/memberSingUpValidations';
import { ModalAlert, Button, Input } from 'Components/Shared';
import { addMember } from 'redux/members/thunks';

const MemberSingUp = () => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
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

  useEffect(() => {
    data.item = {};
  }, []);

  const history = useHistory();
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
    console.log(data);
    try {
      dispatch(addMember(data, switchModal));
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div className={styles.formContainer} data-testid="member-signup-form">
            <div className={styles.columns}>
              <fieldset className={styles.fieldset}>
                <Input
                  labelText="First Name"
                  className={styles.input}
                  name={'firstName'}
                  type="text"
                  placeholder="Ex: John Doe"
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
                  placeholder="Ex: Cavallo"
                  error={errors.lastName?.message}
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
                  labelText="Repeat Email"
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
                  labelText="DNI"
                  className={styles.input}
                  name={'dni'}
                  type="number"
                  placeholder="Ex: 12345678"
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
                  placeholder="Ex: 1122334455"
                  error={errors.phone?.message}
                  register={register}
                />
              </fieldset>
            </div>
            <div className={styles.columns}>
              <fieldset className={styles.fieldset}>
                <Input
                  labelText="City"
                  className={styles.input}
                  name={'city'}
                  type="text"
                  placeholder="Ex: Montevideo"
                  error={errors.city?.message}
                  register={register}
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <Input
                  labelText="Birth Day"
                  className={styles.input}
                  name={'birthDate'}
                  type="date"
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
                  placeholder="Ex: 1122"
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
          </div>
          <div className={styles.btnContainer}>
            <Button type={'submit'} resource={'Member'} testId="member-signup-submit-button" />
            <Button
              type={'cancel'}
              onClick={() => history.push('/')}
              testId="member-signup-cancel-button"
            />
          </div>
          {modal && (
            <ModalAlert
              text={msg}
              onClick={() => setModal(!modal)}
              testId="member-signup-modal-alert"
            />
          )}
          {modalDone && (
            <ModalAlert
              text={msg}
              onClick={() => history.push('/')}
              testId="member-signup-modal-alert"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default MemberSingUp;

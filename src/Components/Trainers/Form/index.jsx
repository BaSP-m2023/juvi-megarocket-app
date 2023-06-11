import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { addTrainer, getTrainersBy, putTrainer } from '../../../redux/trainers/thunks';
import { resetErrorAndMessage } from '../../../redux/trainers/actions';
import { Button, Input, ModalAlert } from '../../Shared';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const { error, message, item } = useSelector((state) => state.trainers);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    salary: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(getTrainersBy(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && item) {
      setFormData({
        firstName: item.firstName,
        lastName: item.lastName,
        dni: item.dni,
        phone: item.phone,
        email: item.email,
        city: item.city,
        password: item.password,
        salary: item.salary
      });
    }
  }, [item]);

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    history.push('/trainers');
    dispatch(resetErrorAndMessage());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(putTrainer(formData, id));
    } else {
      dispatch(addTrainer(formData));
    }
  };

  const closeAlert = () => {
    if (error === '') {
      history.push('/trainers');
    }
    dispatch(resetErrorAndMessage());
  };

  return (
    <div>
      {error != '' && <ModalAlert text={error} onClick={closeAlert} />}
      {message != '' && <ModalAlert text={message} onClick={closeAlert} />}
      <form className={styles.addTrainer} onSubmit={onSubmit}>
        <div className={styles.column}>
          <Input
            labelText={`First name`}
            type={'text'}
            name={`firstName`}
            value={formData.firstName ?? ''}
            onChange={onChangeInput}
          ></Input>
          <Input
            labelText={`Last Name`}
            type={'text'}
            name={`lastName`}
            value={formData.lastName ?? ''}
            onChange={onChangeInput}
          ></Input>
          <Input
            labelText={`City`}
            type={'text'}
            name={`city`}
            value={formData.city ?? ''}
            onChange={onChangeInput}
          ></Input>
          <Input
            labelText={`Dni`}
            type={'text'}
            name={`dni`}
            value={formData.dni ?? ''}
            onChange={onChangeInput}
          ></Input>
        </div>
        <div className={styles.column}>
          <Input
            labelText={`Email`}
            type={'text'}
            name={`email`}
            value={formData.email ?? ''}
            onChange={onChangeInput}
          ></Input>
          <Input
            labelText={`Phone`}
            type={'text'}
            name={`phone`}
            value={formData.phone ?? ''}
            onChange={onChangeInput}
          ></Input>
          <Input
            labelText={`Salary`}
            type={'text'}
            name={`salary`}
            value={formData.salary ?? ''}
            onChange={onChangeInput}
          ></Input>
          <Input
            labelText={`Password`}
            type={'password'}
            name={`password`}
            value={formData.password ?? ''}
            onChange={onChangeInput}
          ></Input>
        </div>
        <Button type="submit" />
        <Button type="cancel" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default Form;

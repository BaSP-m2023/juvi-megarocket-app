import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import {
  addSuperAdmins,
  getSuperAdminsBy,
  putSuperAdmins
} from '../../../redux/superadmins/thunks';
import { Button, Input, ModalAlert } from '../../Shared';
import { useDispatch, useSelector } from 'react-redux';

const FormSuperAdmins = () => {
  const { error, message, item } = useSelector((state) => state.superadmins);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(getSuperAdminsBy(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && item) {
      setFormData({
        email: item.email,
        password: item.password
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
    history.push('/superadmins');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(putSuperAdmins(formData, id));
    } else {
      dispatch(addSuperAdmins(formData));
    }
  };

  const closeAlert = () => {
    if (error === '') {
      history.push('/superadmins');
    }
  };

  return (
    <div>
      {error != '' && <ModalAlert text={error} onClick={closeAlert} />}
      {message != '' && <ModalAlert text={message} onClick={closeAlert} />}
      <form className={styles.addSuperAdmins} onSubmit={onSubmit}>
        <div className={styles.column}>
          <Input
            labelText={`Email`}
            type={'text'}
            name={`email`}
            value={formData.email ?? ''}
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

export default FormSuperAdmins;

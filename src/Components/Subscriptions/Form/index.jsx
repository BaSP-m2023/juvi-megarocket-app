import React, { useState, useEffect } from 'react';
import style from './form.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { ModalAlert, Button, ModalConfirm } from '../../Shared';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubscription,
  editSubscription,
  getSubscriptionsById
} from '../../../redux/subscriptions/thunks';

const SubForm = () => {
  const { id } = useParams();
  const [membersData, setMembers] = useState([]);
  const [classesData, setClasses] = useState([]);
  const [filteredMembersData, setFilteredMembers] = useState([]);
  const [filteredClassesData, setFilteredClasses] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const history = useHistory();
  const [selectedSubscription, setSelectedSubscription] = useState({
    classes: '',
    members: [],
    date: ''
  });

  const [formData, setFormData] = useState({
    classes: '',
    members: [],
    date: ''
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const subscription = useSelector((state) => state.subscriptions);

  useEffect(() => {
    getMembers();
    getClasses();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getSubscriptionsById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log(subscription.item);
    if (subscription.item) {
      setSelectedSubscription({
        classes: subscription.item.classes?._id || '',
        members: subscription.item.members || '',
        date: subscription.item.date?.slice(0, 16)
      });
    }
  }, [subscription.item]);

  useEffect(() => {
    setFormData({
      classes: selectedSubscription.classes,
      members: selectedSubscription.members,
      date: selectedSubscription.date
    });
    setFilteredClasses(classesData.filter((classe) => classe._id !== selectedSubscription.classes));
    setFilteredMembers(
      membersData.filter((member) => member._id !== selectedSubscription.members._id)
    );
  }, [selectedSubscription]);

  useEffect(() => {
    if (window.location.pathname === '/subscriptions') {
      setShowConfirm(true);
    }
  }, [window.location.pathname]);

  const getMembers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/member/`)
      .then((response) => response.json())
      .then((data) => {
        const memberData = data.data;
        setMembers(memberData);
      })
      .catch((error) => {
        setAlertText(error);
        showAlertHandler();
      });
  };

  const getClasses = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/class/`)
      .then((response) => response.json())
      .then((data) => {
        const classesData = data.data;
        setClasses(classesData);
      })
      .catch((error) => {
        setAlertText(error);
        showAlertHandler();
      });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      await dispatch(addSubscription(id, formData));
    } else {
      await dispatch(editSubscription(id, formData));
    }
  };

  const showAlertHandler = () => {
    setShowAlert(true);
  };

  const handleFormClose = (e) => {
    e.preventDefault();
    history.push('/subscriptions');
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
    setShowAlert(false);
    if (subscription && subscription.success) {
      history.push('/subscriptions');
    }
  };

  return (
    <div>
      {showAlert && <ModalAlert text={alertText} onClick={handleConfirmClose} />}
      <form className={style.form} onSubmit={onSubmit}>
        <div>
          <div className={style.forms}>
            <label>ID member</label>
            {id ? (
              <select name="members" onChange={onChangeInput}>
                <option value={selectedSubscription.members._id}>
                  {selectedSubscription.members.firstName +
                    ' ' +
                    selectedSubscription.members.lastName}
                </option>
                {filteredMembersData.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.firstName} {member.lastName}
                  </option>
                ))}
              </select>
            ) : (
              <select name="members" onChange={onChangeInput}>
                <option value={null}>Seleccione un Miembro</option>
                {membersData.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.firstName} {member.lastName}
                  </option>
                ))}
              </select>
            )}
          </div>
          {id ? (
            <div className={style.forms}>
              <label>Date</label>
              <input
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={onChangeInput}
              />
            </div>
          ) : (
            <div className={style.forms}>
              <label>Date</label>
              <input
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={onChangeInput}
              />
            </div>
          )}
          <div className={style.forms}>
            <label>ID class</label>
            {id ? (
              <select name="classes" value={selectedSubscription.classes} onChange={onChangeInput}>
                <option value={selectedSubscription.classes}>{selectedSubscription.classes}</option>
                {filteredClassesData.map((classes) => (
                  <option key={classes._id} value={classes._id}>
                    {classes._id}
                  </option>
                ))}
              </select>
            ) : (
              <select name="classes" onChange={onChangeInput}>
                <option value={null}>Choose Class</option>
                {classesData.map((classes) => (
                  <option key={classes._id} value={classes._id}>
                    {classes._id}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className={style.buttons}>
          <Button className={style.button} type="submit" />
          <Button className={style.buttonClose} onClick={handleFormClose} type="cancel" />
        </div>
      </form>
      {showConfirm && (
        <ModalConfirm text="¿Desea confirmar la acción?" onClose={handleConfirmClose} />
      )}
    </div>
  );
};

export default SubForm;

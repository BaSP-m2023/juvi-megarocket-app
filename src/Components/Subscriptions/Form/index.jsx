import React, { useState, useEffect } from 'react';
import style from './form.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { ModalAlert, Button, ModalConfirm } from '../../Shared';
import { useHistory } from 'react-router-dom';

const SubForm = () => {
  const { id } = useParams();
  const [membersData, setMembers] = useState([]);
  const [classesData, setClasses] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const history = useHistory();
  const [formData, setFormData] = useState({
    classes: '',
    members: '',
    date: '',
    isActive: ''
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    getMembers();
    getClasses();
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            classes: data.classes._id,
            members: data.members._id,
            date: data.date,
            isActive: data.isActive
          });
        })
        .catch((error) => {
          setAlertText(error);
          showAlertHandler();
        });
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === '/subscriptions') {
      setShowConfirm(true);
    }
  }, [window.location.pathname]);

  const getMembers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/member/`)
      .then((response) => response.json())
      .then((jsonData) => {
        const memberData = jsonData.data;
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
      .then((jsonData) => {
        const classesData = jsonData.data;
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
    if (id) {
      await editSubscription(formData, id);
    } else {
      await addSubscription(formData);
    }
    history.push('/subscriptions');
  };

  const addSubscription = async ({ classes, members, date, isActive }) => {
    const requestData = {
      classes: classes,
      members: members,
      date: date,
      isActive: isActive
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      } else {
        setAlertText(responseData.message);
        showAlertHandler();
        getClasses();
      }
    } catch (error) {
      setAlertText(error.message);
      showAlertHandler();
    }
  };

  const editSubscription = async (updatedSubscription, subscriptionId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/subscriptions/${subscriptionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedSubscription)
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setAlertText(responseData.message);
        showAlertHandler();
        getClasses();
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setAlertText(error.message);
      showAlertHandler();
    }
  };

  const showAlertHandler = () => {
    setShowAlert(!showAlert);
  };

  const handleFormClose = (e) => {
    e.preventDefault();
    history.push('/subscriptions');
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      {showAlert && <ModalAlert text={alertText} onClick={showAlertHandler} />}
      <form className={style.form} onSubmit={onSubmit}>
        <div>
          <div className={style.forms}>
            <label>ID member</label>
            <select name="members" value={formData.members} onChange={onChangeInput}>
              <option value={null}>Seleccione un Miembro</option>
              {membersData.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className={style.forms}>
            <label>Date</label>
            <input
              name="date"
              type="datetime-local"
              value={formData.date}
              onChange={onChangeInput}
            />
          </div>
          <div className={style.forms}>
            <label>ID class</label>
            <select name="classes" value={formData.classes} onChange={onChangeInput}>
              <option value={null}>Choose Class</option>
              {classesData.map((classe) => (
                <option key={classe._id} value={classe._id}>
                  {classe._id}
                </option>
              ))}
            </select>
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

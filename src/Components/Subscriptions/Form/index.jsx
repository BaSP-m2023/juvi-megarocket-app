import React, { useState, useEffect } from 'react';
import style from './form.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { ModalAlert, Button, ModalConfirm } from '../../Shared';
import { useHistory } from 'react-router-dom';
import { Input } from '../../Shared';

const SubForm = () => {
  const { id } = useParams();
  const [membersData, setMembers] = useState([]);
  const [classesData, setClasses] = useState([]);
  const [filteredMembersData, setFilteredMembers] = useState([]);
  const [filteredClassesData, setFilteredClasses] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const [selectedSubscription, setSelectedSubscription] = useState({
    classes: '',
    members: '',
    date: ''
  });

  const [formData, setFormData] = useState({
    classes: '',
    members: '',
    date: ''
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    getMembers();
    getClasses();
  }, []);
  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedSubscription({
            classes: data.data.classes._id,
            members: data.data.members[0],
            date: data.data.date.slice(0, 16)
          });
        })
        .catch((error) => {
          setAlertText(error);
          showAlertHandler();
        });
    }
  }, [id]);

  useEffect(() => {
    setFormData({
      classes: selectedSubscription.classes,
      members: selectedSubscription.members._id,
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
    if (id) {
      await editSubscription(formData, id);
    } else {
      await addSubscription(formData);
    }
  };

  const addSubscription = async ({ classes, members, date }) => {
    const requestData = {
      classes: classes,
      members: [members],
      date: date
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
        setAlertText(responseData.message);
      } else {
        setAlertText(responseData.message);
        showAlertHandler();
        setSuccess(true);
        getClasses();
      }
    } catch (error) {
      setAlertText(error);
      showAlertHandler();
    }
  };

  const editSubscription = async (updatedSubscription, subscriptionId) => {
    const requestData = {
      classes: updatedSubscription.classes,
      members: [updatedSubscription.members],
      date: updatedSubscription.date
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/subscriptions/${subscriptionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setAlertText(responseData.message);
        showAlertHandler();
        setSuccess(true);
        getClasses();
      } else {
        setAlertText(responseData.message);
      }
    } catch (error) {
      setAlertText(error.message);
      showAlertHandler();
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
    if (success) {
      history.push('/subscriptions');
    }
  };

  return (
    <div>
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
              <Input
                labelText="Date"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={onChangeInput}
              />
            </div>
          ) : (
            <div className={style.forms}>
              <Input
                labelText="Date"
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
        <Button className={style.button} type="confirm" />
        <Button className={style.buttonClose} onClick={handleFormClose} type="cancel" />
      </form>
      {showAlert && <ModalAlert text={alertText} onClick={handleConfirmClose} />}
      {showConfirm && (
        <ModalConfirm text="¿Desea confirmar la acción?" onClose={handleConfirmClose} />
      )}
    </div>
  );
};

export default SubForm;

import React, { useState, useEffect } from 'react';
import style from './form.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { ModalAlert } from '../../Shared';

const SubForm = () => {
  const { id } = useParams();
  const [membersData, setMembers] = useState([]);
  const [classesData, setClasses] = useState([]);
  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState({
    classes: {},
    members: [],
    date: ''
  });

  const [formData, setFormData] = useState({
    classes: selectedSubscription.classes || '',
    members: selectedSubscription.members || '',
    date: selectedSubscription.date || '',
    isActive: selectedSubscription.isActive || ''
  });
  useEffect(() => {
    getMembers();
    getClasses();
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedSubscription(data.data);
        })
        .catch((error) => {
          setAlertText(error);
          showAlertHandler();
        });
    }
  }, []);

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
  const filteredMembers = membersData.filter(
    (member) => member._id !== selectedSubscription.members[0]
  );
  const filteredClasses = classesData.filter(
    (classe) => classe._id !== selectedSubscription.classes._id
  );
  const onChangeInput = (e) => {
    const value =
      e.target.name === 'date' ? new Date(e.target.value).toISOString() : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editSubscription(formData, selectedSubscription._id);
    } else {
      addSubscription(formData);
    }
  };
  const addSubscription = async ({ classes, members, date, isActive }) => {
    const requestData = {
      classes: classes,
      members: members,
      date: date,
      isActive: isActive
    };
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.Error);
      } else {
        setAlertText(responseData.message);
        showAlertHandler();
      }
    } catch (error) {
      setAlertText(error);
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
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      ModalAlert(error);
      showAlertHandler();
    }
  };
  const handleFormClose = () => {
    alert('The updated data will be displayed.');
  };
  const showAlertHandler = () => {
    setshowAlert(!showAlert);
  };

  return (
    <div>
      {showAlert && <ModalAlert text={alertText} onClick={showAlertHandler} />}
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label>ID member</label>
            {id ? (
              <select name="idMember" onChange={onChangeInput}>
                <option value={selectedSubscription.members._id}>
                  {selectedSubscription.members.firstName +
                    ' ' +
                    selectedSubscription.members.lastName}
                </option>
                {filteredMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.firstName} {member.lastName}
                  </option>
                ))}
              </select>
            ) : (
              <select name="idMember" onChange={onChangeInput}>
                <option value={null}>Seleccione un Miembro</option>
                {membersData.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.firstName} {member.lastName}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label>Date</label>
            <input
              name="date"
              type="datetime-local"
              value={selectedSubscription.date.slice(0, -5)}
              onChange={onChangeInput}
            />
          </div>
          <div>
            <label>ID class</label>
            {id ? (
              <select
                name="idClass"
                value={selectedSubscription.classes._id}
                onChange={onChangeInput}
              >
                <option value={selectedSubscription.classes._id}>
                  {selectedSubscription.classes.name}
                </option>
                {filteredClasses.map((classe) => (
                  <option key={classe._id} value={classe._id}>
                    {classe._id}
                  </option>
                ))}
              </select>
            ) : (
              <select name="idClass" onChange={onChangeInput}>
                <option value={null}>Choose Class</option>
                {classesData.map((classe) => (
                  <option key={classe._id} value={classe._id}>
                    {classe._id}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <button className={style.button} type="submit">
          Add
        </button>
        <button className={style.buttonClose} onClick={handleFormClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default SubForm;

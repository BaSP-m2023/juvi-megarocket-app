import React, { useState, useEffect } from 'react';
import style from './form.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import ModalAlert from '../Shared';

const Form = () => {
  const { id } = useParams();
  const [membersData, setMembers] = useState([]);
  const [classesData, setClasses] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState({});

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
          ModalAlert(error);
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
        ModalAlert(error);
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
        ModalAlert(error);
      });
  };
  const filteredMembers = membersData.filter(
    (member) => member._id !== selectedSubscription.member._id
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
        ModalAlert(responseData.message);
      }
    } catch (error) {
      ModalAlert(error);
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
        ModalAlert(response.message);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      ModalAlert(error);
    }
  };
  const handleFormClose = () => {
    alert('The updated data will be displayed.');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label>ID member</label>
            <select name="idMember" onChange={onChangeInput}>
              <option value={selectedSubscription.member._id}>
                {selectedSubscription.member.firstName + ' ' + selectedSubscription.member.lastName}
              </option>
              {filteredMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
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
            <select name="idClass" value={selectedSubscription.clases._id} onChange={onChangeInput}>
              <option value="">Choose Class</option>
              {filteredClasses.map((classe) => (
                <option key={classe._id} value={classe._id}>
                  {classe._id}
                </option>
              ))}
            </select>
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

export default Form;

import React, { useState } from 'react';
import style from './form.module.css';

const Form = ({ members, classes }) => {
  console.log(members);
  console.log(classes);
  const [user, setUser] = useState({
    idMember: '',
    date: new Date().toISOString(),
    idClass: ''
  });

  const onChangeInput = (e) => {
    const value =
      e.target.name === 'date' ? new Date(e.target.value).toISOString() : e.target.value;

    setUser({
      ...user,
      [e.target.name]: value
    });
  };

  const handleAdd = () => {
    const requestData = {
      classes: user.idClass,
      members: [user.idMember],
      date: user.date
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => {
        if (response.ok) {
          alert('New subscription successfully added.');
          window.location.reload();
        } else {
          throw new Error('Error creating subscription');
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    setUser({
      idMember: '',
      date: new Date().toISOString(),
      idClass: ''
    });
  };

  const handleFormClose = () => {
    alert('The updated data will be displayed.');
  };

  const classOptions = classes.map((classItem) => ({
    value: classItem._id,
    label: classItem.activity.name
  }));

  return (
    <div>
      <form className={style.form}>
        <div className={style.subContainer}>
          <div className={style.inputContainer}>
            <h3>New Subscription</h3>
            <label className={style.label}>ID member</label>
            <select
              className={style.input}
              name="idMember"
              value={user.idMember}
              onChange={onChangeInput}
            >
              <option value="">Choose Member</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Date</label>
            <input
              className={style.input}
              name="date"
              type="datetime-local"
              value={user.date.slice(0, -5)}
              onChange={onChangeInput}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>ID class</label>
            <select
              className={style.input}
              name="idClass"
              value={user.idClass}
              onChange={onChangeInput}
            >
              <option value="">Choose Class</option>
              {classOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className={style.button} type="button" onClick={handleAdd}>
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

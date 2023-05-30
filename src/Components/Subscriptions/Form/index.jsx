import React, { useState } from 'react';
import style from './form.module.css';

const Form = () => {
  const [user, setUser] = useState({
    idMember: '646014b31c70e12b863ad70a',
    date: new Date().toISOString(),
    idClass: '64750dd551aa0de8c834eb3f'
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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('New subscription successfully added.');
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
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
              <option value="646014b31c70e12b863ad70a">Juan Manuel Lopez</option>
              <option value="646015ffa877f6e5fb0e5de2">Ariana Lopez</option>
              <option value="64601701a877f6e5fb0e5de5">Carla Lopez</option>
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
              <option value="64750dd551aa0de8c834eb3f">Crossfit</option>
              <option value="64710a03c093074a397642d2">Box</option>
              <option value="64750e1451aa0de8c834eb43">Spinning</option>
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

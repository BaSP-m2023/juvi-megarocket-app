import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions } from 'redux/subscriptions/thunks';
import { getClasses } from 'redux/classes/thunks';

import { ModalAlert } from 'Components/Shared';
import styles from 'Components/Shared/SharedSchedule/shared-schedule.module.css';

const SharedSchedule = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [subs, setSubs] = React.useState([]);
  const subsData = useSelector((state) => state.subscriptions);
  const classData = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  const nowDate = new Date();
  const week = [
    'Hour/Day',
    'Sunday',
    'Monday',
    'Thuesday',
    'Wenesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const hours = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00'
  ];

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getClasses());
  }, []);

  useEffect(() => {
    setSubs(memberSearch('testing@member.com', subsData.list));
  }, []);

  const dateConverter = (someDate) => {
    someDate = new Date(someDate);
    return new Date(someDate.getTime() + someDate.getTimezoneOffset() * 60000);
  };

  const matcherClass = (subs, scheduleDay, scheduleHour) => {
    let resp;
    subs.forEach((sub) => {
      const date = dateConverter(sub.date);
      const dateHour = date.getHours() + ':' + date.getMinutes() + 0;
      if (scheduleDay === date.getDay() && scheduleHour === dateHour) {
        classData.list.forEach((classes) => {
          if (classes._id === sub.classes._id) {
            resp = classes.activity.name;
          }
        });
      }
    });
    return resp;
  };

  const memberSearch = (email, subs) => {
    const selectedSubs = [];
    subs.forEach((sub) => {
      sub.members.forEach((memb) => {
        if (memb.email === email) {
          selectedSubs.push(sub);
        }
      });
    });
    return selectedSubs;
  };

  return (
    <div className={styles.scheduleContainer}>
      <p>{`${nowDate.getFullYear()} ${nowDate.getMonth() + 1}`}</p>
      <table className={styles.scheduleTable}>
        <tr>
          {week.map((day) => (
            <th key={day}> {day} </th>
          ))}
        </tr>
        {hours.map((hour) => (
          <tr key={hour} className={styles.tr}>
            <td>{hour}</td>
            <td>{'CLOSED'}</td>
            <td>{matcherClass(subs, 1, hour) ?? ``}</td>
            <td>{matcherClass(subs, 2, hour) ?? ``}</td>
            <td>{matcherClass(subs, 3, hour) ?? ``}</td>
            <td>{matcherClass(subs, 4, hour) ?? ``}</td>
            <td>{matcherClass(subs, 5, hour) ?? ``}</td>
            <td>{matcherClass(subs, 6, hour) ?? ``}</td>
          </tr>
        ))}
      </table>
      {showAlert && (
        <ModalAlert title="Show" message="Testing" onClick={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default SharedSchedule;

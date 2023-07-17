import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions } from 'redux/subscriptions/thunks';
import { getClasses } from 'redux/classes/thunks';

import { ModalSchedule } from 'Components/Shared';
import styles from 'Components/Shared/SharedSchedule/shared-schedule.module.css';

const SharedSchedule = ({ user }) => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [subs, setSubs] = React.useState([]);
  const [selectedSub, setSelectedSub] = React.useState({});
  const [selectedClass, setSelectedClass] = React.useState({});
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
    if (sessionStorage.role === 'MEMBER') {
      setSubs(memberSearch(user.email, subsData.list));
    } else if (sessionStorage.role === 'TRAINER') {
      setSubs(trainerSearch(user, subsData.list));
    }
  }, [sessionStorage.role]);

  useEffect(() => {
    console.log('lol');
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
            resp = classes;
          }
        });
      }
    });
    return resp;
  };

  const matcherSub = (subs, scheduleDay, scheduleHour) => {
    let res;
    subs.forEach((sub) => {
      const date = dateConverter(sub.date);
      const dateHour = date.getHours() + ':' + date.getMinutes() + 0;
      if (scheduleDay === date.getDay() && scheduleHour === dateHour) {
        res = sub;
      }
    });
    return res;
  };

  const trainerSearch = (user, subs) => {
    try {
      const selectedSubs = [];
      subs.forEach((sub) => {
        if (sub.trainer._id === user._id) {
          selectedSubs.push(sub);
        }
      });
      return selectedSubs;
    } catch (error) {
      console.log(error);
    }
  };

  const memberSearch = (email, subs) => {
    try {
      const selectedSubs = [];
      subs.forEach((sub) => {
        sub.members.forEach((memb) => {
          if (memb.email === email) {
            selectedSubs.push(sub);
          }
        });
      });
      return selectedSubs;
    } catch (error) {
      console.log(error);
    }
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
            <td>
              <a
                onClick={() => {
                  setSelectedClass(matcherClass(subs, 1, hour));
                  setSelectedSub(matcherSub(subs, 1, hour));
                  setShowAlert(true);
                }}
              >
                {matcherClass(subs, 1, hour)?.activity.name ?? ``}
              </a>
            </td>
            <td>{matcherClass(subs, 2, hour)?.activity.name ?? ``}</td>
            <td>{matcherClass(subs, 3, hour)?.activity.name ?? ``}</td>
            <td>{matcherClass(subs, 4, hour)?.activity.name ?? ``}</td>
            <td>{matcherClass(subs, 5, hour)?.activity.name ?? ``}</td>
            <td>{matcherClass(subs, 6, hour)?.activity.name ?? ``}</td>
          </tr>
        ))}
      </table>
      {showAlert && (
        <ModalSchedule
          role={sessionStorage.role}
          objSub={selectedSub}
          objClass={selectedClass}
          onClick={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default SharedSchedule;

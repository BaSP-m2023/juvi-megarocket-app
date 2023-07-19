import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions } from 'redux/subscriptions/thunks';
import { getClasses } from 'redux/classes/thunks';

import { ModalSchedule } from 'Components/Shared';
import styles from 'Components/Shared/SharedSchedule/shared-schedule.module.css';

const SharedSchedule = ({ user, showAll, testId }) => {
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
    if (sessionStorage.role === 'MEMBER' && showAll !== true) {
      setSubs(memberSearch(user.email, subsData.list));
    } else if (sessionStorage.role === 'TRAINER' && showAll !== true) {
      setSubs(trainerSearch(user, subsData.list));
    } else if (showAll === true) {
      setSubs(subsData.list);
    }
  }, [sessionStorage.role, subsData.list, classData.list]);

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
        if (sub?.classes?.trainer === user._id) {
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
      subs?.forEach((sub) => {
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

  const showTds = (hour, num) => {
    return (
      <td>
        <a
          onClick={() => {
            onClick(matcherClass(subs, num, hour), matcherSub(subs, num, hour), true);
          }}
        >
          {matcherClass(subs, num, hour)?.activity.name ?? ``}
        </a>
      </td>
    );
  };

  const onClick = (selectedClass, selectedSub, showAlert) => {
    setSelectedClass(selectedClass);
    setSelectedSub(selectedSub);
    setShowAlert(showAlert);
  };

  return (
    <div className={styles.scheduleContainer}>
      <p>{`${nowDate.getFullYear()} ${nowDate.getMonth() + 1}`}</p>
      <table className={styles.scheduleTable} data-testid={testId}>
        <tr>
          {week.map((day) => (
            <th key={day}> {day} </th>
          ))}
        </tr>
        {hours.map((hour) => (
          <tr key={hour} className={styles.tr}>
            <td>{hour}</td>
            <td>{'CLOSED'}</td>
            {showTds(hour, 1)}
            {showTds(hour, 2)}
            {showTds(hour, 3)}
            {showTds(hour, 4)}
            {showTds(hour, 5)}
            {showTds(hour, 6)}
          </tr>
        ))}
      </table>
      {showAlert && (
        <ModalSchedule
          memberSearch={memberSearch}
          user={user}
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

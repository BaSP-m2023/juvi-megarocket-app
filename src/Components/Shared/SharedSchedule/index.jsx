import React from 'react';
import { Button, ModalAlert } from 'Components/Shared';
import styles from 'Components/Shared/Schedule/shared-schedule.module.css';

const SharedSchedule = () => {
  const [showAlert, setShowAlert] = true;
  const week = ['Sunday', 'Monday', 'Thuesday', 'Wenesday', 'Thursday', 'Friday', 'Saturday'];
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

  return (
    <div className={styles.scheduleContent}>
      <div>
        <Button>{'< Prev week'}</Button>
        <Button>{'Next Week >'}</Button>
      </div>
      <tr>
        {week.map((day) => (
          <th key={day}>{day}</th>
        ))}
      </tr>
      <tr>
        {hours.map((hour) => (
          <td key={hour}>{hour}</td>
        ))}
      </tr>
      {showAlert && (
        <ModalAlert title="Show" message="Testing" onClick={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default SharedSchedule;

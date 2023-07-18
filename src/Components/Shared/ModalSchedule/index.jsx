import React from 'react';
import styles from 'Components/Shared/ModalSchedule/modal-schedule.module.css';

const ModalSchedule = ({ role, objClass, objSub, onClick }) => {
  // add user to props
  const rulerCheck = (role) => {
    if (role === 'MEMBER') {
      return (
        <button
          className={styles.subButton}
          onClick={console.log('Should edit subscription and .push the new member')}
        >
          {'Subscribe'}
        </button>
      );
    } else if (role === 'TRAINER') {
      return (
        <div>
          <p>{`Members:`}</p>
          {objSub &&
            objSub.members.map((memb) => (
              <div key={memb._id}>{`${memb.firstName} ${memb.lastName}`}</div>
            ))}
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']} data-testid="modal-schedule">
        <img
          className={styles.close}
          src={`${process.env.PUBLIC_URL}/assets/images/borrar.png`}
          onClick={onClick}
        ></img>
        <h1>Class:</h1>
        {objClass && <p className={styles.activityName}>{objClass.activity.name}</p>}
        {objClass && <p>{`Trainer: ${objClass.trainer.firstName} ${objClass.trainer.lastName}`}</p>}
        {objClass && <p className={styles.slots}>{`Slots: ${objClass.slots}`}</p>}
        {rulerCheck(role)}
      </div>
    </div>
  );
};

export default ModalSchedule;

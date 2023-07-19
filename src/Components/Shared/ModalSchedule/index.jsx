import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionById, editSubscription } from 'redux/subscriptions/thunks';
import styles from 'Components/Shared/ModalSchedule/modal-schedule.module.css';

const ModalSchedule = ({ role, user, objClass, objSub, onClick }) => {
  // add user to props
  const [newSub, setNewSub] = useState({});
  const dispatch = useDispatch();
  const subData = useSelector((state) => state.subscriptions);

  useEffect(() => {
    dispatch(getSubscriptionById());
  }, [subData.item, newSub]);

  const rulerCheck = (role) => {
    if (role === 'MEMBER') {
      if (checkSubscribe(objSub)) {
        return (
          <button
            className={styles.subButton}
            onClick={() => {
              addMemberToSub(objSub, user._id);
              dispatch(editSubscription(objSub._id, newSub));
            }}
          >
            {'Subscribe'}
          </button>
        );
      } else {
        return <p>{`You're subscribed for this class`}</p>;
      }
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
      return (
        <button
          className={styles.subButton}
          onClick={console.log('Should edit subscription and .push the new member')}
        >
          {'subscribe'}
        </button>
      );
    }
  };

  const checkSubscribe = (sub) => {
    if (sub === subData.item) {
      console.log('Yes');
      return true;
    } else {
      return false;
    }
  };

  const addMemberToSub = (sub, membId) => {
    setNewSub(sub.members.push(membId));
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

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editSubscription } from 'redux/subscriptions/thunks';
import styles from 'Components/Shared/ModalSchedule/modal-schedule.module.css';

const ModalSchedule = ({ user, objClass, objSub, onClick }) => {
  const [newSub, setNewSub] = useState({});
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) {
      dispatch(editSubscription(objSub._id, newSub));
    }
  }, [newSub]);

  const rulerCheck = (slots) => {
    if (sessionStorage.role === 'MEMBER') {
      if (checkSubscribe(objSub)) {
        return (
          <button
            className={styles.subButton}
            onClick={() => {
              addMemberToSub(objSub, user._id, slots);
            }}
          >
            {'subscribe'}
          </button>
        );
      } else {
        return <p>{`You're subscribed for this class`}</p>;
      }
    } else if (sessionStorage.role === 'TRAINER') {
      return (
        <div>
          <p>{`Members:`}</p>
          {objSub &&
            objSub.members.map((memb) => (
              <div key={memb._id}>{`${memb.firstName} ${memb.lastName}`}</div>
            ))}
        </div>
      );
    }
  };

  const checkSubscribe = (sub) => {
    let flag = false;
    sub.members.forEach((memb) => {
      if (memb._id === user._id) {
        flag = true;
      }
    });
    if (flag) {
      return false;
    } else {
      return true;
    }
  };

  const addMemberToSub = (sub, membId, slots) => {
    try {
      let flag = false;
      let subsId = [];

      if (membId !== undefined) {
        sub.members.forEach((memb) => {
          if (memb !== undefined) {
            subsId.push(memb._id);
          }
        });
        subsId.forEach((memb) => {
          if (memb === membId) {
            flag = true;
          }
        });
      }

      if (flag !== true) {
        subsId.push(membId);
        sub.members = subsId;
      }

      if (sub.classes?._id !== undefined) {
        sub.classes = sub.classes._id;
      }

      if (sub.members.length < slots) {
        setNewSub(sub);
        setEdit(true);
      } else {
        console.log('Maximum capacity reached');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']} data-testid="modal-schedule">
        <a className={styles.a} onClick={onClick}>
          X
        </a>
        {objClass && <p>{objClass.activity.name}</p>}
        {objClass && <p>{`Trainer: ${objClass.trainer.firstName} ${objClass.trainer.lastName}`}</p>}
        {objClass && <p>{`Slots: ${objSub.members.length}/${objClass.slots}`}</p>}
        {rulerCheck(objClass.slots)}
      </div>
    </div>
  );
};

export default ModalSchedule;

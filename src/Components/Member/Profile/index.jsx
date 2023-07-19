/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from 'Components/Admin/Members/MemberForm/form.module.css';
import { schema } from 'Components/Admin/Members/MemberForm/memberFormValidations';
import { ModalAlert, Button, Input, Profile } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { putMember } from 'redux/members/thunks';

import { getSubscriptions } from 'redux/subscriptions/thunks';
import { getClasses } from 'redux/classes/thunks';

const MemberProfile = () => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { data: member } = useSelector((state) => state.auth);
  const subList = useSelector((state) => state.subscriptions.list);
  const classList = useSelector((state) => state.classes.list);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getClasses());
    if (member) {
      console.log(member);
    }
  }, [member]);

  const selectedActivities = () => {
    let selectedActivities = [];
    let flag = false;
    subList.forEach((sub) => {
      sub.members.forEach((memb) => {
        if (memb._id === member._id) {
          classList.forEach((clas) => {
            if (clas._id === sub.classes._id) {
              selectedActivities.forEach((actv) => {
                if (actv._id === clas.activity._id) {
                  flag = true;
                }
              });
              if (!flag) {
                selectedActivities.push(clas.activity);
              }
            }
          });
        }
      });
    });
    return selectedActivities;
  };

  const handleClick = () => {
    const newUrl = '/member';
    history.replace(newUrl);
    window.location.reload();
  };

  return (
    <div>
      <Profile user={member} activities={selectedActivities()} />
    </div>
  );
};

export default MemberProfile;

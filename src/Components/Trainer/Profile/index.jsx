import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClasses } from 'redux/classes/thunks';
import { Profile } from 'Components/Shared';

const TrainerProfile = () => {
  const dispatch = useDispatch();
  const classData = useSelector((state) => state.classes);
  const { data: trainer } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getClasses());
    console.log(classData);
  }, []);

  const classSearcher = (classes) => {
    const activities = [];
    classes.forEach((clas) => {
      if (clas.trainer._id === trainer._id) {
        activities.push(clas.activity);
      }
    });
    return activities;
  };

  return (
    <div>
      <Profile user={trainer} activities={classSearcher(classData.list)} />
    </div>
  );
};

export default TrainerProfile;

//import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SharedSchedule } from 'Components/Shared/';

const Schedule = () => {
  const { data: trainer } = useSelector((state) => state.auth);

  return <SharedSchedule user={trainer} testId="trainer-schedule" />;
};

export default Schedule;

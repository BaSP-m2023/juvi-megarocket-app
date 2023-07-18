import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SharedSchedule } from 'Components/Shared/';

const Schedule = () => {
  const data = useSelector((state) => state.auth);
  const [trainer, setTrainer] = useState(data?.data ?? {});

  useEffect(() => {
    setTrainer(data.data);
  }, [data.data]);

  return <SharedSchedule user={trainer} testId="trainer-schedule" />;
};

export default Schedule;

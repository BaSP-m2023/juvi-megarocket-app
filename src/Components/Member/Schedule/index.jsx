import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SharedSchedule } from 'Components/Shared/';

const Schedule = () => {
  const data = useSelector((state) => state.auth);
  const [member, setMember] = useState(data?.data ?? {});

  useEffect(() => {
    setMember(data.data);
  }, [data.data]);

  return <SharedSchedule user={member} testId="member-schedule" />;
};

export default Schedule;

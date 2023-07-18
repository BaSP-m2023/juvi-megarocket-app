import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SharedSchedule } from 'Components/Shared/';

const Schedule = () => {
  const data = useSelector((state) => state.auth);
  const [member, setMember] = useState(data?.data ?? {});
  const [gralSchedule, setGralSchedule] = useState(false);
  const [changeSchedule, setChangeSchedule] = useState('Show general schedule');

  useEffect(() => {
    setMember(data.data);
  }, [data.data, gralSchedule, changeSchedule]);

  const onClick = () => {
    setGralSchedule(!gralSchedule);
    if (changeSchedule === 'Show general schedule') {
      setChangeSchedule('Show MY personal schedule');
    } else if (changeSchedule === 'Show MY personal schedule') {
      setChangeSchedule('Show general schedule');
    }
  };

  return (
    <div>
      <button onClick={onClick}>{`${changeSchedule}`}</button>
      {!gralSchedule && <SharedSchedule user={member} testId="member-schedule" />}
      {gralSchedule && <SharedSchedule showAll={true} testId="member-schedule2" />}
    </div>
  );
};

export default Schedule;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SharedSchedule, Button } from 'Components/Shared/';

const Schedule = () => {
  const data = useSelector((state) => state.auth);
  const [member, setMember] = useState(data?.data ?? {});
  const [gralSchedule, setGralSchedule] = useState(false);
  const [changeSchedule, setChangeSchedule] = useState('Main Schedule');

  useEffect(() => {
    setMember(data.data);
  }, [data.data, gralSchedule, changeSchedule]);

  const onClick = () => {
    setGralSchedule(!gralSchedule);
    if (changeSchedule === 'Main Schedule') {
      setChangeSchedule('My Schedule');
    } else if (changeSchedule === 'My Schedule') {
      setChangeSchedule('Main Schedule');
    }
  };

  return (
    <div>
      <h2>{changeSchedule}</h2>
      <Button type={changeSchedule} onClick={onClick} />
      {!gralSchedule && <SharedSchedule user={member} testId="member-schedule" />}
      {gralSchedule && <SharedSchedule user={member} showAll={true} testId="member-schedule2" />}
    </div>
  );
};

export default Schedule;

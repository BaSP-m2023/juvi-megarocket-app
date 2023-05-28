import Table from './Table';
import Button from './Button';
import { useState, useEffect } from 'react';
function Trainers() {
  const onClick = () => {
    console.log('click');
  };
  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/trainer/`)
      .then((response) => response.json())
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <section>
      <Button color="black" text="Add" onClick={onClick} />
      <Table data={trainers.data ? trainers.data : []} />
    </section>
  );
}
export default Trainers;

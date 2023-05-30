import Table from './Table';
import Button from './Button';
import Form from './Form';

import { useState, useEffect } from 'react';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <section>
      <Button color="black" text={isFormOpen ? 'Close' : 'Add'} onClick={toggleForm} />
      <Table data={trainers.data ? trainers.data : []} />
      {isFormOpen && <Form />}
    </section>
  );
}

export default Trainers;

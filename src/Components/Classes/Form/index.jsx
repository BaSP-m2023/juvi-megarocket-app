//import React, { useState, useEffect } from 'react';
//import styles from './classesForm.module.css';
//import { useHistory, useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import { Link } from 'react-router-dom';

const FormClasses = () => {
  //const { id } = useParams();

  return (
    <section>
      <h1>¡Hola!</h1>
      <Link to="/classes">
        <Button type="default"></Button>
      </Link>
    </section>
  );
};

export default FormClasses;

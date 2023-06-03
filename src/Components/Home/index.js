import styles from './home.module.css';
import React, { useState } from 'react';
import { ModalAlert } from '../Shared';

function Home() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleConfirmar = () => {
    // Lógica a ejecutar cuando se confirme el modal
    console.log('Modal confirmado');
    setMostrarModal(false);
  };
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <div>
        <button onClick={() => setMostrarModal(true)}>Mostrar Modal</button>

        {mostrarModal && (
          <ModalAlert texto="Este es el contenido del modal" onConfirmar={handleConfirmar} />
        )}
      </div>
      );
    </section>
  );
}

export default Home;

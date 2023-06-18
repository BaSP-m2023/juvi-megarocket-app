import styles from './classes.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import SharedTable from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, deleteClass } from '../../redux/classes/thunks';
import ModalAlert from '../Shared/ModalAlert';

const Classes = () => {
  const { list, isLoading } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const deleteClasses = (_id) => {
    dispatch(deleteClass(_id, setModalText, setShowModal));
  };

  const closeModal = () => {
    setShowModal(false);
    reloadPage();
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <section className={styles.containerClass}>
      <div className={styles.titleClass}>
        <h2>Classes</h2>
        <Link to="/admins/classes/form" className={styles.contButton}>
          <Button type="add" resource="Class" />
        </Link>
      </div>
      {isLoading ? (
        <div>Is Loading</div>
      ) : (
        <SharedTable data={list} editLink={'/admins/classes/form/'} handleDelete={deleteClasses} />
      )}
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </section>
  );
};

export default Classes;

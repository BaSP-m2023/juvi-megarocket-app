import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './admins.module.css';
import { getAdmins, deleteAdmin } from 'redux/admins/thunks';
import { Button, ModalAlert, SharedTable } from 'Components/Shared';

function Admins() {
  const [modalText, setModalText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onDelete = (id) => {
    dispatch(deleteAdmin(id, setModalText, setIsModalOpen));
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleAdmin}>
        <h2>Admins</h2>
        <Link to="/super-admin/admins/form">
          <Button type="add" resource="admin">
            Add Admin
          </Button>
        </Link>
      </div>
      {data.isLoading ? (
        <div>
          <h3>Is loading..</h3>
        </div>
      ) : (
        <SharedTable
          data={data.list}
          handleDelete={onDelete}
          editLink="/super-admin/admins/form/"
        />
      )}
      {isModalOpen && <ModalAlert text={modalText} onClick={closeModal} />}
    </section>
  );
}

export default Admins;

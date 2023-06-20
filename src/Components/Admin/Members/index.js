import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMembers, deleteMember } from 'redux/members/thunks';

import styles from './members.module.css';
import { ModalAlert } from 'Components/Shared';
import Button from 'Components/Shared/Button';
import SharedTable from 'Components/Shared/Table';

function Members(props) {
  const [modal, setModal] = useState(false);
  const data = useSelector((state) => state.members);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  const delMember = (id) => {
    dispatch(deleteMember(id));
    setModal(!modal);
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleMembers}>
        <h2>Members</h2>
        <Button
          type={'add'}
          resource={'Member'}
          onClick={() => props.history.push('/admins/members/form')}
        />
      </div>
      {data.isLoading && <h1>Loading</h1>}
      {!data.isLoading && (
        <SharedTable data={data.list} handleDelete={delMember} editLink={'/admins/members/form/'} />
      )}
      {modal && (
        <ModalAlert
          text={'Member deleted successfully'}
          onClick={() => {
            setModal(!modal);
            props.history.push('/admins/members');
          }}
        />
      )}
    </section>
  );
}

export default Members;

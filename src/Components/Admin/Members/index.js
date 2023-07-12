import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMembers, deleteMember } from 'redux/members/thunks';

import styles from './members.module.css';
import { ModalAlert } from 'Components/Shared';
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
    <section className={styles.container} data-testid="admin-members-section">
      <div className={styles.titleMembers}>
        <h2>Members</h2>
      </div>
      {data.isLoading && <h1>Loading</h1>}
      {!data.isLoading && (
        <SharedTable
          data={data.list}
          handleDelete={delMember}
          editLink={'/admin/members/form/'}
          testId="admin-members-table"
        />
      )}
      {modal && (
        <ModalAlert
          text={'Member deleted successfully'}
          onClick={() => {
            setModal(!modal);
            props.history.push('/admin/members');
          }}
        />
      )}
    </section>
  );
}

export default Members;

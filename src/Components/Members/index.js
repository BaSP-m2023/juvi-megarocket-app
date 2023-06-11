import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMembers, deleteMember } from '../../redux/members/thunks';

import styles from './members.module.css';
import { SharedTable, Button } from '../Shared';

function Members(props) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const data = useSelector((state) => state.members);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers(setLoading));
    setMembers(data.list);
  }, [members]);

  const delMember = (id) => {
    dispatch(deleteMember(id));
    setMembers(members.filter((member) => member._id !== id));
  };

  return (
    <section className={styles.container}>
      <Button
        type={'add'}
        resource={'Member'}
        onClick={() => props.history.push('/members/form')}
      />
      {loading && <h1>Loading</h1>}
      {!loading && (
        <SharedTable data={data.list} handleDelete={delMember} editLink={'members/form/'} />
      )}
    </section>
  );
}

export default Members;

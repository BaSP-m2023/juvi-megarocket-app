import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMembers, deleteMember } from '../../redux/members/thunks';

import styles from './members.module.css';
import { SharedTable, Button } from '../Shared';

function Members(props) {
  const data = useSelector((state) => state.members);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  return (
    <section className={styles.container}>
      <Button
        type={'add'}
        resource={'Member'}
        onClick={() => props.history.push('/members/form')}
      />
      <SharedTable
        data={data.list}
        handleDelete={dispatch(deleteMember)}
        editLink={'members/form/'}
      />
    </section>
  );
}

export default Members;

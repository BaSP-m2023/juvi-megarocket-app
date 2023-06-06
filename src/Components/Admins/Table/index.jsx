import { SharedTable } from '../../Shared';

const Table = (props) => {
  const deleteAdmin = (admin) => {
    props.deleteAdmin(admin);
  };

  return (
    <>
      <SharedTable data={props.data} handleDelete={deleteAdmin} editLink="/admins/AdminForm/" />
    </>
  );
};

export default Table;

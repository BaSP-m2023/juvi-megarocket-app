import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/thunks';

function Home() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(logout());
      }}
    >
      SALIR
    </button>
  );
}

export default Home;

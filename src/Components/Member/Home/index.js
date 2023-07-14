import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/thunks';

function Home() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        SALIR
      </button>
    </div>
  );
}

export default Home;

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { reset } from "../features/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    navigate("/");
    dispatch(reset());
    dispatch(logout());
  };

  return (
    <>
      <header className='header'>
        <Link to='/' className='logo'>
          Support Desk
        </Link>

        <ul>
          {user ? (
            <li>
              <button className='btn' onClick={onLogout}>
                LogOut
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}

export default Header;

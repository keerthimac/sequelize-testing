import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className='header'>
        <Link to='/' className='logo'>
          Support Desk
        </Link>
        <ul>
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        </ul>
      </header>
    </>
  );
}

export default Header;

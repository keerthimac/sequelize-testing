import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = fromData;
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isLoading) {
      <Spinner />;
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isLoading, isSuccess, user, message, dispatch, navigate]);

  const onChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(fromData));
  };

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              className='form-control'
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your Email'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              className='form-control'
              id='password'
              value={password}
              onChange={onChange}
              placeholder='Enter Password'
            />
          </div>

          <button className='btn btn-block'>Submit</button>
        </form>
      </section>
    </>
  );
}

export default Login;

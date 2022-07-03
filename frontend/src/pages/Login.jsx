import { useState } from "react";
import { FaUser } from "react-icons/fa";

function Login() {
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = fromData;

  const onChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(fromData);
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

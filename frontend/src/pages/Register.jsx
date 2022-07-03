import { useState } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = fromData;

  const onChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              className='form-control'
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
            />
          </div>
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
          <div className='form-group'>
            <input
              type='password'
              name='confirmPassword'
              className='form-control'
              id='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              placeholder='confirm Password'
            />
          </div>
          <button className='btn btn-block'>Submit</button>
        </form>
      </section>
    </>
  );
}

export default Register;
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createTicket } from "../features/ticket/ticketSlice";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [formData, setFormData] = useState({
    product: "",
    description: "",
  });

  const { product, description } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isLoading) {
      <Spinner />;
    }
    if (isSuccess) {
      toast.success(message);
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isLoading, isSuccess, user, dispatch, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (product === "" || description === "") {
      toast.error("Please Fill all fields");
    } else {
      dispatch(createTicket(formData));
    }
  };

  return (
    <>
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the from below</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='from-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer email</label>
          <input type='text' className='from-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }>
              <option disabled={true} value=''>
                --Choose and option--
              </option>
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='product'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              value={description}
              className='form-control'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder='please describe the issue'></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;

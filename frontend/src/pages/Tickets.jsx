import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getTickets } from "../features/ticket/ticketSlice";
import { reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";

function Tickets() {
  const dispatch = useDispatch();
  const { tickets, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(reset());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTickets());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch]);

  if (isLoading) {
    <Spinner />;
  }
  return <h1>Tickets</h1>;
}

export default Tickets;

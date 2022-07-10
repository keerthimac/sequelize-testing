import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  //   console.log(ticket);
  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString("en-Us")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket.id}`} className='btn btn-reverse btn-small'>
        View
      </Link>
    </div>
  );
}

export default TicketItem;

import axios from "axios";

const API_URL = "/api/tickets";

//Create Ticket
const createTicket = async (ticket, token) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticket, config);

  //   if (response.data) {
  //     localStorage.setItem("", JSON.stringify(response.data));
  //   }
  return response.data;
};

const ticketService = {
  createTicket,
};

export default ticketService;
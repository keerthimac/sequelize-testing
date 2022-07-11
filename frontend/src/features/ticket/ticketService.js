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

//Get Tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

//Get Ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `/${ticketId}`, config);

  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
};

export default ticketService;

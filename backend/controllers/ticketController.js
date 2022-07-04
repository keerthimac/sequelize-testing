const asyncHandler = require("express-async-handler");
const db = require("../models");

const User = db.user;
const Ticket = db.ticket;

// @desc Get user Tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  const { id } = req.user;

  if (!req.user) {
    res.status(400);
    throw new Error("user not found");
  }

  const tickets = await Ticket.findAll({
    where: {
      userId: id,
    },
  });
  res.status(200).json(tickets);
});

// @desc Create ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  const { id } = req.user;

  if (!product || !description) {
    res.status(400);
    throw new Error("please add a product and description");
  }

  const ticket = await Ticket.create({ product, description, userId: id });
  res.status(200).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
};

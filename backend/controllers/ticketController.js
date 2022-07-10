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
    attributes: ["id", "product", "description", "createdAt"],
    include: {
      model: User,
      where: { Id: id },
      attributes: ["id"],
    },
  });
  res.status(200).json(tickets);
});

// @desc Create new ticket
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

// @desc Get user Ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const ticketId = req.params.id;

  const ticket = await Ticket.findOne({
    attributes: ["product", "description"],
    include: {
      model: User,
      where: { id: id },
      attributes: ["id"],
    },
    where: { id: ticketId },
  });

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  res.status(200).json(ticket);
});

// @desc Update Ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const ticketId = req.params.id;

  const ticket = await Ticket.findOne({
    attributes: ["id", "product", "description"],
    include: {
      model: User,
      where: { id: id },
      attributes: ["id"],
    },
    where: { id: ticketId },
  });

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.id !== id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  await ticket.set(req.body);
  await ticket.save();

  res.status(200).json(ticket);
});

// @desc Delete Ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const ticketId = req.params.id;

  const ticket = await Ticket.findOne({
    attributes: ["id", "product", "description"],
    include: {
      model: User,
      where: { id: id },
      attributes: ["id"],
    },
    where: { id: ticketId },
  });

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.id !== id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  await ticket.destroy();

  res.status(200).json("Ticket Deleted");
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
};

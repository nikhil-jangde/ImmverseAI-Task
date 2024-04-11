const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");


router.get("/tickets", async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});


router.get("/tickets/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.json(ticket);
});


router.put("/bookTicket/:id", async (req, res) => {
  const { username, email, title, description, price, userId } = req.body;
  const ticketId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    if (user.bookings != null) {
      const existingTicket = user.bookings.find(
        (ticket) => ticket.ticketId.toString() === ticketId
      );
      if (existingTicket) {
        return res
          .status(400)
          .json({ error: "Ticket already booked by the user" });
      }
    }


    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { $set: { availability: false, booked: true } },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    user.bookings.push({
      ticketId: ticket._id,
      username,
      email,
      title,
      description,
      price,
      status: "booked",
    });
    await user.save();

    res.status(200).json({ message: "Ticket added to user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/cancelTicket/:id", async (req, res) => {
  const { userId } = req.body;
  const ticketId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    const bookingToCancel = user.bookings.find(
      (booking) => booking.ticketId.toString() === ticketId
    );

    if (!bookingToCancel) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update the status of the booking to "cancelled"
    bookingToCancel.status = "cancelled";
    await user.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  availability:Boolean,
  booked:Boolean
});

module.exports = mongoose.model('Ticket', ticketSchema);

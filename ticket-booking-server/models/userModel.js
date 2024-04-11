const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket', 
    required: true,
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ['booked', 'cancelled'], 
    default: 'booked', 
  },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings: [bookingSchema], // Array of bookings using the booking schema
});

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/userRoutes')

const app = express();
app.use(express.json());
app.use(cors())

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/api', ticketRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

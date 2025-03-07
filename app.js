require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const { PORT } = require('./config');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
})
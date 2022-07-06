const express = require('express'); //Adding Express
const mongoose = require('mongoose'); //Adding MongoDB

const stuffRoutes = require('./routes/stuff'); //Import routes
const userRoutes = require('./routes/user');

const app = express();

// ADDING HERE MONGO LINK //

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//middleware
app.use(express.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

//To be use anywhere on the project
module.exports = app;
const express = require('express'); //Adding Express
const mongoose = require('mongoose'); //Adding MongoDB
const path = require('path');


const stuffRoutes = require('./routes/stuff'); //Import routes
const userRoutes = require('./routes/user');

const app = express();

// ADDING HERE MONGO LINK //
Mongo = mongoose.connect('mongodb+srv://ChrisAd:12uiZ*gymcYSad4l&Hkf@api-test.p0b2q.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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
app.use('/images', express.static(path.join(__dirname, 'images')));

//To be use anywhere on the project
module.exports = app;
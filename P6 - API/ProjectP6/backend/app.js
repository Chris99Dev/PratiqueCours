const express = require('express'); //Adding Express
const mongoose = require('mongoose'); //Adding MongoDB

const Thing = require('./models/Thing');

const app = express();

mongoose.connect('mongodb+srv://ChrisAd:cgpDIBeVDFDgAKVF@api-test.p0b2q.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//POST objet on DataBase
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id; //Delete the Id from the Thing
    const thing = new Thing({ //Creating a New Thing
        ...req.body //Get all the information from the Thing Model
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistre !' }))
        .catch(error => res.status(400).json({ error }));
});

//Modify Object
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

//GET all Thing from the DataBase
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

//GET One Thing
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

//Delete One Object
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

//To be use anywhere on the project
module.exports = app;
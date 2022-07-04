const Thing = require('../models/Thing');

//Create an Object
exports.creatThing = (req, res, next) => {
    delete req.body._id; //Delete the Id from the Thing
    const thing = new Thing({ //Creating a New Thing
        ...req.body //Get all the information from the Thing Model
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistre !' }))
        .catch(error => res.status(400).json({ error }));
};

//Modify an Object
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//Delete an Object
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

//Get One Object
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

//Get All objects
exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};
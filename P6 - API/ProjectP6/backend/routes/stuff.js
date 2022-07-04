const express = require('express');
const router = express.Router();

//Import Controller for Stuff
const stuffCtrl = require('../controllers/stuff');

router.post('/', stuffCtrl.creatThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.get('/:id', stuffCtrl.getOneThing);
router.get('/', stuffCtrl.getAllThings);

module.exports = router;
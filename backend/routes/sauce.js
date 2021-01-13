const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
//router.get('/:id', auth, stuffCtrl.getOneThing);
//router.put('/:id', auth, multer, stuffCtrl.modifyThing);
//router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;
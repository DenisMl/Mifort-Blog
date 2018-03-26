let express = require('express');
let router = express.Router();
let apiController = require('../controllers/apiController');

router.get('/getUserInfo', apiController.getUserInfo);
router.get('/getPublications', apiController.getPublications);
router.post('/addPublication', apiController.addPublication);
router.post('/getPublication', apiController.getPublication);
router.post('/getUsersByIDs', apiController.getUsersByIDs);
router.post('/deletePublication', apiController.deletePublication);

module.exports = router;

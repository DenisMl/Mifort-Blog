let express = require('express');
let router = express.Router();
let apiController = require('../controllers/apiController');

router.get('/getUserInfo', apiController.getUserInfo);
router.get('/getPublications', apiController.getPublications);
router.post('/addPublication', apiController.addPublication);
router.post('/deleteProject', apiController.deleteProject);
router.post('/createTask', apiController.createTask);
router.post('/deleteTask', apiController.deleteTask);
router.post('/addDevToProject', apiController.addDevToProject);
router.post('/addDevToTask', apiController.addDevToTask);
router.get('/getAllDevs', apiController.getAllDevs);
router.post('/getProjectDevelopers', apiController.getProjectDevelopers);
router.post('/getTaskDevelopers', apiController.getTaskDevelopers);
router.post('/changeTaskStatus', apiController.changeTaskStatus);
router.post('/addComment', apiController.addComment);
router.post('/getCommentsAuthors', apiController.getCommentsAuthors);


module.exports = router;

let User = require('../models/user');
let Publication = require('../models/publication');
let async = require('async');

let apiController = {};

apiController.getUserInfo = function (req, res) {
  let userInfo = {};

  async.waterfall([
    function (callback) {
      User.findOne({
        _id: req.session.user
      }, callback);
    },
    function (user, callback) { //1st arg: user or null
      if (user) {
        userInfo = {
          'id': user._id,
          'email': user.email,
          'firstName': user.firstName,
          'lastName': user.lastName,
          'isManager': user.isManager
        };
        callback(null, userInfo);
      } else {
        callback('user not found');
      }
    }
  ], function (err, userInfo) {
    if (err) {
      console.error('>> ' + err);
      res.redirect('/login');
    } else {
      res.json(userInfo);
    }
  });
};

apiController.getPublications = function (req, res) {
  Publication.find({}, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  })
};

apiController.getPublication = function (req, res) {
  Publication.findById(req.body.id, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  })
};

apiController.addPublication = function (req, res) {
  Publication.findOne({publicationName: req.body.publicationName}, function (err, doc) {
    if (doc) {
      res.send('Publication with this name already exists');
    } else {
      let publication = new Publication({publicationName: req.body.publicationName, author: req.session.user});
      publication.save(function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          // res.send(doc);
          apiController.getPublications(req, res);
        }
      });
    }
  });
};

apiController.deleteProject = function (req, res) {
  Project.findByIdAndRemove(req.body.projectId, function (err, project) {
    if (err) {
      console.error('>> ' + err);
      res.end();
    }
    res.send(project);
  });
};

apiController.deleteTask = function (req, res) {
  Project.findByIdAndUpdate(req.body.projectId, { //id of project
    $pull: {
      'tasks': {
        _id: req.body.taskId
      }
    }
  }, function (err, task) {
    if (err) {
      console.error('>> ' + err);
      res.end();
    } else {
      res.send(task);
    }
  });
};

apiController.createTask = function (req, res) {
  Project.findByIdAndUpdate(req.body.projectId, { //id of project
    $push: {
      'tasks': {
        taskName: req.body.taskName,
        author: req.session.user
      }
    }
  }, {
    upsert: true,
    new: true
  }, function (err, task) {
    if (err) {
      console.error('>> ' + err);
      res.end();
    } else {
      res.send(task);
    }
  });
};

apiController.addDevToProject = function (req, res) {
  let developers;
  async.waterfall([
    function (callback) {
      Project.findById(req.body.projectId, 'developers', callback);
    },
    function (project, callback) {
      developers = project.developers;
      req.body.devsId.map(function (devId) {
        if (project.developers.indexOf(devId) === -1) { //includes don't work properely
          developers.push(devId);
        }
      });
      callback(null, developers);
    },
    function (developers, callback) {
      Project.findByIdAndUpdate(req.body.projectId, {
        developers: developers
      }, {
        new: true
      }, callback);
    }
  ], function (err, updProj) {
    if (err) {
      console.error('>> ' + err);
      res.end();
    } else {
      res.send(updProj.developers);
    }
  });
};

apiController.getAllDevs = function (req, res) {
  User.find({
    isManager: false
  }, function (err, users) {
    if (err) {
      console.error('>> Users not found' + err);
      res.end();
    } else {
      users = users.map((user) => {
        return {
          'email': user.email,
          'firstName': user.firstName,
          'lastName': user.lastName,
          '_id': user._id,
          'created': user.created
        }
      });
      res.json(users);
    }
  });
};

apiController.getProjectDevelopers = function (req, res) {
  User.find({
    _id: {
      $in: req.body.projectDevelopers
    }
  }, function (err, developers) {
    if (err) {
      console.error('>> Users not found' + err);
      res.end();
    } else {
      developers = developers.map((user) => {
        return {
          'email': user.email,
          'firstName': user.firstName,
          'lastName': user.lastName,
          '_id': user._id,
          'created': user.created
        }
      });
      res.json(developers);
    }
  });
};

apiController.getTaskDevelopers = function (req, res) {
  User.find({
    _id: {
      $in: req.body.taskDevelopers
    }
  }, function (err, developers) {
    if (err) {
      console.error('>> Users not found' + err);
      res.end();
    } else {
      developers = developers.map((user) => {
        return {
          'email': user.email,
          'firstName': user.firstName,
          'lastName': user.lastName,
          '_id': user._id,
          'created': user.created
        }
      });
      res.json(developers);
    }
  });
};

apiController.addDevToTask = function (req, res) {
  let developers;
  async.waterfall([
    function (callback) {
      Project.findOne({
        '_id': req.body.projectId
        // 'tasks._id': req.body.taskId
      }, callback);
    },
    function (project, callback) {
      let task = project.tasks.find(function (task) {
        if (task._id == req.body.taskId) {
          return true;
        }
      });
      developers = task.developers;
      req.body.devsId.map(function (devId) {
        if (task.developers.indexOf(devId) === -1) {
          developers.push(devId);
        }
      });
      callback(null, developers);
    },
    function (developers, callback) {
      Project.findOneAndUpdate({
        '_id': req.body.projectId,
        'tasks._id': req.body.taskId
      }, {
        $set: {
          'tasks.$.developers': developers
        }
      }, {
        new: true
      }, callback);

    }
  ], function (err, updProj) {
    if (err) {
      console.error('>> ' + err);
      res.end();
    } else {
      let taskDevelopers = updProj.tasks.find(function (task) {
        if (task._id == req.body.taskId) {
          return true;
        }
      }).developers;
      res.send(taskDevelopers);
    }
  });
};

apiController.changeTaskStatus = function (req, res) {
  Project.findOneAndUpdate({
    '_id': req.body.projectId,
    'tasks._id': req.body.taskId
  }, {
    $set: {
      'tasks.$.status': req.body.status
    }
  }, function (err, updProj) {
    if (err) {
      console.error('>> ' + err);
      res.end();
    } else {
      res.send();
    }
  });
};

apiController.addComment = function (req, res) {
  Project.findOneAndUpdate({
    '_id': req.body.projectId,
    'tasks._id': req.body.taskId
  }, {
    $push: {
      'tasks.$.comments': {
        author: req.session.user,
        text: req.body.commentText
      }
    }
  }, {
    upsert: true,
    new: true
  }, function (err, updProj) {
    if (err) {
      console.error('>> ' + err);
      res.end();
    } else {
      let task = updProj.tasks.find(function (task) {
        if (task._id == req.body.taskId) {
          return true;
        }
      });
      let authorsIDs = task.comments.map(function (comment) {
        return comment.author;
      });
      res.json(authorsIDs);
    }
  });
};

apiController.getCommentsAuthors = function (req, res) {
  User.find({
    _id: {
      $in: req.body.authorsIDs
    }
  }, function (err, authors) {
    if (err) {
      console.error('>> Users not found' + err);
      res.end();
    } else {
      let result = authors.map((user) => {
        return {
          'email': user.email,
          'firstName': user.firstName,
          'lastName': user.lastName,
          '_id': user._id,
          'isManager': user.isManager
        }
      });
      res.json(result);
    }
  });
};

module.exports = apiController;

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
          'nickname': user.nickname
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
  Publication.find({}).sort('-created').exec(function (err, doc) {
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
      let publication = new Publication({
        publicationName: req.body.publicationName,
        publicationText: req.body.publicationText,
        tags: req.body.tags,
        author: req.session.user
      });
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

apiController.deletePublication = function (req, res) {
  Publication.findByIdAndRemove(req.body.publicationId, function (err, publication) {
    if (err) {
      res.send(err);
    } else {
      apiController.getPublications(req, res);
    }
  });
};

apiController.getUsersByIDs = function (req, res) {
  User.find({
    _id: {
      $in: req.body.usersIDs
    }
  }, function (err, users) {
    if (err) {
      console.error('Users not found: ' + err);
      res.end();
    } else {
      let result = users.map((user) => {
        return {
          'email': user.email,
          'nickname': user.nickname,
          '_id': user._id
        }
      });
      res.json(result);
    }
  });
};

module.exports = apiController;

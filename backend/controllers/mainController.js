let User = require('../models/user');
let async = require('async');
let path = require('path');
let mainController = {};

mainController.mainPage = function (req, res) {
  if (!req.session.user) {
    console.log(`>>NO session: ${req.session.user}`);
    // res.setHeader("Authorized", "false");
    res.setHeader("Set-Cookie", ["Authorized=false"]);
    res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
  } else {
    console.log(`>>session: ${req.session.user}`);
    // res.setHeader("Authorized", "true");
    res.setHeader("Set-Cookie", ["Authorized=true"]);
    res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
  }
};

mainController.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};

mainController.login = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  async.waterfall([
    function (callback) {
      User.findOne({
        email: email
      }, callback);
    },
    function (user, callback) {//1st arg: user or null
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user);
        } else {
          callback("Wrong password");
        }
      } else {
        callback("Unregistered user");
      }
    }
  ], function (err, user) {
    if (err) {
      console.log('>> ' + err);
      res.redirect('/login');
    } else {
      req.session.user = user._id;
      res.redirect('/');
    }
  });
};

mainController.register = function (req, res, next) {
  let email = req.body.email;
  let nickname = req.body.nickname;
  let password = req.body.password;
  let isManager = (req.body.isManager) ? true : false;

  async.waterfall([
    function (callback) {
      User.findOne({
        email: email
      }, callback);
    },
    function (user, callback) {
      if (user) {
        callback("User with this email already registered");
      } else {
        let user = new User({
          email: email,
          nickname: nickname,
          password: password,
          isManager: isManager
        });
        user.save(function (err) {
          if (err) {
            return next(err);
          } else {
            console.log('>>New User: ');
            console.log(user);
            callback(null, user);
          }
        });
      }
    }
  ], function (err, user) {
    if (err) {
      console.log('>> ' + err);
      res.redirect('/register');
    } else {
      req.session.user = user._id;
      res.redirect('/');
    }
  });

};

module.exports = mainController;

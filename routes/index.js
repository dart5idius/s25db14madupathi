var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

// Home page
router.get('/', function(req, res) {
  res.render('index', { title: 'xylophone App', user: req.user });
});

// GET Register
router.get('/register', function(req, res) {
  res.render('register', { title: 'xylophone App Registration' });
});

// POST Register
router.post('/register', function(req, res) {
  Account.findOne({ username: req.body.username })
    .then(function(user) {
      if (user != null) {
        console.log("User exists: " + req.body.username);
        return res.render('register', {
          title: 'Registration',
          message: 'Existing User',
          account: req.body.username
        });
      }

      let newAccount = new Account({ username: req.body.username });
      Account.register(newAccount, req.body.password, function(err, user) {
        if (err) {
          console.log("Database creation issue: " + err);
          return res.render('register', {
            title: 'Registration',
            message: 'Access error',
            account: req.body.username
          });
        }

        passport.authenticate('local')(req, res, function() {
          console.log('Success, redirecting');
          res.redirect('/');
        });
      });
    })
    .catch(function(err) {
      console.log("Error: ", err);
      return res.render('register', {
        title: 'Registration',
        message: 'Registration error',
        account: req.body.username
      });
    });
});

// GET Login
router.get('/login', function(req, res) {
  res.render('login', { title: 'xylophone App Login', user: req.user });
});

// POST Login
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      // Login failed
      return res.render('login', {
        title: 'xylophone App Login',
        message: 'Invalid username or password'
      });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

// GET Logout
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// GET Ping
router.get('/ping', function(req, res) {
  res.status(200).send("pong!");
});

module.exports = router;

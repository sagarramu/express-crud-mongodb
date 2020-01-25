var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.username) {
    res.render('dashboard', { title: 'Express' });
  } else {
    res.render('login', { title: 'Express' });
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

router.get('/dashboard', function (req, res, next) {
  if (req.session.username) {
    res.render('dashboard', { title: 'Express' });
  } else {
    res.render('login', { title: 'Express' });
  }
});

router.post('/dashboard', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  req.session.username = username;
  req.session.password = password;
  console.log('req.session.username' + req.session.username);
  res.render('dashboard', { title: 'Express' });
});


module.exports = router;

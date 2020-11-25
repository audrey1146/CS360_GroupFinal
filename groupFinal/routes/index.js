var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) 
{
  res.render('landing');
});

/* GET landing page. */
router.get('/login', function(req, res, next) 
{
  res.render('login');
});

/* GET landing page. */
router.get('/register', function(req, res, next) 
{
  res.render('register');
});

/* GET request for user. */
router.get('/home', function(req, res, next) 
{
  res.render('register');
});



module.exports = router;

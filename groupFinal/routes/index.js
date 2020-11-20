var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) 
{
  // Randomly select one of the images

  res.render('landing');
});

/* GET landing page. */
router.get('/login', function(req, res, next) 
{
  // Randomly select one of the images

  res.render('login');
});

module.exports = router;

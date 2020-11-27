/****************************************************************************
 * File Name:     userController.js
 * Date:          11/16/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Callback functions for the user schema
****************************************************************************/

let User = require('../models/user');
let DailyChoice = require('../models/dailychoice');
let async = require('async')

const {body,validationResult} = require("express-validator");

/****************************************************************************
Function:      user_landing
Description:   Render the landing page
****************************************************************************/
exports.user_landing = function(req, res, next) 
{
  res.render('landing');
}

/****************************************************************************
Function:      user_login
Description:   Render the login page
****************************************************************************/
exports.user_login = function(req, res, next)
{
  res.render('login');
}

/****************************************************************************
Function:      user_register
Description:   Render the registration page
****************************************************************************/
exports.user_register = function(req, res, next) 
{
  res.render('index', { title: 'Register'});
}

/****************************************************************************
Function:     user_home
Description:  Will check if the user has filled out the form yet. 
              If yes then the home page is the poll page, otherwise
              the home page will render the stats page
****************************************************************************/
exports.user_home = function(req, res, next) 
{
  DailyChoice.find({user_id: req.params.id}).exec(function (err, choices) 
  {
    if (err) throw err;
    // Successful, so render.

    if (choices != null) // Has choices - need to see if any are for today
    {
      let isChoice = false;
      let today = new Date ();

      for (let choice of choices)
      {
        if (today.getDate () == choice.TimeStamp.getDate ()
          && today.getMonth () == choice.TimeStamp.getMonth ()
          && today.getFullYear () == choice.TimeStamp.getFullYear ())
        {
          isChoice = true;
        }
      }

      if (true == isChoice) // Made choice today
      {
        res.redirect('/stats/' + req.params.id)
      }
      else // Has not made choice today
      {
        res.render('index', { title: 'Poll'});
      }
    }
    else // Has never made a choice
    {
      res.render('index', { title: 'Poll'});
    }
    
  })
}

/****************************************************************************
Function:      user_stats
Description:   Render the stats page
****************************************************************************/
exports.user_stats = function(req, res, next) 
{
  res.render('index', { title: 'Stats'});
}

/****************************************************************************
Function:      user_login_post
Description:   Verify the user exists
****************************************************************************/
exports.user_login_post = 
[
  body('username').notEmpty().withMessage('Username Required'),
  body('password').notEmpty().withMessage('Password Required'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
    {
      res.render('login', {errors: errors.array()});
    }
    else
    {
      User.findOne( { user_name: req.body.username, password: req.body.password }, function (err, result) 
      {
        if (err) throw err;
        
        if (result != null) // User exists
        {
          res.redirect('/home/' + result.ID)
        }
        else // User does not exist - reload login page
        {
          res.render('login', {missing: 'Could Not Find User'});
          return;
        }
      })
    }
  }
];
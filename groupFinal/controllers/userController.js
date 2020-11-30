/*****************************************************************************
 * File Name:     userController.js
 * Date:          11/16/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Callback functions for the user schema
 ****************************************************************************/

let User = require('../models/user');
let DailyChoice = require('../models/dailychoice');
let async = require('async')

const {body,validationResult} = require("express-validator");

const { checkSchema } = require('express-validator');
const { body, validationResult } = require('express-validator');

var callback = function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
}

exports.profile_edit = exports.user_add = async function(req, res) {
  let bIsValid = true;
  let msg ='Profile Update Unsuccessful';
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    bIsValid = false;
    // Add each validation error to the message that will be displayed
    errors.array().forEach(function (item, index) {
      msg += item.msg;
    })
  }


  // Validate all input

  // Validate that the username is unique
  let promiseUsername = new Promise(function (resolve, reject) {
    User.find({ user_name: req.body.user_name}, function (err, user) { 
      if (err){ 
          console.log(err); 
      } 
      else{ 
        if (user.length!=0) {
          msg += ' | Username already taken';
          bIsValid = false;
          resolve('valid');
        }
        else {
            resolve('invalid');
        }
      } 
    });

  });
 
  // Validate that the email is unique
  let promiseEmail = new Promise(function (resolve, reject) {
    User.find({ email: req.body.email}, function (err, user) { 
      if (err){ 
          console.log(err); 
      } 
      else{ 
        if (user.length!=0) {
          msg += ' | Email already taken';
          bIsValid = false;    
          resolve('valid');               
        }
          else {
            resolve('invalid');
          }
        } 
      });
  });
  
  await Promise.all([promiseUsername, promiseEmail]);

  userdetail = { 
    user_name: req.body.user_name,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    security_answer: req.body.security_answer
  }

  if(bIsValid) {
    userCreate(req.body.user_name, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.security_answer, callback);
    res.redirect('/login');
  }else {
    res.render('register', {alert: msg, info: userdetail});
  }
  

};

exports.user_add = async function(req, res) {
  let bIsValid = true;
  let msg ='Signup Unsuccessful';
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    bIsValid = false;

    // Add each validation error to the message that will be displayed
    errors.array().forEach(function (item, index) {
      msg += item.msg;
      console.log(item);
      //return res.status(400).json({ errors: errors.array() });
    })
  }


 // Validate all input


  // Validate that the username is unique
  let promiseUsername = new Promise(function (resolve, reject) {
    User.find({ user_name: req.body.user_name}, function (err, user) { 
      if (err){ 
          console.log(err); 
      } 
      else{ 
        if (user.length!=0) {
          msg += ' | Username already taken';
          bIsValid = false;
          resolve('valid');
        }
        else {
            resolve('invalid');
        }
      } 
    });

  });
 
  // Validate that the email is unique
  let promiseEmail = new Promise(function (resolve, reject) {
    User.find({ email: req.body.email}, function (err, user) { 
      if (err){ 
          console.log(err); 
      } 
      else{ 
        if (user.length!=0) {
          msg += ' | Email already taken';
          bIsValid = false;    
          resolve('valid');               
        }
          else {
            resolve('invalid');
          }
        } 
      });
  });
  
  await Promise.all([promiseUsername, promiseEmail]);

  userdetail = { 
    user_name: req.body.user_name,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    security_answer: req.body.security_answer
  }

  if(bIsValid) {
    userCreate(req.body.user_name, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.security_answer, callback);
    res.redirect('/login');
  }else {
    res.render('register', {alert: msg, info: userdetail});
  }
  

};


var users = []
function userCreate(user_name, password, first_name, last_name, email, security_answer, cb) 
{
  userdetail = { 
    user_name: user_name,
    password: password,
    first_name: first_name,
    last_name: last_name,
    email: email,
    security_answer: security_answer
  }

  var newUser = new User(userdetail);
       
  newUser.save(function (err) 
  {
    if (err) 
    {
      cb(err, null);
      return;
    }
    console.log('New User: ' + newUser);
    users.push(newUser)
    cb(null, newUser);
    
  });

}

exports.validation = checkSchema({

  password: {
    in: ['body'],
    isLength: {
      errorMessage: ' | Password must at least 8 chars long',
      // Multiple options would be expressed as an array
      options: { min: 8 }
    },
    matches: {
      options: [/\d/],
      errorMessage: ' | Password must contain at least 1 number'
    },
    custom: {
      options: (value, { req }) => {
        return value === req.body.confirm_password;
      },
      errorMessage: ' | Passwords must match'
    }
  },


 
});

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
          res.render('login', {missing: 'Username or password is incorrect'});
          return;
        }
      })
    }
  }
];
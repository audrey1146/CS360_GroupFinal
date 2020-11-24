/*****************************************************************************
 * File Name:     userController.js
 * Date:          11/16/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Callback functions for the user schema
 ****************************************************************************/

var User = require('../models/user');
var async = require('async')
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongoDB = 'mongodb+srv://zane:zane@cluster0.144ts.mongodb.net/local_final_db?retryWrites=true&w=majority';

const { checkSchema } = require('express-validator');
const { body, validationResult } = require('express-validator');

var callback = function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
}



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



  if(bIsValid) {
    userCreate(req.body.user_name, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.security_answer, callback);
  }else {
    res.render('register', { title: "Slice of Pacific", alert: msg});
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
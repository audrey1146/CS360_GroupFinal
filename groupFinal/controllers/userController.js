/*****************************************************************************
 * File Name:     userController.js
 * Date:          11/16/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Callback functions for the user schema
 ****************************************************************************/

let User = require('../models/user');
let DailyChoice = require('../models/dailyChoice');

const {body,validationResult} = require("express-validator");
const { checkSchema } = require('express-validator');

/****************************************************************************
Function:      callback
Description:   Callback function for userCreate function
****************************************************************************/
let callback = function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
}

/****************************************************************************
Function:      user_profile
Description:   Render the edit profile page
****************************************************************************/
exports.user_profile = function(req, res) {
  let userDetail;

  User.findOne({_id: req.params.id}).exec(function (err, user) 
  {
    if (err) throw err;
    // Successful, so render.

    userDetail = {
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      security_answer: user.security_answer
    }

    res.render('profile', { userDetail, id: req.params.id});
  });

}

/****************************************************************************
Function:      user_profile_edit
Description:   Handle updating the user's profile with the new information
****************************************************************************/
exports.user_profile_edit = function(req, res) {

  const errors = validationResult(req);

  let newUserDetail = { 
    user_name: req.body.user_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    security_answer: req.body.security_answer
  }

  // Only update the password if a new password was given
  if(req.body.password.length !== 0) {
    newUserDetail.password = req.body.password;
  }

  // If there are no validation errors, update the user's info
  // otherwise display the errors
  if (!errors.isEmpty())
  {
    User.findOne({_id: req.params.id}).exec(function (err, user) 
    {
      if (err) throw err;
      // Successful, so render.
      userDetail = {
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        security_answer: user.security_answer
      }
      res.render('profile', { userDetail, id: req.params.id, errors: errors.array()});
    });
  }else {
    User.findByIdAndUpdate(req.params.id, newUserDetail, function(err, user) {
      if (err) {
        throw err;
      }else {
        res.redirect('/users/profile/' + req.params.id)
      }
    });
  }

  
}

/****************************************************************************
Function:      user_user_new
Description:   Render the registration page
****************************************************************************/
exports.user_new = function(req, res) 
{
  res.render('register', { userDetail: {
    user_name: '',
    first_name: '',
    last_name: '',
    email: ''
  } });
}

/****************************************************************************
Function:      user_new_add
Description:   Register a new user
****************************************************************************/
exports.user_new_add = function(req, res) {

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  let userDetail = { 
    user_name: req.body.user_name,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    security_answer: req.body.security_answer
  }

  // If there are no validation errors, create the user and redirect to the login page
  // otherwise display the errors
  if (!errors.isEmpty())
  {
    res.render('register', {errors: errors.array(), userDetail});
  }else {
    userCreate(userDetail, callback);
    res.redirect('/login');
  }

}

/****************************************************************************
Function:      userCreate
Description:   Create a new user in the database
****************************************************************************/
function userCreate(userDetail, cb) 
{
  let newUser = new User(userDetail);
       
  newUser.save(function (err) 
  {
    if (err) 
    {
      cb(err, null);
      return;
    }
    console.log('New User: ' + newUser);
    cb(null, newUser);
    
  });

}

/****************************************************************************
Function:      user_edit_validation
Description:   Validates the information for editing profile
****************************************************************************/
exports.user_edit_validation = checkSchema({

  user_name: {
    in: ['body'],
    custom: {
      options: async (value, {req}) => {
        let user = await User.findOne({user_name: req.body.user_name}).exec();
        // Reject if the username is taken by another user
        if (user != null && user._id != req.params.id)
        {
          return Promise.reject();
        }else {
          return Promise.resolve();
        }
      },
      errorMessage: 'Username already in use'
    }
  },

  email: {
    in: ['body'],
    custom: {
      options: async (value, {req}) => {
        let user = await User.findOne({email: req.body.email}).exec();
        // Reject if the email is taken by another user
        if (user != null && user._id != req.params.id) // Email is taken
        {
          return Promise.reject();
        }else {
          return Promise.resolve();
        }
      },
      errorMessage: 'Email already in use'
    }
  },

  password: {
    in: ['body'],
    optional: {
      options: {checkFalsy: true}
    },
    isLength: {
      errorMessage: 'Password must be at least 8 chars long',
      // Multiple options would be expressed as an array
      options: { min: 8 }
    },
    matches: {
      options: [/\d/],
      errorMessage: 'Password must contain at least 1 number'
    },
    custom: {
      options: (value, {req}) => {
        return value === req.body.confirm_password;
      },
      errorMessage: 'Passwords must match'
    }
  },

  current_password: {
    in: ['body'],
    custom: {
      options: async (value, {req}) => {
        let user = await User.findOne( { _id: req.params.id }).exec();
        // Resolve if entered password is matches the stored password
        if(user.password === req.body.current_password) {
          return Promise.resolve();
        }else {
          return Promise.reject();
        }
      },
      errorMessage: 'Incorrect password'
    }
  }
});


/****************************************************************************
Function:      user_new_validation
Description:   Validates the signup information
****************************************************************************/
exports.user_new_validation = checkSchema({

  user_name: {
    in: ['body'],
    custom: {
      options: async (value, {req}) => {
        let user = await User.findOne({user_name: req.body.user_name}).exec();
        // Reject if username is taken
        if (user != null) // Username is taken
        {
          return Promise.reject();
        }else {
          return Promise.resolve();
        }
      },
      errorMessage: 'Username already in use'
    }
  },

  email: {
    in: ['body'],
    custom: {
      options: async (value, {req}) => {
        // Reject if email is taken
        let user = await User.findOne({email: req.body.email}).exec();
        // Reject if email is taken
        if (user != null)
        {
          return Promise.reject();
        }else {
          return Promise.resolve();
        }
      },
      errorMessage: 'Email already in use'
    }
  },

  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password must at least 8 chars long',
      // Multiple options would be expressed as an array
      options: { min: 8 }
    },
    matches: {
      options: [/\d/],
      // /\d+\D/ at least 1 number and 1 not number
      // /\d+ 
      // /\d/ at least 1 number
      // actually i dont know
      errorMessage: 'Password must contain at least 1 number'
    },
    custom: {
      options: (value, {req}) => {
        return value === req.body.confirm_password;
      },
      errorMessage: 'Passwords must match'
    }
  },

});

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
      today.setDate(today.getDate()-1);

      for (let choice of choices)
      {
        if (choice.TimeStamp >= new Date(today.toISOString()))
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
        res.redirect('/dailyChoice/' + req.params.id);
      }
    }
    else // Has never made a choice
    {
      res.redirect('/dailyChoice/' + req.params.id);
    }
    
  })
}

/****************************************************************************
Function:      user_stats
Description:   Render the stats page
****************************************************************************/
exports.user_stats = function(req, res, next) 
{
  let today = new Date ();
  today.setDate(today.getDate()-1);
  DailyChoice.aggregate([
    {"$match":
      {
       time_stamp: {$gte : new Date(today.toISOString())} 
      } 
    },
    {"$group" : {_id: "$topping_id", count:{$sum:1}}},
    {"$lookup": {
      "localField": "_id",
      "from": "toppings",
      "foreignField": "_id",
      "as": "toppinginfo"
    }},
    { "$unwind": "$toppinginfo" }
    
  ]).exec(function (err, result)
  {
    if (err) throw err;
    // Successful, so render.
    res.render('stats', {toppings : result, id: req.params.id});
  })
  
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
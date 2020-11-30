/*****************************************************************************
 * File Name:     userController.js
 * Date:          11/16/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Callback functions for the user schema
 ****************************************************************************/

let User = require('../models/user');
let DailyChoice = require('../models/dailychoice');
let async = require('async')

const { checkSchema } = require('express-validator');
const { body, validationResult } = require('express-validator');

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
  let newUser = new User(userdetail);
       
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
      options: async (value, { req }) => {
        let bUnique = true;
        await User.findOne( { user_name: req.body.user_name }, function (err, result) 
        {
          if (err) throw err;
          if (result != null && result._id != req.params.id) // Username is taken
          {
            bUnique = false;
            return Promise.resolve('Username already in use');
          }else {
            bUnique = true;
            return Promise.resolve('Username is unique');
          }
        });
        if(bUnique) {
          return Promise.resolve();
        }else {
          return Promise.reject();
        }
      },
      errorMessage: 'Username already in use'
    }
  },

  email: {
    in: ['body'],
    custom: {
      options: async (value, { req }) => {
        let bUnique = true;
        await User.findOne( { email: req.body.email }, function (err, result) 
        {
          if (err) throw err;
          if (result != null && result._id != req.params.id) // Email is taken
          {
            bUnique = false;
            return Promise.resolve('Email already in use');
          }else {
            bUnique = true;
            return Promise.resolve('Email is unique');
          }
        });
        if(bUnique) {
          return Promise.resolve();
        }else {
          return Promise.reject();
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
      errorMessage: 'Password must at least 8 chars long',
      // Multiple options would be expressed as an array
      options: { min: 8 }
    },
    matches: {
      options: [/\d/],
      errorMessage: 'Password must contain at least 1 number'
    },
    custom: {
      options: (value, { req }) => {
        return value === req.body.confirm_password;
      },
      errorMessage: 'Passwords must match'
    }
  },

  current_password: {
    in: ['body'],
    custom: {
      options: async (value, { req }) => {
        let bCorrect = false;
        await User.findOne( { _id: req.params.id }, function (err, result) 
        {
          if (err) throw err;
          if (result.password === req.body.current_password) // Correct password
          {
            bCorrect = true;
            return Promise.resolve('Correct password');
          }else {
            bCorrect = false;
            return Promise.resolve('Incorrect password');
          }
        });
        if(bCorrect) {
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
      options: async (value, { req }) => {
        let bUnique = true;
        await User.findOne( { user_name: req.body.user_name }, function (err, result) 
        {
          if (err) throw err;
          if (result != null) // Username is taken
          {
            bUnique = false;
            return Promise.resolve('Username already in use');
          }else {
            bUnique = true;
            return Promise.resolve('Username is unique');
          }
        });
        if(bUnique) {
          return Promise.resolve();
        }else {
          return Promise.reject();
        }
      },
      errorMessage: 'Username already in use'
    }
  },

  email: {
    in: ['body'],
    custom: {
      options: async (value, { req }) => {
        let bUnique = true;
        await User.findOne( { email: req.body.email }, function (err, result) 
        {
          if (err) throw err;
          if (result != null) // Email is taken
          {
            bUnique = false;
            return Promise.resolve('Email already in use');
          }else {
            bUnique = true;
            return Promise.resolve('Email is unique');
          }
        });
        if(bUnique) {
          return Promise.resolve();
        }else {
          return Promise.reject();
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
      options: (value, { req }) => {
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
          res.redirect('/users/profile/' + result.ID)
          //res.redirect('/home/' + result.ID)
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
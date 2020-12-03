/*****************************************************************************
 * File Name:     dailyChoiceController.js
 * Date:          11/16/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Callback functions for the dailyChoice schema
 ****************************************************************************/

let Topping = require('../models/topping');
let DailyChoice = require('../models/dailyChoice');
let User = require('../models/user');
let async = require('async');

let mongoose = require('mongoose');

const { checkSchema } = require('express-validator');
const { body, validationResult } = require('express-validator');
const { ObjectID } = require('mongodb');

/****************************************************************************
Function:      callback
Description:   Callback function for userCreate function
****************************************************************************/
let callback = function(err, results) 
{
  if (err) {
      console.log('FINAL ERR: '+err);
  }
}

/****************************************************************************
Function:      topping_list
Description:   
****************************************************************************/
exports.topping_list = function (req, res, next) 
{
  Topping.find().sort([['name', 'ascending']]).exec(function (err, list_toppings) 
  {
    if (err) { return next(err); }
    // Successful, so render.

    // dailyChoice
    res.render('poll', { title: 'Daily Choice', 
      toppings: list_toppings, id: req.params.id });
  })
};

/****************************************************************************
Function:     dailyChoice_new_add
Description:  Query the database to get the topping and the user objects,
              then insert those into the dailyChoice table
****************************************************************************/
exports.dailyChoice_new_add = function (req, res) 
{
  const errors = validationResult(req);
  let today = new Date();
  today.setDate(today.getDate());
  let timeNow = new Date(today.toISOString());
  let topID;
  let dailyChoiceDetail;
  
  if ('null' == req.body.toppingName)
  {
    res.redirect('/poll/' + req.body.id);
  }
  else
  {   
    console.log(req.body.id);
    console.log(req.body.toppingName);

    // Get the User and Topping Objects
    async.parallel
    ([
      function(callback) 
      {
        User.find( {_id: ObjectID(req.body.id) } ).exec(callback);
      },
      function(callback) 
      {
        Topping.find({name: req.body.toppingName}).exec(callback);
      },
    ], async function (err, results)
    {
      if (err) throw err;

      if (results == null)
      {
        res.redirect('/poll/' + req.body.id);
      }
      else
      {
        topID = results[1].map(element => element.id);
        dailyChoiceDetail = new DailyChoice(
        {
          user_id: mongoose.Types.ObjectId(req.body.id),
          topping_id: topID,
          time_stamp: timeNow
        });
        await dailyChoiceCreate(dailyChoiceDetail, callback);
        res.redirect('/stats/' + req.body.id)
      }
    });
  }
}

/****************************************************************************
Function:      dailyChoiceCreate
Description:   
****************************************************************************/
async function dailyChoiceCreate(dailyChoiceDetail, cb)
{
  let newDailyChoice  = new DailyChoice(dailyChoiceDetail);

  newDailyChoice.save(function (err)
  {
    if (err)
    {
      cb(err, null);
      return;
    }
    console.log('New DailyChoice: ' + newDailyChoice);
    cb(null, newDailyChoice);
  });
}
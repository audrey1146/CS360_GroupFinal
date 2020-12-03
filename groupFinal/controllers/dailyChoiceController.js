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

/****************************************************************************
Function:      callback
Description:   Callback function for userCreate function
****************************************************************************/
let callback = function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
}

exports.topping_list = function (req, res, next) 
{
  Topping.find().sort([['name', 'ascending']]).exec(function (err, list_toppings) 
  {
    if (err) { return next(err); }
    // Successful, so render.
    //console.log(list_toppings[0]);
    res.render('dailyChoice', { title: 'Daily Choice', toppings: list_toppings, id: req.params.id });
  })
};

exports.dailyChoice_new_add = function (req, res) {
  const errors = validationResult(req);
  let today = new Date();
  today.setDate(today.getDate());
  let timeNow = new Date(today.toISOString());

  console.log(mongoose.Types.ObjectId(req.params.id));
  console.log(mongoose.Types.ObjectId(req.body.topppingID));

  //console.log(req.params.id + '\n' + req.body.topping_id + '\n' + timeNow);

  let dailyChoiceDetail = {
    user_id: mongoose.Types.ObjectId('111111111111111111111111'),
    topping_id: mongoose.Types.ObjectId('111111111111111111111112'),
    time_stamp: timeNow
  }
  

  if (!errors.isEmpty())
  {
    res.render('/dailyChoice/:id', {errors: errors.array(), dailyChoiceDetail});
  }
  else
  {
    dailyChoiceCreateNew(dailyChoiceDetail, callback);
    res.redirect('/stats/' + req.params.id);
  }
}

function dailyChoiceCreateNew(dailyChoiceDetail, cb)
{
  let newDailyChoice  = new DailyChoice(dailyChoiceDetail);

  newDailyChoice.save(function (err)
  {
    if (err)
    {
      cb (err, null);
      return;
    }
    console.log('New DailyChoice: ' + newDailyChoice);
    cb(null, newDailyChoice);
  });
}

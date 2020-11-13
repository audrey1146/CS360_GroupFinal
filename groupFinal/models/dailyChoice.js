/*****************************************************************************
 * File Name:     dailyChoice.js
 * Date:          11/12/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Define the schema for the DailyChoice table
 ****************************************************************************/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DailyChoiceSchema = new Schema(
  {
    user_id: {type: String, required: true, maxlength: 50, unique: true},
    topping_id: {},
    time_stamp: {type: Date, default: Date.now() }, // SUBJET TO CHANGE
  }
);


// TODO:  Understand virtual properties and add what is needed


//Export model
module.exports = mongoose.model('DailyChoice', DailyChoiceSchema);
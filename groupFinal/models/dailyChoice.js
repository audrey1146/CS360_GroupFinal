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
    user_id: { type: Schema.ObjectId, ref: 'User', required: true },
    topping_id: { type: Schema.ObjectId, ref: 'Topping', required: true },
    time_stamp: {type: Date, default: Date.now(), required: true }, // SUBJET TO CHANGE
  }
);


// TODO:  Understand virtual properties and add what is needed
DailyChoiceSchema.virtual('TimeStamp').get(function () {
  return this.time_stamp;
});

//DailyChoiceSchema.virtual('url').get(function () {
//  return '/views/dailyChoice';
//});

//Export model
module.exports = mongoose.model('DailyChoice', DailyChoiceSchema);
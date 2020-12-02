/*****************************************************************************
 * File Name:     dailyChoice.js
 * Date:          11/12/2020
 * Assignment:    Final Group Assignment
 * Purpose :      Define the schema for the DailyChoice table
 ****************************************************************************/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DailyChoiceSchema = new Schema(
  {
    user_id: { type: Schema.ObjectId, ref: 'User', required: true },
    topping_id: { type: Schema.ObjectId, ref: 'Topping', required: true },
    time_stamp: {type: Date, default: Date.now(), required: true },
  }
);

// Virtual for the timestamp of the daily choice
DailyChoiceSchema.virtual('TimeStamp').get(function () {
  return this.time_stamp;
});

//Export model
module.exports = mongoose.model('DailyChoice', DailyChoiceSchema);
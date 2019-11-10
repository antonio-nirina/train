const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const tripSchema = new Schema({
  userId:String,
  destination: String,
  depart: String,
  time: {type:Date},
  number: {type:Number}
});

const ModelClass = mongoose.model('trip', tripSchema);
module.exports = ModelClass;
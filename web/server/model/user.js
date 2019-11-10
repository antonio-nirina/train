const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  name: String,  // html
  firstname: String,
  phone: String,
  password: String,
});

const ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;
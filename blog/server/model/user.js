const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  firstName: String,
  lastName: String,

  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  occupation: { type: String, default: '' },
  description: { type: String, default: '' },
});

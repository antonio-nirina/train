const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const postSchema = new Schema({
  title: String,
  content: String,  
  user:{type: Schema.Types.Mixed, ref: 'user'},
  time: Date,
  like:Number
});

// Create the model class
const ModelClass = mongoose.model('post', postSchema);
// Export the model
module.exports = ModelClass;
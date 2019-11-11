const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./route');
const mongoose = require('mongoose');
const cors = require('cors'); 
// const router = express.Router();
// DB Setup (connect mongoose and instance of mongodb)
// sudo systemctl status mongodb
// mongoose.connect('mongodb://localhost:blog/blog');

// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan('combined'));  // middleware for logging
app.use(bodyParser.json({ type: '*/*' }));  // middleware for helping parse incoming HTTP requests
app.use(cors());  // middleware for circumventing (规避) cors error

// Router Setup
router(app);

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
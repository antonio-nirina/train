const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const webSocket = require('./utils/socket');

require('dotenv').config(); 


mongoose.connect(process.env.database);
mongoose.connection.on('connected',() => {
	console.log('connected in database success'); 
});
mongoose.connection.on('error',() => {
	throw new Error('error connected in database'); 
});

app.use(bodyParser.json({ type: '*/*' }));
// app.use(cors());  
router(app);
const port = process.env.PORT || 8080;
const server = http.createServer(app);
webSocket(server);
server.listen(port);
console.log('Server listening on: ', port);
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./route');
const mongoose = require('mongoose');
const fs     = require('fs');
const jwt    = require('jsonwebtoken');
// const cors = require('cors');
const  publicKey = fs.readFileSync('config/public.pem'); 
const socket = require('socket.io');
require('dotenv').config(); 
const User   = require('./model/user');
let users = [];
// DB Setup (connect mongoose and instance of mongodb)
// sudo systemctl status mongodb
// mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});
mongoose.connect(process.env.database);
mongoose.connection.on('connected',() => {
	console.log('connected in database success'); 
});
mongoose.connection.on('error',() => {
	throw new Error('error connected in database'); 
});

// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan('combined'));  // middleware for logging
app.use(bodyParser.json({ type: '*/*' }));  // middleware for helping parse incoming HTTP requests
// app.use(cors());  

// Router Setup
router(app);
// console.log(process.env.NODE_ENV)
// Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io  = socket(server);
io.on('connection', (socket) => {
	socket.on('identify',({token }) => {
    	try {
    		const decoded = jwt.verify(token, publicKey);
    		User.findOne({email: decoded.email }, function(err, resp) {
    			const currents = {
    				id: resp._id,
    				lastname : resp.lastName,
    				firstname: resp.firstName
    			}
    			users.push(currents)
                console.log(users)
    			socket.emit('new_comment',{user:currents})
    		})
  		} catch(err) {
	    	console.log(err.message)
  		}
	})
	/*socket.on("disconnect", () => {
		socket.broadcast.emit('user_leave',{user:currents})
	})*/
})
server.listen(port);
console.log('Server listening on: ', port);
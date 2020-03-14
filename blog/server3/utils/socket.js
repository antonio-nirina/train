const socket = require('socket.io');
const fs     = require('fs');
const jwt    = require('jsonwebtoken');

const  publicKey = fs.readFileSync('config/public.pem'); 
const User   = require('../model/user');
const Post   = require('../model/post');

let users = [];

const webSocket = function(server){
	const io   = socket(server);
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
	                // console.log(users)
	    			socket.emit('new_comment',{user:currents})
	    		})
	  		} catch(err) {
		    	console.log(err.message)
	  		}
		});
		socket.on("send_like", ({event}) => {
			if (event.type === "like") {
				Post.findById({_id: event.id}, function(err, resp) {
		    		resp.like = resp.like + 1
		    		resp.save(function(err, post) { 
				      socket.broadcast.emit("add_like",{id:post._id})
				    });

		    	})
			}
		});
		socket.on("create_post",({token,data}) => {
			if(token && data){
				const decoded = jwt.verify(token, publicKey);
	    		User.findOne({email: decoded.email }, function(err, resp) {
	    			const post = {
	    				title:data.title,
	    				content : data.content,
						user:resp,
						time: new Date(),
		  				like:0
					}
					let base64 = "";

					if(resp.avatar){
						base64 = "data:image/png;charset=utf-8;base64,"+Buffer.from(resp.avatar).toString('base64')
					}
					const res = {
						name:resp.firstName+" "+resp.lastName,
						avatar:base64,
						title:data.title,
						content : data.content,
						like:0
					}
					socket.broadcast.emit('new_post',{posts:res})
	                /*post.save(function(err) {
						if (err) {
							socket.broadcast.emit('new_post',{posts:""})	
						} 
						socket.broadcast.emit('new_post',{posts:post})
					})*/
	    			
	    		})	
			}
			
		})

		/*socket.on("disconnect", () => {
			socket.broadcast.emit('user_leave',{user:currents})
		})*/
	})	
} 
module.exports = webSocket;
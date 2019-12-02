const User = require('../model/user');
const Post = require('../model/post');
const Comment = require('../model/comment');
const jwt  = require('jsonwebtoken');
const fs = require('fs');

/**
 * Fetch profile information
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchProfile = function(req, res, next) {
	const token = req.headers.authorization
	let decoded = jwt.decode(token, {complete: true});
	User.findOne({email: decoded.payload.email }, function(err, resp) {
		Post.find({authorId:resp._id},function(err,post) {
			let file = "";
			file = setTypeFile(resp)
			const obj = {
				id:resp._id,
				email:resp.email,
				avatar:file ? file : "",
				firstName:resp.firstName,
				lastName:resp.lastName,
				post:post
			}
			res.send({
				code: 200,
	    		data: obj
	  		});
		})
	})
}


/**
 * Update Avatar
 *
 * @param req
 * @param res
 * @param next
 */
 exports.updateAvatar = function(req, res, next) {
	const date = new Date();
	let data;
 	const nameFile = req.body.id+date.getDate()+date.getMonth()+date.getFullYear();
 	const path = "public/users/"+nameFile+"."+req.body.type
 	const file = req.body.file

 	if (req.body.type == "jpeg") {
 		data = file.replace(/^data:image\/jpeg;base64,/, "");
 	} else if (req.body.type == "jpg") {
 		data = file.replace(/^data:image\/jpg;base64,/, "");
 	} else if (req.body.type == "png") {
 		data = file.replace(/^data:image\/png;base64,/, "");
 	}

 	buf = new Buffer(data, 'base64');
 	fs.writeFile(path,buf,(err) => {
        if(err) throw err
            console.log('file has copy');
    });

 	User.findById({_id: req.body.id}, function(err, resp) {
    	if (err) {
	      return res.status(400).json({
	      	code:400,
	        message: 'User not found.'
	      });
		}
		resp.avatar = path
		resp.save(function(err, post) {  
			Post.find({authorId:resp._id},function(err,post) {
				const obj = {
					id:resp._id,
					email:resp.email,
					avatar:resp.avatar ? setTypeFile(resp) : "",
					firstName:resp.firstName,
					lastName:resp.lastName,
					post:post
				}
				res.send({
					code: 200,
		    		data: obj
		  		});
			});    
	    });
    })
 }


/**
 * like Post/comment
 *
 * @param req
 * @param res
 * @param next
 */
exports.likeHandler = function(req, res, next) {
	if (req.body.isPost) {
		Post.findById({_id: req.body.id}, function(err, post) {
	    	if (err) {
		      return res.status(400).json({
		      	code:400,
		        message: 'User not found.'
		      });
    		}
    		post.like = post.like + 1
    		post.save(function(err, post) {  
		      if (err) {
		        return next(err);
		      }
		      res.json({
		      	code: 200,
		      	message:"like post "+post.title,
		      	data: post
		      });  
		    });

    	})
	} else {
		Comment.findById({_id: req.body.id}, function(err, com) {
	    	if (err) {
		      return res.status(400).json({
		      	code:400,
		        message: 'User not found.'
		      });
    		}
    		com.like = com.like + 1
    		com.save(function(err, com) {  
		      if (err) {
		        return next(err);
		      }
		      res.json({
		      	code: 200,
		      	message:"like commentaire "+com.postId,
		      	data: com
		      });  
		    });
    	})
	}
}

const setTypeFile = (resp) => {
	let file = "";

	if (resp.avatar && fs.existsSync(resp.avatar)) {
		const type = (resp.avatar).split(".")[1]
		const af = fs.readFileSync(resp.avatar);
		if (type == "jpeg") {
	 		data = "data:image/jpeg;base64,";
	 	} else if (type == "jpg") {
	 		data = "data:image/jpg;base64,";
	 	} else if (type == "png") {
	 		data = "data:image/png;base64,";
	 	}
		file = data + (new Buffer(af).toString('base64'));
	}

	return file
}
const User = require('../model/user');
const Post = require('../model/post');
const Comment = require('../model/comment');
const jwt  = require('jsonwebtoken');

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
			const obj = {
				id:resp._id,
				email:resp.email,
				avatar:resp.avatar ? resp.avatar : "",
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
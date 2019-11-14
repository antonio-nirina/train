const Post = require('../model/post');
const User = require('../model/user');
const jwt  = require('jsonwebtoken');

/**
 * createPost up a new user
 *
 * @param req
 * @param res
 * @param next
 */
exports.createPost = function(req, res, next) {
	const title = req.body.title;
  	const content = req.body.content;
  	const token = req.headers.token
	let decoded = jwt.decode(token, {complete: true});
	console.log(decoded.payload)
	User.findOne({email: decoded.payload.email }, function(err, resp) {
	  	const post = new Post({
	  		title: title,
			content: content,  
		  	authorId: resp._id,
		  	authorName: resp.name,
		  	time: new Date(),
		  	like:0
	    });

	    post.save(function(err) { 
	      if (err) {
	        return next(err);
	      }
	      res.json({
	       code:200,
	       message: 'post create.' 
	   	});
    });
   });

}

/**
 * fetchPosts up a new user
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchPosts = function(req, res, next) {
	Post
    .find({})
    .select({})
    .limit(100)
    .sort({
      time: -1
    })
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve posts.'
        });
      }
      res.json(posts);
    });
}
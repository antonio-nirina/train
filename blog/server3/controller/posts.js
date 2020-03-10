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
  const token = req.headers.authorization
	let decoded = jwt.decode(token, {complete: true});

	User.findOne({email: decoded.payload.email }, function(err, resp) {
	  	const post = new Post({
	  		title: title,
			  content: content,  
		  	user:resp,
		  	time: new Date(),
		  	like:0
	    });

	    post.save(function(err) { 
	      if (err) {
	        return next(err);
	      }
	      res.json({
	       code:200,
	       message: 'post create with sucess.'
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
        return res.status(422).json({
          message: 'Error! Could not retrieve posts.'
        });
      }
      res.json({
       code:200,
       message: 'sucess',
       data: posts
     });
      
    });
}

/**
 * Fetch a single post by post ID
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchPost = function(req, res, next) {
  Post.findById({
    _id: req.params.id
  }, function(err, post) {
    if (err) {
      console.log(err);
      return res.status(422).json({
        message: 'Error! Could not retrieve the post with the given post ID.'
      });
    }
    if (!post) {
      return res.status(404).json({
        message: 'Error! The post with the given ID is not exist.'
      });
    }
    res.json({
         code:200,
         message: 'sucess',
         data: post
       });
  });
};
const Comment = require('../model/comment');
const User = require('../model/user');

/**
 * Create a new comment (post ID and user ID are both needed)
 *
 * @param req
 * @param res
 * @param next
 */
exports.createComment = function(req, res, next) {
  // Require auth
  const idUser = req.body.id;
  const postId = req.params.postId;
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({
    	code: 400,
      	message: 'Comment cannot be empty.'
    });
  }

  User.findById({
    _id: idUser
  }, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        code:400,
        message: 'User not found.'
      });
    }

    const comment = new Comment({
	    content: content,
	    authorId: user._id,
	    authorName: user.firstName + ' ' + user.lastName,
	    postId: postId,
	    time: Date.now(),
	    like: 0
  	});

  	comment.save(function(err, comment) {  
	    if (err) {
	      return next(err);
	    }
    	res.json({
    		code:200,
        message:"comment create success"
    	});  
  	});
   	
  });
};

/**
 * Fetch comments for a specific blog post (post ID is needed)
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchCommentsByPostId = function(req, res, next) {
  Comment
    .find({
      postId: req.params.postId
    })
    .select({})
    .limit(100)
    .sort({
      time: 1
    })
    .exec(function(err, comments) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve comments.'
        });
      }
      res.json({
    		code:200,
    		data: comment
    	});  
    });
};
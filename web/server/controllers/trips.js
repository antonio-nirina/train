const Trip = require('../model/trip');

/**
 * Get a list of posts
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchPosts = function(req, res, next) {
  Trip
    .find({})
    .select({})
    .limit(100)
    .sort({
      time: -1
    })
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: 'Error! Could not retrieve posts.'
        });
      }
      res.json(posts);
    });
};

/**
 * Create a new post
 *
 * @param req
 * @param res
 * @param next
 */
exports.createPost = function(req, res, next) {

  // Require auth
  const user = req.user;

  const title = req.body.title;
  const categories = req.body.categories;
  const content = req.body.content;
  const authorId = user._id;
  const authorName = user.firstName + ' ' + user.lastName;
  const time = Date.now();

  // Make sure title, categories and content are not empty
  if (!title || !categories || !content) {
    return res.status(422).json({
      message: 'Title, categories and content are all required.'
    });
  }

  // Create a new trip
  const trip = new Trip({
    title: title,
    categories: _.uniq(categories.split(',').map((item) => item.trim())),  // remove leading and trailing spaces, remove duplicate categories
    content: content,
    authorId: authorId,
    authorName: authorName,
    time: time,
  });

  // Save the trip
  trip.save(function(err, trip) {  // callback function
    if (err) {
      return next(err);
    }
    res.json(trip);  // return the created post
  });
};

/**
 * Fetch a single post by post ID
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchPost = function(req, res, next) {
  Trip.findById({
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
    res.json(trip);  // return the single blog post
  });
};

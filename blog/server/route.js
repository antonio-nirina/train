const Trip = require('./controllers/trips');

module.exports = function(app) {
	app.get('/api/trips', Trip.fetchPosts);
  	app.post('/api/trips', Trip.createPost);
  	app.get('/api/trips/:id', Trip.fetchPost);
}
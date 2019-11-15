const Post = require('./controller/posts');
const Profile = require('./controller/profil');
const Auth = require('./controller/auth');

module.exports = function(app) {
  	app.get('/api/', Auth.isAuthorized, function(req, res) {
    	res.send({ message: 'Super secret code is ABC123' });
  	});
  	app.post('/register', Auth.signup);
  	app.post('/login', Auth.signin);
  	// app.get('/api/verify_jwt', Auth.isAuthorized, Authentication.verifyJwt);

  	/*app.get('/api/profile', Auth.isAuthorized, Profile.fetchProfile);
  	app.put('/api/profile', Auth.isAuthorized, Profile.updateProfile);
	  app.put('/api/password', Auth.isAuthorized, Profile.resetPassword);*/

	  app.get('/api/posts', Auth.isAuthorized,Post.fetchPosts);
  	app.post('/api/posts', Auth.isAuthorized,Post.createPost);
  	// app.get('/api/posts/:id', Auth.isAuthorized,Post.fetchPost);

}
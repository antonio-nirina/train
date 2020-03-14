const Post = require('./controller/posts');
const Auth = require('./controller/auths');
const Profile = require('./controller/profil');

module.exports = function(app) {
	app.post('/login', Auth.signin);
	app.post('/register', Auth.signup);
	app.get('/api/posts', Auth.isAuthorized,Post.fetchPosts);
	app.post('/api/create/post', Auth.isAuthorized,Post.createPost);
	app.get('/api/profile', Auth.isAuthorized, Profile.fetchProfile);
}
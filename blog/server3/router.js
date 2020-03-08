const Post = require('./controller/posts');
const Auth = require('./controller/auths');

module.exports = function(app) {
	app.post('/login', Auth.signin);
	app.get('/api/posts', Auth.isAuthorized,Post.fetchPosts);
  	app.post('/api/create/post', Auth.isAuthorized,Post.createPost);
}

module.exports.isAuthorized  = function(req, res, next) {
	console.log(req.headers)
	if (req.headers.authorization == 'test') {
		const resp = res.json({
			"code":400,
			"message":"test apps"
		})
		return next(resp);
	}
	
	next();
}
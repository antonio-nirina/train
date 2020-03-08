require('dotenv').config();
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET;
const fs     = require('fs');
const jwt    = require('jsonwebtoken');
const User   = require('../model/user');
const privateKey = fs.readFileSync('config/private.key');
const  publicKey = fs.readFileSync('config/public.pem');

module.exports.isAuthorized  = function(req, res, next) {
	// const decodedToken = Jwt.decode(token, {complete: true});
  const token = req.headers.authorization
  try {
    const decoded = jwt.verify(token, publicKey);
  } catch(err) {
      const resp = res.json({
        "code":400,
        "message":"token invalid"
      })
    return next(resp);
  }
	
	next();
}

/**
 * create private_key and public_key
 * openssl genpkey -out config/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
 * openssl pkey -in config/private.pem -out config/public.pem -pubout
 *
 * @param req
 * @param res
 * @param next
 */
exports.signin = function(req, res, next) {
	const email = req.body.email;
	const payload = {    
    	email:email
    };
	User.findOne({ email: email }, function(err, resp) {
		if (err || !resp) {
			return res.json({
              success : false,
              code_status : 400,
              message: "password or login error"
          });
		}

		const checkPwd = bcrypt.compareSync(req.body.password,resp.password);

		if (checkPwd) {
            //jwt.sign(payload, secret, {expiresIn: 3600 }, (err, token) => {
              jwt.sign(payload, privateKey, { algorithm: 'RS256' },(err, token) => {
                res.json({
                    success : true,
                    code_status : 200,
                    data: token
                }); 
            });
        } else {
          res.json({
              success : false,
              code_status : 400,
              message: "password or login error"
          }); 
        }
	})
} 
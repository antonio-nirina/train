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
 * Sign up a new user
 *
 * @param req
 * @param res
 * @param next
 */
exports.signup = function(req, res, next) {

  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const avatar = req.body.avatar;

  if (!email || !password) {
    return res.status(400).send({ message: 'You must provide both email and password.' }); 
  } 

  // See if a user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(400).send({ message: 'This email is in use.' });  // 422 refers to unprocessable entity
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone:phone,
      avatar:avatar
    });

    user.save(function(err) {  // callback function
      if (err) {
        return next(err);
      }

      // Respond user request indicating the user was created
      res.json({ 
        code:201,
        message: 'You have successfully signed up. You can sign in now.' 
      });
    });
  });
};

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
console.log(resp)
		bcrypt.compare(req.body.password,resp.password,(err,res1) => {
          console.log(err)
          if (err) {
              res.json({
                success : false,
                code_status : 400,
                message: "password error"
              }); 
          }
          //jwt.sign(payload, secret, {expiresIn: 3600 }, (err, token) => {
          jwt.sign(payload, privateKey, { algorithm: 'RS256' },(err, token) => {
            res.json({
                success : true,
                code_status : 200,
                data: token
            }); 
        });
    })
  })
} 
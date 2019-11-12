require('dotenv').config();
const bcrypt = require('bcrypt-nodejs');
const secret              = process.env.SECRET;
const jwt                 = require('jsonwebtoken');
const User = require('../model/user');

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
  const address = req.body.address;
  const phone = req.body.phone;

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
      address:address
    });

    user.save(function(err) {  // callback function
      if (err) {
        return next(err);
      }

      // Respond user request indicating the user was created
      res.json({ message: 'You have successfully signed up. You can sign in now.' });
    });
  });
};

/**
 * create private_key and public_key
 * openssl genpkey -out config/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
 * openssl pkey -in config/private.pem -out config/jwt/public.pem -pubout
 *
 * @param req
 * @param res
 * @param next
 */
exports.signin = function(req, res, next) {
	const email = req.body.username;
	const payload = {    
    	email:email
    };
	User.findOne({ email: email }, function(err, resp) {
		if (err) {
			return res.status(400).send({ message: 'This email not found.' });
		}
		const checkPwd = bcrypt.compareSync(req.body.password,resp.password);

		if (checkPwd) {
            jwt.sign(payload, secret, {expiresIn: 3600 }, (err, token) => {
                //console.log(jwt.decode(token))
                res.json({
                    success : true,
                    code_status : 200,
                    data: token
                }); 
            });
        }
	})
}
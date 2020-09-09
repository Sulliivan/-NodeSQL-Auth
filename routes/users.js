const express = require('express');
const router = express.Router();



/// page de connection ///

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'se connecter' });
});

/* get register page */
router.get('/register', function(req, res, next) {
    res.render('register', { title: "S'inscrire" });
  });
  




/* user Edit  */ /// avec EDIT EJS 
router.get('/edit/:id', function(req, res) {
	if (req.session.auth) {
		res.send('Welcome back, ' + req.session.email + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

router.post('/edit/:id', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, res) {
			if (results.length > 0) {
				req.session.auth = true;
				req.session.email = email;
				res.send('ok');
			} else {
				res.send('email ou password incorrect');
			}			
			res.end();
		});
	} else {
		res.send('Enter Email and Password!');
		res.end();
	}
});

module.exports = router;

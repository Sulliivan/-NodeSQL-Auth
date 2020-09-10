const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');

/// page pour se connecter "LOGIN" ///
/* user Edit  */ /// avec EDIT EJS 

router.get('/login', function(req, res) {
	if (req.session.auth) {
		res.send('Welcome back, ' + req.session.email + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

router.post('/login',async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	
	await query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (err || result.length === 0) {   
        return res.status(401).json({
          error: `Vous n'êtes pas inscrit`
        });
      } else {
        bcrypt.compare(password, result[0].password, async (err, success) => {
          if (err) {
            return res.status(401).json({
              error: `Bcrypt Auth failed`
            });
          }
          if (success) {
            await query('SELECT * FROM users WHERE email = ? AND password = ?', [email, result[0].password], function (err, results) {
              if (results.length) {
                req.session.auth = true;
                req.session.email = result[0].email;
				req.session.password = result[0].password;
				req.session.role = result[0].roleID;
				res.redirect('/index');
				console.log(req.session);
              } else {
                res.send('err');
              }
            });
          } else {
            res.send('Email ou mot de passe incorrect !');
          }
        })
      };
    })
  })

module.exports = router;

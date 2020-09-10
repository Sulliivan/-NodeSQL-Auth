const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');

///// page acceuil avec qui recupere tout ///

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'se connecter' });
});

/* get register page */
router.get('/register', function(req, res, next) {
    res.render('register', { title: "S'inscrire" });
  });
  

// recupere l'index // 

router.get('/index', async (req, res) => {
  try{
    const users = await query("SELECT * FROM users")
    res.render("index", {
        users,
    });
  }catch (err){
    res.send(err)
  }
});

// post dans l'index // 
router.post('/index', async (req, res, ) => {

  const email = req.body.email
  const password = req.body.password
  const emailQuery = "SELECT * FROM users;"

  try {
    const resultEmail = await query(emailQuery)
      if(resultEmail.length > 0){
          res.send('le compte existe deja')
      }else{
          bcrypt.hash(password, 10, async (err, hash) =>{
              /* ajoute dans users */
              await query ('insert into users (email, password, roleId) value (?, ?, 2);',[email, hash,]);
              res.render('/index', {session: req.session}); console.log("req.session:",session);
          } )
            
      }
  }catch (err){
      res.send(err)
  }
});

module.exports = router;

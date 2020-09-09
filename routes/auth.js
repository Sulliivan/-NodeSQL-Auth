const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

////// login page /////  
/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'se connecter' });
});

router.post('/login', async function(req, res){
  const email = req.body.email
  const password = req.body.password
  db.query('select * FROM user WHERE email = ?'[email], async function(err, res){
    if(err) {
      res.send("email non existant")
    }else {
      if(res.length > 0 ){
        const compare = await bcrypt.compare(password,res[0].password)
        if (compare){
          res.send("connecté")
        }
        else{
          res.send("l'email ou le mot de passe ne correspondes pas")
        }
      }
      else{
        res.send("l'email n'existe pas");
      }
    }
  })
})


////// Register page /////   /////// avec phill ///////
/* get register page */
router.get('/register', function(req, res, next) {
    res.render('register', { title: "S'inscrire" });
  });
  
/* Post new utilisateur */
router.post('/register', async (req, res, ) => {

    const email = req.body.email
    const password = req.body.password
    const emailQuery = "SELECT email FROM users WHERE email = '" + email + "';"

    try {
      const resultEmail = await query(emailQuery)
        if(resultEmail.length > 0){
            res.send('le compte existe deja')
        }else{
            bcrypt.hash(password, 10, async (err, hash) =>{
                /* ajoute dans users */
                await query ('insert into users (email, password, roleId) value (?, ?, 2);',[email, hash]);
                res.redirect('/')
            })     
        }
    }catch (err){
        res.send(err)
    }
  });

module.exports = router;

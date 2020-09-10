const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');

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
                res.redirect('/login')
            })     
        }
    }catch (err){
        res.send(err)
    }
  });
module.exports = router;

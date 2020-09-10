module.exports = async (req, res, next) => {
    const idSession = req.session.id
    try {
      const query = await query ("SELECT id FROM users WHERE id = '" + idSession + "' ")    
        if(query.length >0){
            next();
        }res.redirect("/login")
    }
     catch (err) {
        res.send(err)
    }  //if(query.length > 0)
}
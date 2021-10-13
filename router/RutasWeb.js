const express=require('express');
const router = express.Router();
const passport = require ('passport');

router.get('/', (req, res) => {
    res.render("index")
});

    
router.get("/registro", (req, res) => {
    res.render("registro")}
    );

router.post ('/registro',passport.authenticate('local-registro',{    
    successRedirect:'/',
    failureRedirect: '/registro',    
    passReqToCallback: true
}));

router.post('/index', passport.authenticate('local-login', {
    successRedirect: '/homeAdm',
    failureRedirect: '/',
    failureFlash: true
  }));


router.use((req,res,next)=>{
    isAuthenticated(req,res,next);
    next();
});

router.get("/homeAdm", (req, res) => {
    res.render("homeAdm")}
    );

router.get('/logout',(req,res,next)=>{
    req.logout();
    res.redirect('/')
});
    
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports= router;
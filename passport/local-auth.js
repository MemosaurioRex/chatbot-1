const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User =require ('../models/cliente')

passport.serializeUser((cliente,done)=>{
    done(null,cliente.id);
});

passport.deserializeUser(async(id,done)=>{
    const cliente = await User.findById(id);
    done (null,cliente)
});

passport.use('local-registro',new LocalStrategy({
    usernameField:'correo',
    passwordField:'password',
    passReqToCallback :true
   
},async (req,correo,password,done)=> {
    const {nombre,apellido,password12} = await req.body;
    const cliente =await User.findOne({correo:correo});
    if(cliente){    
        return done(null,false,req.flash('signupMessagecorreo','El Correo ya tiene una cuenta Creada'));
    }if(password != password12){ 
        return done(null,false,req.flash('signupMessagePW','las contraseñas deben ser iguales'));
        
       
    }else{
        const Nuevocliente = new User();
        Nuevocliente.nombre = nombre ;
        Nuevocliente.apellido = apellido ;
        Nuevocliente.correo = correo ;
        Nuevocliente.password = Nuevocliente.encryptPassword(password);
        await Nuevocliente.save(); 
        done(null,Nuevocliente);  
    }

   
}));


passport.use('local-login', new LocalStrategy({
    usernameField:'correo',
    passwordField:'password',
    passReqToCallback :true
},async(req,correo,password,done)=>{
    const user = await User.findOne({correo:correo});
    if(!user){
        return done(null,false,req.flash('signinMessagecorreo','usuario no encontrado'))
    }
    if(!user.comparePassword(password)){
        return done(null,false,req.flash('signinMessagePW','contraseña incorrecta'))
    }
    done(null,user);
}));
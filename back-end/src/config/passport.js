const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const User = require("../models/Users")

passport.use(
    new LocalStrategy(
        {
            usernameField:"email",
            passwordField:"password",
        },
        (email,password,done) => {
            User.findOne({email:email},(error,user) =>{
                if(error){
                    return done(error);
                }
                if(!user){
                    return done(null,false,{
                        message:"wrong username",
                    });
                }
                if(!user.isPasswordTrue(password)) {
                    return done(null,false,{
                        message:"Wrong password"
                    });
                }
                return done(null,user)
            });
        }
    )
);
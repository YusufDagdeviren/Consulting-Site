const passport = require("passport");
const mongoose = require("mongoose");
const User = require('../models/Users');

const createAnswer = (res, status, content) => {
    res
    .status(status)
    .json(content)
}

const register = (req,res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if(!name || !email || !password){
        createAnswer(res,400,{"error":"All fields required"})
        return;
    }else{
        const user = new User();
        user.name = name;
        user.email = email;
        user.setPassword(password);
        user.save((error) =>{
            if(error){
                createAnswer(res,404,error)
            }else{
                const token = user.setToken();
                createAnswer(res,200,{"token":token})
            }
        })
    }
};
const login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
        createAnswer(res,400,{"error":"All fields required"})
        return;
    }
    else{
        passport.authenticate("local",(error,user,info) => {
            let token;
            if(error){
                createAnswer(res,404,error)
                return;
            }
            if(user){
                token = user.setToken();
                createAnswer(res,200,{"token":token})
            }else{
                createAnswer(res,401,info)
                return;
            }
        })(req,res);
    }
};
module.exports = {
    register,
    login
}
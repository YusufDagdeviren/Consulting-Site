const User = require('../models/Users')

const createAnswer = (res, status, content) => {
    res
    .status(status)
    .json(content)
}
const limit = 12;
const getUsers = (req,res) =>{
    let page = parseInt(req.query.page) || 1
    if(page < 1 ){
        page = 1;
    }
    const skip = (page - 1) * limit;
    User.find()
        .skip(skip)
        .limit(limit)
        .select("-comments")
        .then((users)=> {
            createAnswer(res,200,users)
        })
        .catch((error) => {
            createAnswer(res,500,error)
        })

}
const getUser = (req,res) => {
   if(req.params && req.params.userid) {
    User.findById(req.params.userid)
    .select("-salt -hash -authority")
    .exec((error,content) => {
        if(!content){
            createAnswer(res,404,{"error":"User is not found"})
        }else if (error){
            createAnswer(res,404,{"error":error})
        }else{
            createAnswer(res,200,content)
        }
    });
   }
   else{
    createAnswer(res,404,{"error":"request doesn't have userid"})
   }
}
const userUpdate = (req,res,userid) =>{
    if(!userid){
        createAnswer(res,404,{"error":"userid must be entered"})
        return;
    }else{
        User
        .findById(userid)
        .select("-comments")
        .exec((error,content) => {
            if(error){
                createAnswer(res,400,{"error":"User has not found"})
            }
            else{
                if(!content){
                    createAnswer(res,400,{"error":"User has not found"})
                    return
                }else{
                    content.name = req.body.name;
                    content.age = req.body.age;
                    content.address = req.body.address;
                    content.job = req.body.job;
                    content.title = req.body.title;
                    content.save((error2,content2) => {
                        if(error2){
                            createAnswer(res,400,error2)
                        }else{
                            createAnswer(res,200,content2)
                        }
                    })
                }
            }
        })
    }
}
const updateUser = (req,res) => {
    const id = req.auth._id 
    const userid = req.params.userid;
    if(id===userid){
        userUpdate(req,res,userid)
    }else if(req.auth.authority === "admin"){
        userUpdate(req,res,userid)
    }else{
        createAnswer(res,401,{"error":"unauthorized action"})
    }
}
const deleteUser = (req,res) => {
    const userid = req.params.userid;
    const authority = req.auth.authority;
    if(authority === "admin"){
        if(userid){
            User
            .findByIdAndRemove(userid)
            .exec((error,content) => {
                if(error){
                    createAnswer(res,404,error)
                    return;
                }else{
                    if(!content){
                        createAnswer(res,404,{"error":"User has not found"})
                    }else{
                        createAnswer(res,200,{"state":`User is remove, delete user is:${content.name}`})
                    }
                }
            })
        }else{
            createAnswer(res,404,{"error":"userid has not found"})
        }
    }else if(userid===req.auth._id){
        User
        .findByIdAndRemove(userid)
        .exec((error,content) => {
            if(error){
                createAnswer(res,404,error)
                return;
            }else{
                if(!content){
                    createAnswer(res,404,{"error":"User has not found"})
                }else{
                    createAnswer(res,200,{"state":`User is remove, delete user is:${content.name}`})
                } 
            }
        })
    }else{
        createAnswer(res,401,{"error":"unauthorized action"})
    }
}
const whoAmI = (req,res) => {
    const userId = req.auth._id;
    if(userId){
        User
        .findById(userId)
        .select("_id authority")
        .exec((error,content) => {
            if(error){
                createAnswer(res,400,error)
            }else if(!content){
                createAnswer(res,404,{"error":"user is not found"})
            }else{
                createAnswer(res,200,content)
            }
        })
    }else{
        createAnswer(res,401,{"error":"unauthorized action"})
    }
}
module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    whoAmI
}
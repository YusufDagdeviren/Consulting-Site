const express= require('express')
const jwt = require('express-jwt')
const router = express.Router();
const auth = jwt.expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms:['sha1','RS256','HS256']
})
const ctrlUsers = require('../controllers/users')
const ctrlsComments = require('../controllers/comments')
const ctrlVerification = require('../controllers/verification')

router
.route("/users")
.get(ctrlUsers.getUsers)


router
.route('/users/:userid')
.get(ctrlUsers.getUser)
.put(auth,ctrlUsers.updateUser)
.delete(auth,ctrlUsers.deleteUser)

router
.route('/users/:userid/comments')
.post(auth,ctrlsComments.postComment)
router
.route("/users/:userid/comments/:commentid")
.get(ctrlsComments.getComment)
.put(auth,ctrlsComments.updateComment)
.delete(auth,ctrlsComments.deleteComment)

router.post("/register",ctrlVerification.register);
router.post("/login",ctrlVerification.login)

module.exports=router;

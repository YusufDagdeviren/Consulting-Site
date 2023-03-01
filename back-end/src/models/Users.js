const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CommentSchema = new mongoose.Schema({
    commenterEmail: { type: String, required: true },
    commentText: { type: String, required: true },
    commentDate: { type: Date, default: Date.now }
})
const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    job: { type: String},
    email: { type: String, unique: true, required: true },
    authority : {type: String,default:"user"},
    title:{type: String},
    hash: String,
    salt: String,
    token: String,
    age: { type: Number, min: 18 },
    address: String,
    comments: [CommentSchema]
})
UsersSchema.methods.setPassword = function (password){
    this.salt = crypto
        .randomBytes(16).
        toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};
UsersSchema.methods.isPasswordTrue =function (password){
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
    return this.hash === hash;
}
UsersSchema.methods.setToken = function(){
    const skt = new Date();
    skt.setDate(skt.getDate() + 7);
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            authority:this.authority,
            exp: parseInt(skt.getTime() / 1000, 10)
        },
        process.env.JWT_SECRET
    );
};
mongoose.model('user', UsersSchema, 'users')
const User = mongoose.model("user");
module.exports = User;
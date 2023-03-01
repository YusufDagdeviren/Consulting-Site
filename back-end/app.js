require('dotenv').config();
const express= require('express') 
require('./src/clients/db')
const apiRouter = require('./src/routes/index')
const passport = require('passport');
require("./src/config/passport");
const app = express();
app.use(passport.initialize());
app.use(express.urlencoded({extended:false}))
app.use('/api',apiRouter)
app.use("/api",(req, res, next) => {
    res.header("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
app.use((err,req,res,next) => {
    if(err.name === "UnauthorizedError"){
        res.status(401).json({"error":err.name+": "+err.message});
    }
});

app.listen(3000, () => {
 console.log('the application was run...');
});
const mongoose = require('mongoose');

let dbUri = process.env.DB_URI
mongoose.connect(dbUri);

mongoose.connection.on("connected",()=>{
    console.log(dbUri + " Connected to database at\n");
});
mongoose.connection.on("error",()=>{
    console.log("connection error\n");
});
mongoose.connection.on("disconnected",()=>{
    console.log("disconnected\n");
});
const closeConnection = (msg,cb) =>{
    mongoose.connection.close(()=>{
        console.log(msg);
        cb();
    })
}
process.on("SIGINT",() =>{
    closeConnection("the application has been closed!",()=>{
        process.exit(0);
    })
})
require('../controllers/users')
const mongoose = require('mongoose');

//connection to database
const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log("connected to database succesully")
}).catch((err)=>{
    console.log('connection failed');
});
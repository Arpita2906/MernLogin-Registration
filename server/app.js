const mongoose = require('mongoose');
const express = require('express');
const dotenv = require("dotenv");
const app=express();
const cookieParser = require('cookie-parser')

//dotenv configuration 
dotenv.config({path:'./.env'});

require('./db/conn');

app.use(express.json());
app.use(cookieParser())

//const User = require('./model/userSchema');
const PORT=process.env.PORT;

//linking the router files
app.use(require('./router/auth'));


//Middleware
//const middleware=(req,res,next)=>{
//    console.log(`Hello middleware`);
//    next();
//};


//app.get('/',(req,res)=>{
 //   res.send("Hello world from server app.js");
//});
/*app.get('/about',middleware,(req,res)=>{
    res.send("Hello About world from server");
});*/

app.use('/public/uploads',express.static('public/uploads'));
app.get('/contact',(req,res)=>{
    res.send("Hello Contact world from server");
});
app.get('/signin',(req,res)=>{
    res.send("Hello Login world from server");
});
app.get('/signup',(req,res)=>{
    res.send("Hello Registration world from server");
});
app.listen(PORT,()=>
    console.log(`express server is running on the port ${PORT}`)
);




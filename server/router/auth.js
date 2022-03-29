const jwt = require('jsonwebtoken');
const express = require('express');
//const req = require('express/lib/request');
//const res = require('express/lib/response');
const router =  express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const uuidv4 = require('uuid');
const authenticate = require("../middleware/authenticate")


require('../db/conn');
const User = require("../model/userSchema");

router.get('/',(req,res)=>{
    res.send("Hello world from server router js");
});

const DIR = './public/uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
//using async and await
const addDetails=async (req,res)=>{
  console.log(req.body);
  const name=req.body.name;
  const email=req.body.email;
  const phone=req.body.phone;
  const gender=req.body.gender;
  const age=req.body.age;
  const password=req.body.password;
  const cpassword=req.body.cpassword;
  const profileImg=req.file.originalname;
  console.log("profileimg",profileImg);
  if(!name|| !gender|| !age || !phone || !email|| !password|| !cpassword || !profileImg){
    console.log("Plz fill all the fields properly");
    return res.status(422).json({error:"Plz fill all the fields properly"});
  }
  try{
    const userExist=await User.findOne({email:email});
    if(userExist){
      return res.status(422).json({error:"Email already exists!"});
    }
    const user=new User({name,email,phone,gender,age,password,cpassword,profileImg});
    const save=await user.save();
    if(save){
      res.status(201).json({message:"User registered successfully"});
    }
    else{
      res.status(500).json({error:"Failed to register"});
    }
  }
  catch(err){
    console.log(err);
  }
};
router.post('/register', upload.single('profileImg'),addDetails);
//using promises
/*router.post('/register', (req,res)=>{
    const {name, email, phone, gender, age, password, cpassword} = req.body;
    if(!name || !email || !phone || !gender || !age || !password || !cpassword){
        return res.status(422).json({error:"Fill the fields properly"});
    }
    User.findOne({email:email})
        .then((userExists)=>{
            if(userExists){
                return res.status(422).json({error:"Email already exists"});
            }
            const user=new User({name, email, phone, gender, age, password, cpassword});

            user.save().then(()=>{
                res.status(201).json({message:"user registered successfully"});
            }).catch((err)=>res.status(500).json({error:"Failed registration"}));
        }).catch(err=>{console.log(err);});


    
});*/

//wherever there are promises we can use await instead
/*router.post('/register', async (req,res)=>{
    const {name, email, phone, gender, age, password, cpassword} = req.body;
    if(!name || !email || !phone || !gender || !age || !password || !cpassword){
        return res.status(422).json({error:"Fill the fields properly"});
    }
    try{
        const userExists = await User.findOne({email:email});

        if(userExists){
            return res.status(422).json({error:"Email already exists"});
        }else if(password!=cpassword){
            return res.status(422).json({error:"Password doesn't match"});
        }else{
            const user=new User({name, email, phone, gender, age, password, cpassword});
            //saving into the database
            await user.save();
            res.status(201).json({message:"user registered successfully"});
        }
    }catch(err){
        console.log(err);
    }
    
});*/

//login 
router.post('/signin',async (req,res)=>{
    try{
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(422).json({error:"Fill the fields properly"});
        }
        //if email matches then in userLogin we have the details
        const userLogin = await User.findOne({email:email});

        if(userLogin){
            //checking if password is same
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken",token);

            if(!isMatch){
                res.status(400).json({error:"Invalid credentials"});
            }else{
                res.json({message:"User signin succesfull"});
            }  
        }else{
            res.status(400).json({error:"Invalid Credentials"});
        }
        
    }catch(err){
        console.log("error in signin");
        console.log(err);
    }
});

//about us
router.get('/about',authenticate,(req,res)=>{
    console.log("this is reached about us page");
    res.send(req.rootUser);
});



module.exports=router;
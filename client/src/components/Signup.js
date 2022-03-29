import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Signup=()=>{
    const [user,setUser] = useState({
        name:"",email:"",phone:"",gender:"",age:"",password:"",cpassword:"",profileimg:""
    });
    let name,value;
    const handleInputs=(e)=>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        //dynamic data giving
        setUser({...user,[name]:value})
    }
    const onFileChange=((e)=>{
        setUser({...user,profileImg:e.target.files[0]})
})
const PostData=async(e) =>{
    e.preventDefault()
    console.log("user",user);
    const formData = new FormData();
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('phone', user.phone)
    formData.append('gender', user.gender)
    formData.append('age', user.age)
    formData.append('password', user.password)
    formData.append('cpassword', user.cpassword)
    formData.append('profileImg', user.profileImg)
    console.log("name",formData.get("name"));
    console.log("trying th reach backend");
    await axios.post("http://localhost:5000/register", formData).then(res => {
        console.log(res);
        window.alert("Registration  Successful");
        //navigate("/login");
    }).catch((err)=>{
      console.log("Hello world");
      console.log(err);
    })
}

    /*const PostData = async(e)=>{
        e.preventDefault();
        const{name,email,phone,gender,age,password,cpassword} = user;
        const res = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name,email,phone,gender,age,password,cpassword
            })
        });

        const data=await res.json();
        
        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Registration Successful");
            console.log("Registration Succesfull");

        }
    }*/


  return(
    <>
        <div className="signup-form">
            <h2>Signup</h2>
            <form method ="POST" className="register-form" id="register-form">
                <input type="file" name="profileimg" id="profileimg" onChange={onFileChange}></input><br></br>
                <input type="text" name="name" id="name" placeholder="Enter your Name" value={user.name} onChange={handleInputs}/><br />
                <input type="email" name="email" id="email" placeholder="Enter your email" value={user.email} onChange={handleInputs}/><br />
                <input type="number" name="phone" id="phone" placeholder="Enter your phone number" value={user.phone} onChange={handleInputs}/><br />
                <input type="text" name="gender" id="gender" placeholder="Enter your gender" value={user.gender} onChange={handleInputs}/><br />
                <input type="number" name="age" id="age" placeholder="Enter your age" value={user.age} onChange={handleInputs}/><br />
                <input type="password" name="password" id="password" placeholder="Enter your password" value={user.password} onChange={handleInputs}/><br />
                <input type="password" name="cpassword" id="cpassword" placeholder="Confirm your password" value={user.cpassword} onChange={handleInputs}/><br />
                <input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={PostData}/><br />
                <Link to="/login">I am already registered</Link>
            </form>
        </div>
    </>
  )
}

export default Signup
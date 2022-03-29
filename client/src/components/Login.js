import React, {useState} from 'react'
import { Link } from 'react-router-dom'
const Login=()=>{
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');

    const loginUser=async(e)=>{
      e.preventDefault();

      const res= await fetch('/signin',{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email,
          password
        })
      });

      const data= res.json();

      if(res.statue === 400 || !data){
        window.alert("Invalid Credentials");
      }else{
        window.alert("Login Successfull");
      }
    }
  return(
    <>
      <div className="login-form">
            <h2>Login</h2>
            <form method= "POST" className="login-form" id="login-form">
                <input type="email" name="email" id="email" value = {email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" /><br />
                <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}placeholder="Enter your password" /><br />
                <input type="submit" name="login" id="login" className="form-submit" value="login" onClick={loginUser}/><br />
                <Link to="/signup">I am not registered</Link>
            </form>
        </div>
    </>
  )
}

export default Login
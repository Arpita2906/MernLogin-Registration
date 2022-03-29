import React,{createContext,useReducer} from 'react'
import {Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {initialState,reducer} from "./reducer/useReducer";

export const userContext=createContext();

const Router=()=>{
  return(
    <>
      <Navbar />
      <Routes>
        <Route exact path ="/" element={<Home />}>
        </Route> 
        <Route path="/about" element={<About />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/signup" element={<Signup />}>
        </Route>
      </Routes>
    </>
  )
}

function App()
{
  const [state,dispatch] = useReducer(reducer,initialState);
  return(
    <>
      <userContext.Provider value={{state,dispatch}}>
        <Router />
      </userContext.Provider>
    </>
  );
}
export default App

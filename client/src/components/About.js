import React, { useContext, useEffect, useState } from 'react'
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {userContext} from '../App';

const About = () => {
    const{state,dispatch}=useContext(userContext);

    const [userData,setUserData] = useState({});

    const callAboutPage=async()=>{
        try{
            console.log("this has reached try block of about page");
            const res=await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data=await res.json();
            console.log(data);

            setUserData(data);
            console.log("userdata",userData);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        callAboutPage();
    },[]);

    return (
        <>
            <div className="thisform">
                <form method="GET">
                    <div className="field">
                        <h4>Details: </h4>
                    </div>
                    <div className='about-info'>
                    <MDBRow>
                        <MDBCol md='12' className='col-example'>

                            <img src={`./public/uploads/${userData.profileImg}`}  width="300px" height="300px"/>
                        </MDBCol>
                    </MDBRow>
                        <MDBRow>
                            <MDBCol md='6' className='col-example'>
                                <label>User ID  </label>
                            </MDBCol>
                            <MDBCol md='6' className='col-example'>
                                {userData._id}
                            </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                            <MDBCol md='6' className='col-example'>
                                <label>Name  </label>
                            </MDBCol>
                            <MDBCol md='6' className='col-example'>
                                {userData.name}
                            </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                            <MDBCol md='6' className='col-example'>
                                <label>Email  </label>
                            </MDBCol>
                            <MDBCol md='6' className='col-example'>
                                {userData.email}
                            </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                            <MDBCol md='6' className='col-example'>
                                <label>Phone  </label>
                            </MDBCol>
                            <MDBCol md='6' className='col-example'>
                                {userData.phone}
                            </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                            <MDBCol md='6' className='col-example'>
                                <label>Gender  </label>
                            </MDBCol>
                            <MDBCol md='6' className='col-example'>
                                {userData.gender}
                            </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                            <MDBCol md='6' className='col-example'>
                                <label>Age  </label>
                            </MDBCol>
                            <MDBCol md='6' className='col-example'>
                                {userData.age}
                            </MDBCol>
                        </MDBRow>
                        <br />
                    </div>
                    <input type="submit" className='profile-edit-btn' name="btnAddMore" value="Edit profile" />
                </form >
            </div >
        </>
    )
}

export default About
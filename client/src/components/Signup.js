import React, { useState } from 'react'
import './css/Signup.css'
import Cookies from 'universal-cookie'
import { useNavigate } from "react-router-dom";

import axios from 'axios'


function Signup() {
          const navigate = useNavigate();
          const cookie = new Cookies()

          const[formdata,setformdata]=useState({name:"",email:"",area:"",state:"",mobile:null,password:"",confirmpassword:""})
          const change =(e)=>{
                    setformdata({...formdata,[e.target.name]:e.target.value})
          }

          const handlesubmit=async(e)=>{
            e.preventDefault()
          
            axios.post('/users/adduser', formdata, {
              withCredentials: true
          }).then(async(res) => {
              
              await navigate('/')
              window.location.reload(false);
            
  
  
          }
  
          ).catch((e) => {
              
          })
                    

          }
          
  return (
    <div className='signup'>
      <form className="form">
                                        <span>Userame : <input type="text" name="name" onChange={change} required/></span>
                                        <span>Email : <input type="text" name="email" onChange={change} required/> </span>
                                        
                                        <span>Mobile : <input type="Number" name="mobile" onChange={change} required  minLength={10}/> </span>
                                        <span>Area(city/town/vill) : <input type="text" name="area" onChange={change} required/> </span>
                                        <span>State : <input type="text" name="state" onChange={change} required/> </span>
                                        <span>Password : <input type="text" name="password" onChange={change} required /> </span>
                                        <span>Confirm Password : <input type="text" name="confirmpassword" onChange={change} required/> </span>
                                        <span className='button'><button onClick={handlesubmit}>Sign Up</button></span>
                                        <span className='message'>Have an Account <a href="/">Log In</a></span>


                              </form>
    </div>
  )
}

export default Signup

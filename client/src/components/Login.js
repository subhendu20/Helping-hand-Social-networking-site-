import React, { useState } from 'react'
import './css/Login.css'
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import axios from 'axios'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";


function Login() {
          const navigate = useNavigate();
          const cookie = new Cookies()
          const [formdata, setformdata] = useState({ mobile:null, password:""})
          const change = (e) => {
                    setformdata({ ...formdata, [e.target.name]: e.target.value })
          }

          
  const close_invalid_message=()=>{
    $('#popup-warning-window').addClass('hide')

  }

          const submit=async(e)=>{
            e.preventDefault()
            axios.post("/users/login", formdata, {
              withCredentials: true
            }).then(async (res) => {
              
              if(res.data==='logged in successfully'){
               
                window.location.reload(false);

              }else{
                $('#popup-warning-window').removeClass('hide')
              }
             
        
            }).catch((e) => {
              
            })
        

          }
  return (
    <div className='login'>
       <form className="form">
       <div className="popup-warning-window hide" id='popup-warning-window'>
        <p>Invalid details!</p>
        <i class='bx bx-x' onClick={close_invalid_message}></i>
        
        </div>
       
                                        <span>Mobile : <input type="Number" placeholder="Enter Mobile Number" name="mobile" onChange={change} /></span>
                                        <span>Password : <input type="password" placeholder="Enter password" name="password" onChange={change} /></span>
                                        <span className='button'><button onClick={submit}>Log in</button></span>
                                        <span className='signuplink'><p>Don't have an Account?</p><a href="/signup">Sign up</a></span>

                              </form>
    </div>
  )
}

export default Login

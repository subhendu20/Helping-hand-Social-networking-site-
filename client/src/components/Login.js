import React, { useEffect, useState } from 'react'
import './css/Login.css'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import axios from 'axios'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import logo from './css/h-letter-36999.png'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { login } from '../action';
import { logout } from '../action';



function Login() {
  const logstate = useSelector((state) => state.changeStatus)
  const dispatch = useDispatch()
 





          const navigate = useNavigate();
          const cookie = new Cookies()
          const [formdata, setformdata] = useState({ mobile:null, password:""})
          const change = (e) => {
                    setformdata({ ...formdata, [e.target.name]: e.target.value })
          }

          
  const close_invalid_message=()=>{
    $('#popup-warning-window').addClass('hide')

  }


  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);


    window.addEventListener('resize', function () {
      if (window.innerHeight > 600) {
        vh = window.innerHeight * 0.01;

        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    })
  }, [])

          const submit=async(e)=>{
            e.preventDefault()
            axios.post("/users/login", formdata, {
              withCredentials: true
            }).then(async (res) => {
              
              if(res.data==='logged in successfully'){
                dispatch(login())
               
                

              }else{
                $('#popup-warning-window').removeClass('hide')
              }
             
        
            }).catch((e) => {
              
            })
        

          }
  return (
    <section className='login'>
      
      <section className='page-title'>Log into your account</section> 
       <form className="form" onSubmit={submit}>
       <div className="popup-warning-window hide" id='popup-warning-window'>
        <p>Invalid details!</p>
        <i class='bx bx-x' onClick={close_invalid_message}></i>
        
        </div>
       
                                        <span>Mobile : <input type="Number" placeholder="Enter Mobile Number" name="mobile" onChange={change} required /></span>
                                        <span>Password : <input type="password" placeholder="Enter password" name="password" onChange={change} required/></span>
                                        <span className='button'><button type='submit'>Log in</button></span>
                                        <span className='signuplink'><p>Don't have an Account?</p><Link to="/signup">Sign up</Link></span>

                              </form>
    </section>
  )
}

export default Login

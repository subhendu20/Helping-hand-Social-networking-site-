import React, { useState } from 'react'
import './css/Signup.css'
import Cookies from 'universal-cookie'
import { useNavigate } from "react-router-dom";
import logo from './css/h-letter-36999.png'

import axios from 'axios'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { login } from '../action';
import { logout } from '../action';



function Signup() {
  const logstate = useSelector((state) => state.changeStatus)
  const dispatch = useDispatch()

  

















  const navigate = useNavigate();
  const cookie = new Cookies()

  const[error,seterror]=useState('Please fill the form correctly')

  const [formdata, setformdata] = useState({ name: "", email: "", area: "", state: "", mobile: null, password: "", confirmpassword: "" })
  const change = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()

    if(formdata.name!=='' && formdata.email!=='' && formdata.area!=='' && formdata.state!=='' && formdata.mobile!==null && formdata.password!=='' && formdata.confirmpassword!=='' && formdata.password===formdata.confirmpassword){
      axios.post('/users/adduser', formdata, {
        withCredentials: true
      }).then(async (res) => {
        dispatch(login())

        navigate('/')
      
      }
      ).catch((e) => {
      })

    }
    else{
      $('#popup-warning-signup-window').removeClass('hide')

    }
    
     


   






  }

  const close_invalid_format=()=>{
    $('#popup-warning-signup-window').addClass('hide')

  }

  return (
    <section className='signup'>
      <img src={logo} alt="logo" className="logo" />
      <section className='page-title'>Create account</section>
      
      <form className="form">
      <div className="popup-warning-signup-window hide" id='popup-warning-signup-window'>
        <p>{error}</p>
        <i class='bx bx-x' onClick={close_invalid_format}></i>
        
        </div>

        <span><label htmlFor="name">Name</label> <input type="text" name="name" onChange={change} required placeholder='Enter your name' /></span>
        <span><label htmlFor="email">Email</label><input type="text" name="email" onChange={change} required placeholder='Enter your Email' /> </span>

        <span><label htmlFor="mobile">Mobile</label><input type="Number" name="mobile" onChange={change} required minLength={10} placeholder='Enter your mobile number'/> </span>
        <span><label htmlFor="area">Area (Viil/city)</label><input type="text" name="area" onChange={change} required  placeholder='Your area'/> </span>
        <span><label htmlFor="state">State</label><input type="text" name="state" onChange={change} required  placeholder='Your state'/> </span>
        <span><label htmlFor="password">Password</label><input type="password" name="password" onChange={change} required placeholder='Enter a password' /> </span>
        <span><label htmlFor="confirmpassword">Confirm password</label><input type="password" name="confirmpassword" onChange={change} required placeholder='Re-enter password'/> </span>
        <span className='button'><button onClick={handlesubmit}>Sign Up</button></span>
        <span className='message'>Have an Account <a href="/">Log In</a></span>


      </form>


    </section>
  )
}

export default Signup

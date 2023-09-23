import React, { useEffect, useState } from 'react'
import './css/Signup.css'
import Cookies from 'universal-cookie'
import { Link, useNavigate } from "react-router-dom";
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

  const [error, seterror] = useState('Passwords are not same!')

  const [formdata, setformdata] = useState({ name: "", email: "", area: "", state: "", mobile: null, password: "", confirmpassword: "" })
  const change = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()

    if (formdata.password === formdata.confirmpassword) {
      axios.post('/users/adduser', formdata, {
        withCredentials: true
      }).then(async (res) => {

        if (res.data === 'success!') {
          dispatch(login())

          navigate('/')

        }
        else{
          await seterror(res.data)
          $('#popup-warning-signup-window').removeClass('hide')

        }



      }
      ).catch((e) => {
      })

    }
    else {
      $('#popup-warning-signup-window').removeClass('hide')

    }











  }

  const close_invalid_format = async() => {
    await seterror('Passwords are not same!')
    $('#popup-warning-signup-window').addClass('hide')

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


  return (
    <section className='signup'>

      <h1 className='page-title'>Create account</h1>

      <form className="form" onSubmit={handlesubmit}>
        <div className="popup-warning-signup-window hide" id='popup-warning-signup-window'>
          <p>{error}</p>
          <i className='bx bx-x' onClick={close_invalid_format}></i>

        </div>

        <span><label htmlFor="name">Name</label> <input type="text" name="name" onChange={change} required placeholder='Enter your name' /></span>
        <span><label htmlFor="email">Email</label><input type="text" name="email" onChange={change} required placeholder='Enter your Email' /> </span>

        <span><label htmlFor="mobile">Mobile</label><input type="Number" name="mobile" onChange={change} required minLength={10} placeholder='Enter your mobile number' /> </span>
        <span><label htmlFor="area">Area (Viil/city)</label><input type="text" name="area" onChange={change} required placeholder='Your area' /> </span>
        <span><label htmlFor="state">State</label><input type="text" name="state" onChange={change} required placeholder='Your state' /> </span>
        <span><label htmlFor="password">Password</label><input type="password" name="password" onChange={change} required placeholder='Enter a password' /> </span>
        <span><label htmlFor="confirmpassword">Confirm password</label><input type="password" name="confirmpassword" onChange={change} required placeholder='Re-enter password' /> </span>
        <span className='button'><button type='submit'>Sign Up</button></span>
        <span className='message'>Have an Account <Link to="/">Log In</Link></span>


      </form>


    </section>
  )
}

export default Signup

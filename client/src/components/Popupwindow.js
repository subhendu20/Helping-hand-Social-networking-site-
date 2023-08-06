import React from 'react'
import { useState } from 'react'

import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'
import './css/Popuowindow.css'

function Popupwindow() {
          const[formdata,setformdata]=useState({
                    topic:'',
                    description:'',
                    image:'',
                    location:''
                  })

                  const [imgdata,setimgdata]=useState('')

                  const close_pop_profile=()=>{
                    $('#popup-profile-window').addClass('hide')
                    $('#app-main').removeClass('reduceopacity')
                
                  }

                  
                
                  const imgset=(e)=>{
                    
                    var filereader = new FileReader()
                    filereader.readAsDataURL(e.target.files[0])
                    filereader.onload =()=>{
                    
                      setimgdata(filereader.result)
                      setformdata({...formdata,image:filereader.result})
                    }
                    filereader.onerror =(e)=>{
                  
                     
                    }
                
                  }
                  
                  const change=(e)=>{
                    setformdata({...formdata,[e.target.name]:e.target.value})
                  }

                  const post=(e)=>{
                    e.preventDefault()
                    
                    axios.post('/post/postnote', formdata, {
                      withCredentials: true
                  }).then((res)=>{
                    
                    window.open('/profile','_self')
                
                  }).catch((e)=>{
                    
                
                  })
                
                  }
  return (
    
           <form className='postform'>
      <i class='bx bx-x' onClick={close_pop_profile}></i>
      <span className="text">Post Your Need</span>
      
      <span className='headings'>Topic (Use specific keyword,Ex- Medicine)</span>
      <span className="title"><input type="text" name='topic' placeholder='Title' onChange={change} /></span>
      <span className='headings'>Location(Area/city/state)</span>
      <span className="title"><input type="text" name='location' placeholder='Location' onChange={change} /></span>
      <span className='headings'>Write a brief description</span>
      <span className="textarea"><textarea name="description" id="" cols="30" rows="8" placeholder='Description' onChange={change}></textarea></span>
      <span className="buttons"><button type='submit' onClick={post}>POST</button></span>
      
      
    </form>
      
    
  )
}

export default Popupwindow

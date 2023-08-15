import React from 'react'
import { useState } from 'react'

import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './css/Popupwindowevent.css'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { countDecrease } from '../action/update';
import { countIncrease } from '../action/update';

function Popupwindowevent() {
  const navigate = useNavigate();
  const countstate = useSelector((state) => state.changeCount)
  const dispatch = useDispatch()


          const[formdata,setformdata]=useState({
                    topic:'',
                    description:'',
                    image:'',
                    location:''
                  })

                  const [imgdata,setimgdata]=useState('')
                  const[subloading,setsubloading]=useState(false)

                  const close_event_popup=()=>{
                    $('#popup-event-window').addClass('hide')
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
                    setsubloading(true)
                  
                    axios.post('/events/addevent', formdata, {
                      withCredentials: true
                  }).then(async(res)=>{
                    await setsubloading(false)
                    await $('#popup-profile-window').addClass('hide')
                    await $('#app-main').removeClass('reduceopacity')
                    await navigate('/')
                    
                
                    dispatch(countDecrease())
                
                  }).catch((e)=>{
                
                
                  })
                
                  }
  return (
          <form className={!subloading?'eventform':'eventform eventform-load'}>
          <i class='bx bx-x' onClick={close_event_popup}></i>
          <span className="text">Post Your Need and Services</span>
         
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

export default Popupwindowevent

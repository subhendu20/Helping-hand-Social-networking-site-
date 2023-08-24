import React, { useEffect, useState } from 'react'
import './css/Home.css'
import Post from './Post'
import img from './css/download (5).jpeg'
import Events from './Events'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import gif from './css/Infinity-1s-200px.svg';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import cover from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'


function Home() {
  const logstate = useSelector((state) => state.changeStatus)
  const countstate = useSelector((state) => state.changeCount)


  const navigate = useNavigate();
  const[getpostloading,setgetpostloading]=useState(false)
  const[postlist,setpostlist]=useState({posts:[]})

  // ----------------------------------------------for profile bar 1--------------------------------------//

  const[profileloading1,setprofileloading1]=useState(false)
  const[areaprofiles,setareaprofiles]=useState({list:[]})


// -----------------------------------------------------for profile bar 2------------------------------------------//

const[profileloading2,setprofileloading2]=useState(false)
  const[stateprofiles,setstateprofiles]=useState({list:[]})

//------------------------------------------------------for profile bar 3------------------------------------------//

const[geteventloading,setgeteventloading]=useState(false)
const[eventlist,seteventlist]=useState({events:[]})



// -----------------------------------------------------for post------------------------------------------//

  useEffect(()=>{
    
    setgetpostloading(true)
    
      axios.get('/post/toppost',{
        withCredentials:true
    }).then(async(res)=>{
     
      await setpostlist({
        posts:res.data
      })
      
    }).catch((e)=>{
      
    })
    setgetpostloading(true)
  },[getpostloading,countstate])

  //---------------------------------------------- profile near area--------------------------------------//

  useEffect(()=>{
  
    setprofileloading1(true)
    
      axios.get('/post/neararea',{
        withCredentials:true
    }).then(async(res)=>{
     
      await setareaprofiles({
        list:res.data
      })
      
    }).catch((e)=>{
    
    })
    setprofileloading1(true)
  },[profileloading1,countstate])






  //-----------------------------------------------profile near state-------------------------------------//

  useEffect(()=>{
  
    setprofileloading2(true)
    
    
      axios.get('/post/nearstate',{
        withCredentials:true
    }).then(async(res)=>{
     
      await setstateprofiles({
        list:res.data
      })
      
    }).catch((e)=>{
      
    })
    setprofileloading2(true)
    
  },[profileloading2,countstate])


   //-----------------------------------------------event near me-------------------------------------//



  useEffect(()=>{
    
    setgeteventloading(true)
    
      axios.get('/events/geteventinarea',{
        withCredentials:true
    }).then(async(res)=>{
     
      await seteventlist({
        events:res.data
      })
      
    }).catch((e)=>{
      
    })
    setgeteventloading(true)
  },[geteventloading,countstate])




  return (
   
    (postlist.posts.length!==0) ? <div className='Home'>
          <div className="posts-prefered-city">
          {
                              (postlist.posts.length!==0) && postlist.posts.map((e)=>{
                                return <Post key={e._id} post={e} type={'post'} />
                              })
                             }

          </div>
          <hr/>
          <div className="divider">Organizations near you</div> 
        <div className="profile-list">
                    {
          (areaprofiles.list.length!==0) && areaprofiles.list.map((e)=>{
            return <span key={e._id}><img src={(e.profileimg)?e.profileimg:cover} alt="loading" onClick={()=>navigate(`/userprofile/${e._id}`)}/> <p className='name'>{e.name}</p> <p id='area'>{e.area}</p></span>

          })
        }


          </div>
          
          
         
          <hr />
          <div className="divider">Services near you</div>
          <div className="eventlist">
          {
                              (eventlist.events.length!==0) && eventlist.events.map((e)=>{
                                return <Post key={e._id} post={e} type={'service'} />
                              })
                             }
          
          </div>
         
          
      
    </div>:<img src={gif} className='loading' alt='loading'/>
      
    
)
}

export default Home

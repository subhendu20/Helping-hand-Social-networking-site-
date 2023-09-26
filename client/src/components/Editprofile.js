import React, { useEffect, useState } from 'react'
import './css/editprofile.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import cover from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg';
import { countIncrease } from '../action/update';
import { useDispatch } from 'react-redux';
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";

function Editprofile() {
  const dispatch = useDispatch()


          const [loading,setloading]=useState(false)
  const[prevalue,setprevalue]=useState({
    name:'',
    about:'',
    profileimg:'',
    coverimg:'',
    area:'',
    state:''

  })
  const [coverimg,setcoverimg] = useState('')
  const [ profileimg,setprofileimg]=useState('')
  
  const navigate = new useNavigate()

  const setprofile=(e)=>{
          
          var filereader = new FileReader()
          filereader.readAsDataURL(e.target.files[0])
          filereader.onload =()=>{
            
            setprofileimg(filereader.result)
            
            setprevalue({...prevalue,profileimg:filereader.result})
          }
          filereader.onerror =(e)=>{
            
           
          }
      
        } 
        const setcover=(e)=>{
          
          var filereader = new FileReader()
          filereader.readAsDataURL(e.target.files[0])
          filereader.onload =()=>{
            
            setcoverimg(filereader.result)
            
            setprevalue({...prevalue,coverimg:filereader.result})
          }
          filereader.onerror =(e)=>{
            
           
          }
      
      
         
      
        }  

        const changes=(e)=>{
          setprevalue({...prevalue,[e.target.name]:e.target.value})
      
        }


        const Save_update=(e)=>{
          
          e.preventDefault()
          $('.update-profile').toggleClass('blur-back')
          axios.put('/users/update', prevalue, {
            withCredentials: true
        }).then((res)=>{
          if(res.data==='error'){
            alert('Inavalid entry')
          }
          else{
            $('.update-profile').toggleClass('blur-back')
            dispatch(countIncrease())
            
            navigate('/profile')

          }
         
      
        }).catch((e)=>{
          
      
        })
          

        }




        useEffect(()=>{
          setloading(false)
            
          axios.get('/users/getdetails',{
            withCredentials:true
        }).then((res)=>{
          
          setprevalue({
            name:res.data.name,
            area:res.data.area,
            profileimg:res.data.profileimg,
            coverimg:res.data.coverimg,
            about:res.data.about,
            state:res.data.state
        
          })
         }).catch((e)=>{
          
        })
        setloading(true)
        
        },[loading])
        



  return (
          <div className='update-profile'>
          <form action="" className="coverimg">
          <img src={(prevalue.coverimg==='')?cover:prevalue.coverimg} alt="loading" className="img" />
                   <div className="upload-box">
                    <input accept="image/*" type="file" onChange={setcover}/>
                    <i class='bx bxs-camera'></i>
                    
                   </div>
                    

          </form>
          <form action="" className="details">
          <span className="name">Name<input type="name"  name='name' defaultValue={prevalue.name} placeholder='Enter your name' onChange={changes}/></span>
          
          <span className="tagline">Area<input type="text"  placeholder='Enter your area' defaultValue={prevalue.area} name='area' onChange={changes} /></span>
          <span className="about">State<input type="text" placeholder='Enter your state name' name='state' onChange={changes} defaultValue={prevalue.state}/></span>
          <span className="about">Write something about you<input type="text" placeholder='Write something about you' name='about' onChange={changes} defaultValue={prevalue.about} /></span>
          
          <span className="buttons"><button onClick={Save_update}>Save</button></span>

          </form>
          <form action="" className="profile-image">
                    
                    <img src={(prevalue.profileimg==='')?cover:prevalue.profileimg} alt="loading" className="imgprof" />
                    <div className="profile-upload-box">
                    <input accept="image/*" type="file" onChange={setprofile} />
                    <i class='bx bxs-camera'></i>

                    </div>

                    
                    
          </form>
         
      
    </div>
  )
}

export default Editprofile

import React, { useEffect, useState } from 'react'
import './css/Profile.css'
import axios from 'axios'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import defaultimg from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import gif from './css/3WyW.gif'


function Profile() {
  const navigate = useNavigate();
  const [profiledata, setprofiledata] = useState({ name: '', area: '', state: '', profileimg: '', coverimg: '', about: '' })
  const [loading, setloading] = useState(true)
  const [postlist, setpostlist] = useState({ posts: [] })
  const [postloading, setpostloading] = useState(false)

  const [followloading, setfollowloading] = useState(false)
  const [follow, setfollow] = useState('follow')
  const [followerlist, setfollowerlist] = useState({ followers: [] })




  useEffect(() => {
    setloading(false)

    axios.get('/users/getdetails', {
      withCredentials: true
    }).then((res) => {
      
      setprofiledata({
        name: res.data.name,
        area: res.data.area,
        profileimg: res.data.profileimg,
        coverimg: res.data.coverimg,
        about: res.data.about,
        state: res.data.state
      })


      

    }).catch((e) => {
    
    })
    setloading(true)







  }, [loading])



  useEffect(() => {
    
    setpostloading(false)

    axios.get('/post/ownpost', {
      withCredentials: true
    }).then(async (res) => {
  

      await setpostlist({
        posts: res.data
      })
      






    }).catch((e) => {
      
    })
    
    setpostloading(true)










  }, [postloading])




  useEffect(() => {
    setfollowloading(true)
    axios.get(`/comment/getfollowers`, {
      withCredentials: true
    }).then(async (res) => {
      setfollowerlist({
        followers: res.data
      })




    }).catch((e) => {

    
    })
    setfollowloading(false)


  }, [followloading])


  const open_followlist = () => {
    $('.dropup-follower-menu2').toggleClass('none')
  }


  const open_post_popup = () => {
    $('#popup-profile-window').removeClass('hide')
    $('#app-main').addClass('reduceopacity')
  }


  const open_event_popup=()=>{
    $('#popup-event-window').removeClass('hide')
    $('#app-main').addClass('reduceopacity')

  }
  return ((profiledata.name !== '')?
    <div className='profile'>
      <img className='prof-image' src={(profiledata.profileimg === '') ? defaultimg : profiledata.profileimg} alt="loading" />
      <div className="banner">
        <img src={(profiledata.coverimg === '') ? defaultimg : profiledata.coverimg} alt="loading" />

      </div>
      <div className="profile-details">
        <div className="about">
          <div className="aboutbox">
            <span className="name">
              {profiledata.name}

            </span>
            <span className="tagline">
              {`${profiledata.area} , ${profiledata.state}`}


            </span>
            <span className="about-details">
              {
                profiledata.about
              }


            </span>
            <span className="buttons">
              <span className="followers" onClick={open_followlist}><i class='bx bx-male' ></i>{followerlist.followers.length} Followers
                <div className="dropup-follower-menu2 none">
                  {followerlist.followers.length !== 0 && followerlist.followers.map((e) => {
                    return <span key={e._id} onClick={()=> navigate(`/userprofile/${e.followerid}`)}><img src={e.followerimg} alt="loading"/><p>{e.followername}</p></span>

                  })

                  }</div>

              </span>
              <button className="edit"><a href="/editprofile"><i class='bx bx-edit' ></i>Edit Profile</a>
              </button>





            </span>

          </div>

        </div>
        <div className="posts">
          <div className="post-bar">
            <p>Share your need and service</p>
            <span className="icons"><span onClick={open_post_popup}><i class='bx bxs-conversation' ></i>Post</span>

              <span onClick={open_event_popup}><i class='bx bxs-conversation' ></i>Service</span></span>

          </div>
          <div className="mypostlist">
            {
              (postlist.posts.length !== 0) ? postlist.posts.map((e) => {
                return <Post key={e._id} post={e} />
              }) : <p className='blank-message'>Upload your first post</p>
            }

          </div>



        </div>

      </div>


    </div>:<img src={gif} className='loading' alt='loading'/>
  )
}

export default Profile

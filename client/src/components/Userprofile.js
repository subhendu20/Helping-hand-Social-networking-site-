import React, { useEffect, useState } from 'react'
import defaultimg from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'

import Post from './Post'
import axios from 'axios'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import { useParams } from 'react-router-dom';
import './css/userprofile.css'
import { useNavigate } from 'react-router-dom';
import gif from './css/Infinity-1s-200px.svg';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';

function Userprofile() {
          const countstate = useSelector((state) => state.changeCount)



          const navigate = useNavigate();
          const { userId } = useParams()

          const [profiledata, setprofiledata] = useState({ name: '', area: '', state: '', profileimg: '', coverimg: '', about: '' })
          const [loading, setloading] = useState(false)
          const [postlist, setpostlist] = useState({ posts: [] })
          const [postloading, setpostloading] = useState(false)
          const [followloading, setfollowloading] = useState(false)
          const [follow, setfollow] = useState('follow')
          const [followerlist, setfollowerlist] = useState({ followers: [] })


          const open_followlist = () => {
                    $('.dropup-follower-menu').toggleClass('none')
          }

          const followuser = () => {
                    if (follow === 'follow') {
                              axios.get(`/comment/addfollow/${userId}`, {
                                        withCredentials: true
                              }).then(async (res) => {
                                        
                                        setfollow('Unfollow')
                                        setfollowloading(true)




                              }).catch((e) => {

                                        
                              })

                    }
                    else {
                              axios.get(`/comment/removefollow/${userId}`, {
                                        withCredentials: true
                              }).then(async (res) => {
                              
                                        setfollow('Follow')
                                        setfollowloading(true)




                              }).catch((e) => {

                                        
                              })


                    }
          }


          useEffect(() => {
                    setfollowloading(true)
                    axios.get(`/comment/followerlist/${userId}`, {
                              withCredentials: true
                    }).then(async (res) => {
                              setfollowerlist({
                                        followers: res.data
                              })
                              




                    }).catch((e) => {

                              
                    })
                    setfollowloading(false)
                    


          }, [followloading,userId])




          useEffect(() => {
                    setfollowloading(true)
                    axios.get(`/comment/followcheck/${userId}`, {
                              withCredentials: true
                    }).then(async (res) => {
                              

                              if (res.data === 'yes') {
                                        setfollow('Unfollow')
                              }
                              if (res.data === 'no') {
                                        setfollow('follow')
                              }






                    }).catch((e) => {
                              
                    })
                    setfollowloading(false)

          }, [followloading,userId])











          // get user details
          useEffect(() => {
                    
                    setloading(true)

                    axios.post('/users/getdetails', { userId }, {
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
                    setloading(false)












          }, [loading,userId])

          //get post list
          useEffect(() => {
                    
                    setpostloading(true)

                    axios.post('/post/postlist', { userId }, {
                              withCredentials: true
                    }).then(async (res) => {

                              await setpostlist({
                                        posts: res.data
                              })
                              






                    }).catch((e) => {
                              
                    })
                    
                    setpostloading(false)


















          }, [postloading,countstate,userId])




          return ((profiledata.name!=='' && !followloading && !postloading && !loading)?
                    <div className='user-profile'>
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
                                                            <span className="join-date">
                                                                      <span className="buttons">
                                                                                <span className="followers" onClick={open_followlist}><i class='bx bx-male' ></i>{followerlist.followers.length} Followers
                                                                                          <div className="dropup-follower-menu none">
                                                                                                    {followerlist.followers.length !== 0 && followerlist.followers.map((e) => {
                                                                                                              return <span key={e._id} onClick={()=> navigate(`/userprofile/${e.followerid}`)}><img src={e.followerimg} alt="loading" /><p>{e.followername}</p></span> 

                                                                                                    })

                                                                                                    }</div>

                                                                                </span>
                                                                                <button className="edit" onClick={followuser}>{follow}</button>


                                                                      </span>


                                                            </span>
                                                  </div>

                                        </div>
                                        <div className="posts">
                                                  <span className="heading-postlist">
                                                            Posts
                                                  </span>
                                                  <div className="mypostlist">
                                                            {
                                                                      (postlist.posts.length !== 0) ? postlist.posts.map((e) => {
                                                                                return <Post key={e._id} post={e} />
                                                                      }) : <p className='blank-message'>No post Yet</p>
                                                            }

                                                  </div>



                                        </div>

                              </div>


                    </div>:<img src={gif} className='loading' alt='loading'/>
          )
}

export default Userprofile
